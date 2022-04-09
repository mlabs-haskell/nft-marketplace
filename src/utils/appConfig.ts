interface AppConfig {
  baseUrl: string;
  ctl: {
    server: {
      host: string;
      port: number;
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
}

type AppConfigNetworkId = 0 | 1;

const parseStringVar = (name: string) => {
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
 * Returns the app config (or undefined if the config is invalid)
 */
export const getAppConfig = (): AppConfig | undefined => {
  if (!config) {
    try {
      config = {
        baseUrl: parseStringVar('REACT_APP_BASE_URL'),
        ctl: {
          server: {
            host: parseStringVar('REACT_APP_CTL_SERVER_HOST'),
            port: parseNumberVar('REACT_APP_CTL_SERVER_PORT'),
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
      };
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  return config;
};
