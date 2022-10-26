{ config, lib, pkgs, ... }:

let
  cfg = config.nft-marketplace-frontend;
in
{

  options.nft-marketplace-frontend = {

    enable = lib.mkOption {
      type = lib.types.bool;
      default = false;
    };

  };

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
