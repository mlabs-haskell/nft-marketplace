{
  description = "Seabug frontend";

  inputs = {
    nixpkgs.url = github:NixOs/nixpkgs/nixos-unstable;
    dream2nix = {
      url = github:nix-community/dream2nix;
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    { self
    , nixpkgs
    , dream2nix
    }:
    let
      supportedSystems = [ "x86_64-linux" "x86_64-darwin" ];

      pkgsFor = lib.genAttrs supportedSystems (system: nixpkgs.legacyPackages.${system});

      lib = nixpkgs.lib.extend (self: super: {
        perSystem = super.genAttrs supportedSystems;
      });

      d2nFlakeOutputs = dream2nix.lib.makeFlakeOutputs {
        systems = supportedSystems;
        config.projectRoot = ./.;
        source = ./.;
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

      packages = lib.perSystem (system: {
        nft-marketplace-frontend-artifacts =
          let
            nft-marketplace-frontend = d2nFlakeOutputs.packages.${system}.default.overrideAttrs (old: {
              REACT_APP_API_BASE_URL = "http://localhost:8008";
              REACT_APP_CTL_LOG_LEVEL = "Trace";
              REACT_APP_CTL_SERVER_HOST = "ctl-server.preview.ctl-runtime.staging.mlabs.city";
              REACT_APP_CTL_SERVER_PORT = "443";
              REACT_APP_CTL_SERVER_SECURE_CONN = "true";
              REACT_APP_CTL_OGMIOS_HOST = "ogmios.preview.ctl-runtime.staging.mlabs.city";
              REACT_APP_CTL_OGMIOS_PORT = "443";
              REACT_APP_CTL_OGMIOS_SECURE_CONN = "true";
              REACT_APP_CTL_DATUM_CACHE_HOST = "ogmios-datum-cache.preview.ctl-runtime.staging.mlabs.city";
              REACT_APP_CTL_DATUM_CACHE_PORT = "443";
              REACT_APP_CTL_DATUM_CACHE_SECURE_CONN = "true";
              REACT_APP_CTL_NETWORK_ID = "0";
              REACT_APP_CTL_PROJECT_ID = "previewoXa2yw1U0z39X4VmTs6hstw4c6cPx1LN";
              REACT_APP_IPFS_BASE_URL = "https://cloudflare-ipfs.com/ipfs/";
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
      });

      devShells = lib.perSystem (system: {
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
    };
}
