{
  description = "Seabug frontend";

  inputs = {
    nixpkgs.url = github:NixOs/nixpkgs/nixos-unstable;
    dream2nix = {
      url = github:nix-community/dream2nix;
      inputs.nixpkgs.follows = "nixpkgs";
    };
    # TODO: use `main` when this is merged
    seabug-contracts.url = github:mlabs-haskell/seabug-contracts/calum/fixing-buy-button;
  };

  outputs =
    { self
    , nixpkgs
    , dream2nix
    , seabug-contracts
    }:
    let
      supportedSystems = [ "x86_64-linux" "x86_64-darwin" ];

      lib = nixpkgs.lib;

      pkgsFor = lib.genAttrs supportedSystems (system: nixpkgs.legacyPackages.${system});

      perSystem = lib.genAttrs supportedSystems;

      d2nFlakeOutputs =
        let
          src = builtins.path {
            path = ./.;
            filter = path: _: builtins.baseNameOf path != "package-lock.json";
          };
        in
        dream2nix.lib.makeFlakeOutputs {
          systems = supportedSystems;
          config.projectRoot = src;
          source = src;
          settings = [
            {
              subsystemInfo.noDev = false;
              subsystemInfo.nodejs = 16;
            }
          ];
        };
    in
    {
      # The following add a check that run `npm run test` (i.e. `craco test`)
      # uncomment when some tests will be implemented

      # checks = perSystem (system: {
      #   cracoTest = d2nFlakeOutputs.packages.${system}.default.overrideAttrs (old: {
      #     doCheck = true;
      #     dontInstall = true;
      #     checkPhase = ''
      #       npm run test
      #     '';
      #   });
      # });

      packages = perSystem (system: {
        nft-marketplace-frontend-artifacts =
          let
            nft-marketplace-frontend = d2nFlakeOutputs.packages.${system}.default.overrideAttrs (old: {
              SKIP_PREFLIGHT_CHECK = true; # TODO do we really need this?
              REACT_APP_API_BASE_URL = "https://api.seabug.staging.mlabs.city";
              REACT_APP_CTL_LOG_LEVEL = "Trace";
              REACT_APP_CTL_SERVER_HOST = "ctl-server.preview-seabug.ctl-runtime.staging.mlabs.city";
              REACT_APP_CTL_SERVER_PORT = "443";
              REACT_APP_CTL_SERVER_SECURE_CONN = "true";
              REACT_APP_CTL_OGMIOS_HOST = "ogmios.preview-seabug.ctl-runtime.staging.mlabs.city";
              REACT_APP_CTL_OGMIOS_PORT = "443";
              REACT_APP_CTL_OGMIOS_SECURE_CONN = "true";
              REACT_APP_CTL_DATUM_CACHE_HOST = "ogmios-datum-cache.preview-seabug.ctl-runtime.staging.mlabs.city";
              REACT_APP_CTL_DATUM_CACHE_PORT = "443";
              REACT_APP_CTL_DATUM_CACHE_SECURE_CONN = "true";
              REACT_APP_CTL_NETWORK_ID = "0";
              REACT_APP_CTL_PROJECT_ID = "previewoXa2yw1U0z39X4VmTs6hstw4c6cPx1LN";
              REACT_APP_IPFS_BASE_URL = "https://cloudflare-ipfs.com/ipfs/";

              preBuild =
                let
                  seabug-contracts-output-js = seabug-contracts.packages.${system}.seabug-contracts.overrideAttrs (old: {
                    buildCommand = old.buildCommand + ''
                      cp output.js $out
                    '';
                  });
                in
                (old.preBuild or "") + ''
                  mkdir seabug-contracts-module
                  cp -r $out/lib/node_modules/nft-marketplace/node_modules/seabug-contracts/* seabug-contracts-module
                  cp ${seabug-contracts-output-js}/output.js seabug-contracts-module
                  rm -rf $out/lib/node_modules/nft-marketplace/node_modules/seabug-contracts
                  cp -r seabug-contracts-module $out/lib/node_modules/nft-marketplace/node_modules/seabug-contracts
                '';
            });
          in
          pkgsFor.${system}.stdenv.mkDerivation {
            name = "nft-marketplace";
            dontUnpack = true;
            dontBuild = true;
            installPhase = ''
              cp -r ${nft-marketplace-frontend}/lib/node_modules/nft-marketplace/build $out
            '';
          };
        default = self.packages.${system}.nft-marketplace-frontend-artifacts;
        inherit (d2nFlakeOutputs.packages.${system}) resolveImpure;
      });

      devShells = perSystem (system: {
        default = with pkgsFor.${system}; mkShell {
          buildInputs = [ nodePackages.npm ];
        };
      });

      nixosModules = {
        nft-marketplace-frontend = {
          imports = [ ./nix/nft-marketplace-frontend.nix ];
          nixpkgs.overlays = [ self.overlays.nft-marketplace-frontend ];
        };
        default = self.nixosModules.nft-marketplace-frontend;
      };

      overlays = {
        nft-marketplace-frontend = pkgsSelf: pkgsSuper: {
          nft-marketplace-frontend-artifacts = self.packages.${pkgsSelf.system}.nft-marketplace-frontend-artifacts;
        };
        default = self.overlays.nft-marketplace-frontend;
      };

      nixosConfigurations.test = lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          self.nixosModules.default
          ./test-module.nix
        ];
      };

      hydraJobs = {
        inherit (self.packages.x86_64-linux) nft-marketplace-frontend-artifacts;
        nixos-module = self.nixosConfiguration.test.system.build.toplevel;
      };
    };
}
