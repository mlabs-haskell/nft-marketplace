{
  description = "Seabug frontend";
  inputs = {
    nixpkgs.url = github:NixOs/nixpkgs/nixos-unstable;
    dream2nix = {
      url = github:nix-community/dream2nix;
      inputs.nixpgks.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    dream2nix,
  }: let
    supportedSystems = ["x86_64-linux" "x86_64-darwin"];

    perSystem = nixpkgs.lib.genAttrs supportedSystems;

    pkgsFor = system:
      import nixpkgs {
        inherit system;
      };

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
  in {
    # The following add a check that run `npm run test` (i.e. `craco test`)
    # uncomment when some tests will be implemented

    # checks = perSystem (system: let
    #   pkgs = pkgsFor system;
    # in {
    #   cracoTest = d2nFlakeOutputs.packages.${system}.default.overrideAttrs (old: {
    #     doCheck = true;
    #     dontInstall = true;
    #     checkPhase = ''
    #       npm run test
    #     '';
    #   });
    # });

    packages = perSystem (
      system: let
        pkgs = pkgsFor system;
      in {
        default = pkgs.stdenv.mkDerivation {
          name = "nft-marketplace";
          dontUnpack = true;
          dontBuild = true;
          installPhase = ''
            cp -r ${d2nFlakeOutputs.packages.${system}.default}/lib/node_modules/nft-marketplace/build/ $out/
          '';
        };
      }
    );

    devShells = perSystem (system: let
      pkgs = pkgsFor system;
    in {
      default = pkgs.mkShell {
        buildInputs = with pkgs; [nodePackages.npm];
      };
    });
  };
}
