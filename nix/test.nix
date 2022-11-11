{ config, lib, pkgs, modulesPath, ... }:

{
  imports = [
    ./nft-marketplace-frontend.nix
  ];

  services.nft-marketplace-frontend.enable = true;
}
