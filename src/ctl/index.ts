import { ContractArgs, WalletOption } from 'seabug-contracts';
import { getAppConfig } from 'utils/appConfig';

const appConfig = getAppConfig();

const ctlConfig = {
  serverHost: appConfig.ctl.server.host,
  serverPort: appConfig.ctl.server.port,
  logLevel: appConfig.ctl.server.logLevel,
  serverSecureConn: appConfig.ctl.server.secureConn,
  ogmiosHost: appConfig.ctl.ogmios.host,
  ogmiosPort: appConfig.ctl.ogmios.port,
  ogmiosSecureConn: appConfig.ctl.ogmios.secureConn,
  datumCacheHost: appConfig.ctl.datumCache.host,
  datumCachePort: appConfig.ctl.datumCache.port,
  datumCacheSecureConn: appConfig.ctl.datumCache.secureConn,
  networkId: appConfig.ctl.networkId,
  projectId: appConfig.ctl.projectId,
};

let ctlSeabug: typeof import('seabug-contracts');

/**
 * Seabug CTL functions for querying and generating transactions.
 */
export const getCtl = async () => {
  if (!ctlSeabug) {
    ctlSeabug = await import('seabug-contracts');
  }

  return {
    listNfts: () => ctlSeabug.callMarketPlaceListNft(ctlConfig),
    buyNft: (buyArgs: ContractArgs) => {
      /* eslint-disable */
      console.log(
        JSON.stringify({ ctlConfig, buyArgs }, (key, val) =>
          typeof val === 'bigint' ? val.toString() : val
        )
      );
      /* eslint-enable */

      return ctlSeabug.callMarketPlaceBuy(ctlConfig, buyArgs);
    },
    getWalletLovelace: async (): Promise<bigint> => {
      const balance = (await ctlSeabug.getWalletLovelace(ctlConfig)).value;
      if (typeof balance !== 'bigint') {
        return 0n;
      }
      return balance;
    },
    getWalletPkh: (): Promise<string | null> =>
      ctlSeabug.getWalletPkh(ctlConfig),
  };
};
