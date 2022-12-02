{
  description = "Seabug frontend";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    dream2nix = {
      url = "github:nix-community/dream2nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    styleguide.url = "github:mlabs-haskell/styleguide";
    # TODO: use `main` when this is merged
    seabug-contracts.url = "github:mlabs-haskell/seabug-contracts/calum/fixing-buy-button";
  };

  outputs = inputs @  { self, nixpkgs, dream2nix, ... }:
    let
      systems = [ "x86_64-linux" "x86_64-darwin" ];
      perSystem = nixpkgs.lib.genAttrs systems;
      pkgs = perSystem (system: nixpkgs.legacyPackages.${system});

      source = builtins.path {
        path = ./.;
        filter = path: _: builtins.baseNameOf path != "package-lock.json";
      };

      d2nFlake = dream2nix.lib.makeFlakeOutputs {
        inherit systems source;
        config.projectRoot = source;
        settings = [{
          subsystemInfo.noDev = false;
          subsystemInfo.nodejs = 16;
        }];
      };

      # TODO: upstream
      make-seabug-contracts-output-js = system: inputs.seabug-contracts.packages.${system}.seabug-contracts.overrideAttrs (old: {
        buildCommand = old.buildCommand + ''
          cp output.js $out
        '';
      });

      make-frontend = system: buildEnvVars: d2nFlake.packages.${system}.default.overrideAttrs (old: {
        preBuild = (old.preBuild or "") + ''
          mkdir seabug-contracts-module
          cp -r $out/lib/node_modules/nft-marketplace/node_modules/seabug-contracts/* seabug-contracts-module
          cp ${make-seabug-contracts-output-js system}/output.js seabug-contracts-module
          rm -rf $out/lib/node_modules/nft-marketplace/node_modules/seabug-contracts
          cp -r seabug-contracts-module $out/lib/node_modules/nft-marketplace/node_modules/seabug-contracts
          # avoid Error: error:0308010C:digital envelope routines::unsupported
          export NODE_OPTIONS=--openssl-legacy-provider
        '';
        installPhase = ''
          cp -r $out/lib/node_modules/nft-marketplace/build/* $out
        '';
      } // buildEnvVars);
    in
    {
      checks = perSystem (system: {
        format = inputs.styleguide.lib.${system}.mkCheck self;
        cracoTest = self.packages.${system}.default.overrideAttrs (old: {
          doCheck = true;
          dontInstall = true;
          checkPhase = ''
            CI=true npm run test
          '';
        });
      });

      lib = {
        inherit make-frontend make-seabug-contracts-output-js;
        exampleBuildEnvVars = {
          REACT_APP_API_BASE_URL = "https://localhost:8008";
          REACT_APP_CTL_LOG_LEVEL = "Trace";
          REACT_APP_CTL_SERVER_HOST = "localhost";
          REACT_APP_CTL_SERVER_PORT = "8008";
          REACT_APP_CTL_SERVER_SECURE_CONN = "false";
          REACT_APP_CTL_OGMIOS_HOST = "localhost";
          REACT_APP_CTL_OGMIOS_PORT = "1337";
          REACT_APP_CTL_OGMIOS_SECURE_CONN = "false";
          REACT_APP_CTL_DATUM_CACHE_HOST = "localhost";
          REACT_APP_CTL_DATUM_CACHE_PORT = "9999";
          REACT_APP_CTL_DATUM_CACHE_SECURE_CONN = "false";
          REACT_APP_CTL_NETWORK_ID = "0";
          REACT_APP_CTL_PROJECT_ID = "previewoXa2yw1U0z39X4VmTs6hstw4c6cPx1LN";
          REACT_APP_IPFS_BASE_URL = "https://cloudflare-ipfs.com/ipfs/";
        };
      };

      packages = perSystem (system: {
        nft-marketplace-frontend = make-frontend system self.lib.exampleBuildEnvVars;
        inherit (d2nFlake.packages.${system}) resolveImpure;
        default = self.packages.${system}.nft-marketplace-frontend;
      });

      devShells = perSystem (system: {
        default = with pkgs.${system}; mkShell {
          buildInputs = [ nodePackages.npm ];
        };
      });

      formatter = perSystem (system: inputs.styleguide.lib.${system}.mkFormatter self);

      hydraJobs.required = pkgs.x86_64-linux.runCommand "required"
        {
          inherit (self.packages.x86_64-linux) nft-marketplace-frontend;
          inherit (self.checks.x86_64-linux) format cracoTest;
        } "touch $out";
    };
}
