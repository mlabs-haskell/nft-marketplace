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
        default = pkgsFor.${system}.stdenv.mkDerivation {
          name = "nft-marketplace";
          dontUnpack = true;
          dontBuild = true;
          installPhase = ''
            cp -r ${d2nFlakeOutputs.packages.${system}.default}/lib/node_modules/nft-marketplace/build $out
          '';
        };
      }
      );

      devShells = lib.perSystem (system: {
        default = with pkgsFor.${system}; mkShell {
          buildInputs = [ nodePackages.npm ];
        };
      });
    };
}
