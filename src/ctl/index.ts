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

/**
 * Seabug CTL functions for querying and generating transactions.
 */
export const getCtl = async () => {
  const ctlSeabug = await import('cardano-transaction-lib-seabug');
  return {
    listNfts: () => ctlSeabug.callMarketPlaceListNft(ctlConfig),
    buyNft: (buyArgs: ContractArgs) =>
      ctlSeabug.callMarketPlaceBuy(ctlConfig, buyArgs),
  };
};