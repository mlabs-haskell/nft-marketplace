{ config, lib, pkgs, ... }:

let
  cfg = config.nft-marketplace-frontend;
in
{

  options.services.nft-marketplace-frontend.enable = lib.mkEnableOption "Enable nft-marketplace frontend";

  config = lib.mkIf cfg.enable {

    services.nginx = {
      enable = true;
      recommendedGzipSettings = true;
      recommendedOptimisation = true;
      recommendedProxySettings = true;
      recommendedTlsSettings = true;
      serverNamesHashBucketSize = 128;

      virtualHosts = {
        "seabug" = {
          root = pkgs.nft-marketplace-frontend-artifacts;
        };
      };
    };

  };
}
