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
      systems = ["x86_64-linux"];
      config.projectRoot = ./.;
      source = ./.;
      settings = [
        {
          subsystemInfo.noDev = false;
          subsystemInfo.nodejs = 16;
        }
      ];
    };

    checks = d2nFlakeOutputs.packages;

    packages = perSystem (
      system: let
        pkgs = pkgsFor system; in {
          default = pkgs.stdenv.mkDerivation {
            name = "nft-marketplace";
            dontUnpack = true;
            dontBuild = true;
            installPhase = ''
              cp -r ${d2nFlakeOutputs.packages.${system}.default}/lib/node_modules/nft-marketplace/build/ $out/
            '';
          };
      });

    apps = perSystem (
      system: let
        pkgs = pkgsFor system;
      in {
        default = { # TODO: npm run start? nginx?
          type = "app";
          program = "${pkgs.writeShellScript "run-nft-marketplace" ''

          ''}";
        };
      }
    );

    devShells = perSystem (system: d2nFlakeOutputs.packages.${system}.default);
  in {
    inherit packages apps checks devShells;
  };
}
