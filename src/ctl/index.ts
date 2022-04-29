import { ContractArgs } from 'cardano-transaction-lib-seabug';
import { getAppConfig } from 'utils/appConfig';

const appConfig = getAppConfig();

const ctlConfig = {
  serverHost: appConfig.ctl.server.host,
  serverPort: appConfig.ctl.server.port,
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

let ctlSeabug: typeof import('cardano-transaction-lib-seabug');

/**
 * Seabug CTL functions for querying and generating transactions.
 */
export const getCtl = async () => {
  if (!ctlSeabug) {
    ctlSeabug = await import('cardano-transaction-lib-seabug');
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
    connectWallet: () => ctlSeabug.connectWallet(),
    getWalletLovelace: async () => {
      const balance = await ctlSeabug.getWalletBalance();
      try {
        return BigInt(balance.value0.coin().to_str());
      } catch (err) {
        return 0n;
      }
    },
  };
};
