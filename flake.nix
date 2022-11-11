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

      artifactsBuilder = system: envVars:
        let
          nft-marketplace-frontend = d2nFlakeOutputs.packages.${system}.default.overrideAttrs (old: {
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
          } // envVars);
        in
        pkgsFor.${system}.stdenv.mkDerivation {
          name = "nft-marketplace";
          dontUnpack = true;
          dontBuild = true;
          installPhase = ''
            cp -r ${nft-marketplace-frontend}/lib/node_modules/nft-marketplace/build $out
          '';
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
        default = d2nFlakeOutputs.packages.${system}.default;
        inherit (d2nFlakeOutputs.packages.${system}) resolveImpure;
      });

      devShells = perSystem (system: {
        default = with pkgsFor.${system}; mkShell {
          buildInputs = [ nodePackages.npm ];
        };
      });

      nixosModules = {
        nft-marketplace-frontend = { pkgs, ... }: {
          imports = [ ./nix/nft-marketplace-frontend.nix ];
          services.nft-marketplace-frontend.artifactsBuilder = artifactsBuilder pkgs.system;
        };
        default = self.nixosModules.nft-marketplace-frontend;
      };

      nixosConfigurations.test = lib.nixosSystem {
        system = "x86_64-linux";
        modules = [
          self.nixosModules.default
          ({ modulesPath, ... }: {
            imports = [
              "${modulesPath}/virtualisation/qemu-vm.nix"
            ];
            services.nft-marketplace-frontend.enable = true;
          })
        ];
      };

      hydraJobs = {
        inherit (self.packages.x86_64-linux) nft-marketplace-frontend-artifacts;
        test-nixos-module = self.nixosConfigurations.test.config.system.build.toplevel;
      };
    };
}
