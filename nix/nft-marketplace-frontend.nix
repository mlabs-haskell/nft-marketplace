{ config, lib, pkgs, ... }:

let
  cfg = config.services.nft-marketplace-frontend;
in
{
  options.services.nft-marketplace-frontend = {
    enable = lib.mkEnableOption "Enable nft-marketplace frontend";

    artifactsBuilder = lib.mkOption {
      type = with lib.types; functionTo package;
    };

    artifacts = lib.mkOption {
      type = lib.types.package;
      default = with cfg; (artifactsBuilder
        {
          REACT_APP_API_BASE_URL = api.baseUrl;
          REACT_APP_CTL_LOG_LEVEL = ctl.logLevel;
          REACT_APP_CTL_SERVER_HOST = ctl.server.host;
          REACT_APP_CTL_SERVER_PORT = "${toString ctl.server.port}";
          REACT_APP_CTL_SERVER_SECURE_CONN = "${lib.boolToString ctl.server.secureConnection}";
          REACT_APP_CTL_OGMIOS_HOST = ctl.ogmios.host;
          REACT_APP_CTL_OGMIOS_PORT = ctl.ogmios.port;
          REACT_APP_CTL_OGMIOS_SECURE_CONN = "${lib.boolToString ctl.ogmios.secureConnection}";
          REACT_APP_CTL_DATUM_CACHE_HOST = ctl.ogmios-datum-cache.host;
          REACT_APP_CTL_DATUM_CACHE_PORT = "${toString ctl.ogmios-datum-cache.port}";
          REACT_APP_CTL_DATUM_CACHE_SECURE_CONN = "${lib.boolToString ctl.ogmios-datum-cache.secureConnection}";
          REACT_APP_CTL_NETWORK_ID = "${toString ctl.networkId}";
          REACT_APP_CTL_PROJECT_ID = ctl.projectId;
          REACT_APP_IPFS_BASE_URL = ipfsBaseUrl;
        } // buildExtraSettings);
    };

    api.baseUrl = lib.mkOption {
      type = lib.types.str;
      default = "https://api.seabug.staging.mlabs.city";
    };

    ctl = {
      logLevel = lib.mkOption {
        type = lib.types.str;
        default = "Trace";
      };

      server = {
        host = lib.mkOption {
          type = lib.types.str;
          default = "ctl-server.preview-seabug.ctl-runtime.staging.mlabs.city";
        };

        port = lib.mkOption {
          type = lib.types.port;
          default = 443;
        };

        secureConnection = lib.mkOption {
          type = lib.types.bool;
          default = true;
        };
      };

      ogmios = {
        host = lib.mkOption {
          type = lib.types.str;
          default = "ogmios.preview-seabug.ctl-runtime.staging.mlabs.city";
        };

        port = lib.mkOption {
          type = lib.types.port;
          default = 443;
        };

        secureConnection = lib.mkOption {
          type = lib.types.bool;
          default = true;
        };
      };

      ogmios-datum-cache = {
        host = lib.mkOption {
          type = lib.types.str;
          default = "ogmios-datum-cache.preview-seabug.ctl-runtime.staging.mlabs.city";
        };

        port = lib.mkOption {
          type = lib.types.port;
          default = 443;
        };

        secureConnection = lib.mkOption {
          type = lib.types.bool;
          default = true;
        };
      };

      networkId = lib.mkOption {
        type = lib.types.int;
        default = 0;
      };

      projectId = lib.mkOption {
        type = lib.types.str;
        default = "previewoXa2yw1U0z39X4VmTs6hstw4c6cPx1LN";
      };
    };

    ipfsBaseUrl = lib.mkOption {
      type = lib.types.str;
      default = "https://cloudflare-ipfs.com/ipfs/";
    };

    buildExtraSettings = lib.mkOption {
      type = lib.types.attrs;
      default = { };
    };

    virtualHostName = lib.mkOption {
      type = lib.types.str;
      default = "seabug";
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
        "${cfg.virtualHostName}" = {
          root = cfg.artifacts;
        };
      };
    };

  };
}
