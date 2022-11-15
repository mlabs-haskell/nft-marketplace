export interface AppConfig {
  api: {
    baseUrl: string;
    engageBayBaseUrl: string;
  };
  ctl: {
    server: {
      host: string;
      port: number;
      logLevel: string;
      secureConn: boolean;
    };
    ogmios: {
      host: string;
      port: number;
      secureConn: boolean;
    };
    datumCache: {
      host: string;
      port: number;
      secureConn: boolean;
    };
    networkId: AppConfigNetworkId;
    projectId: string;
  };
  ipfs: {
    baseUrl: string;
  };
}

type AppConfigNetworkId = 0 | 1;

export const parseStringVar = (name: string) => {
  const envVar = process.env[name];
  if (envVar === undefined) {
    throw new Error(`'${name}' environment variable is missing.`);
  }
  return envVar;
};

const parseNumberVar = (name: string): number => {
  const envVar = process.env[name];

  if (envVar === undefined) {
    throw new Error(`'${name}' environment variable is missing.`);
  }

  const parsed = Number.parseInt(envVar ?? '', 10);

  if (Number.isNaN(parsed) === true) {
    throw new Error(`'${name}' environment variable is invalid.`);
  }

  return parsed;
};

const parseBoolVar = (name: string) => {
  const envVar = process.env[name];

  if (envVar === undefined) {
    throw new Error(`'${name}' environment variable is missing.`);
  }

  const lCaseVar = envVar?.toLowerCase();

  if (lCaseVar === 'true') {
    return true;
  }
  if (lCaseVar === 'false') {
    return false;
  }
  throw new Error(`'${name}' environment variable is invalid.`);
};

const parseNetworkIdVar = (name: string) => {
  const parsed = parseNumberVar(name);

  if (parsed === 0 || parsed === 1) {
    return parsed;
  }
  throw new Error(`'${name}' environment variable is invalid.`);
};

let config: AppConfig | undefined;

/**
 * Returns the app config
 */
export const getAppConfig = (): AppConfig => {
  if (!config) {
    config = Object.freeze({
      api: {
        baseUrl: parseStringVar('REACT_APP_API_BASE_URL'),
        engageBayBaseUrl: parseStringVar('REACT_APP_ENGAGEBAY_BASE_URL'),
      },
      ctl: {
        server: {
          host: parseStringVar('REACT_APP_CTL_SERVER_HOST'),
          port: parseNumberVar('REACT_APP_CTL_SERVER_PORT'),
          logLevel: parseStringVar('REACT_APP_CTL_LOG_LEVEL'),
          secureConn: parseBoolVar('REACT_APP_CTL_SERVER_SECURE_CONN'),
        },
        ogmios: {
          host: parseStringVar('REACT_APP_CTL_OGMIOS_HOST'),
          port: parseNumberVar('REACT_APP_CTL_OGMIOS_PORT'),
          secureConn: parseBoolVar('REACT_APP_CTL_OGMIOS_SECURE_CONN'),
        },
        datumCache: {
          host: parseStringVar('REACT_APP_CTL_DATUM_CACHE_HOST'),
          port: parseNumberVar('REACT_APP_CTL_DATUM_CACHE_PORT'),
          secureConn: parseBoolVar('REACT_APP_CTL_DATUM_CACHE_SECURE_CONN'),
        },
        networkId: parseNetworkIdVar('REACT_APP_CTL_NETWORK_ID'),
        projectId: parseStringVar('REACT_APP_CTL_PROJECT_ID'),
      },
      ipfs: {
        baseUrl: parseStringVar('REACT_APP_IPFS_BASE_URL'),
      },
    });
  }

  return config;
};
