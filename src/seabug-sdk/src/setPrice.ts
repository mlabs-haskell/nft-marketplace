import { Maybe, NftId, TransactionResponse } from './common';
import { mockTransactionCBORHex } from './mocks';

export type SetPriceParams = {
  /**
   * The identifier of the NFT to be updated.
   */
  nftId: NftId;

  /**
   * The new price, in Lovelace.
   */
  price: Maybe<bigint>;
};

/**
 * Attempts to set a new price for the specified NFT.
 * (This may reject with an error.)
 */
export const makeSetPriceTransaction =
  (baseURL: string, contractInstanceId: string) =>
  async (params: SetPriceParams): Promise<TransactionResponse> =>
    Promise.resolve({
      transaction: mockTransactionCBORHex,
    });
