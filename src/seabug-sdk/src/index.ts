import {
  makeBidAuctionTransaction,
  makeCloseAuctionTransaction,
  makeOpenAuctionTransaction,
} from './auction';
import { makeBuyTransaction } from './buy';
import { makeMintTransaction } from './mint';
import {
  queryContent,
  queryCurrentOwner,
  queryCurrentPrice,
  queryListNfts,
} from './query';
import { makeSetPriceTransaction } from './setPrice';

export default async (baseUrl: string, walletId: string) => {
  const contractInstanceId = '123';

  return Promise.resolve({
    makeTransaction: {
      auction: {
        bid: makeBidAuctionTransaction(baseUrl, contractInstanceId),
        close: makeCloseAuctionTransaction(baseUrl, contractInstanceId),
        open: makeOpenAuctionTransaction(baseUrl, contractInstanceId),
      },
      buy: makeBuyTransaction(baseUrl, contractInstanceId),
      mint: makeMintTransaction(baseUrl, contractInstanceId),
      setPrice: makeSetPriceTransaction(baseUrl, contractInstanceId),
    },
    query: {
      content: queryContent(baseUrl, contractInstanceId),
      currentOwner: queryCurrentOwner(baseUrl, contractInstanceId),
      currentPrice: queryCurrentPrice(baseUrl, contractInstanceId),
      listNfts: queryListNfts(baseUrl, contractInstanceId),
    },
  });
};
