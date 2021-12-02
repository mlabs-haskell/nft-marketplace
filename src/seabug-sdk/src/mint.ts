import {
  Content,
  Maybe,
  NftId,
  Rational,
  TransactionNftIdResponse,
  TransactionResponse,
} from './common';
import { mockNftId, mockTransactionCBORHex } from './mocks';

export type MintParams = {
  /**
   * File content to be minted.
   */
  content: Content;

  /**
   * Title of content.
   */
  title: string;

  /**
   * Shares retained by author.
   */
  share: Rational;

  /**
   * Listing price of the NFT, in Lovelace.
   */
  price: Maybe<bigint>;
};

/**
 * Mints an NFT and sends it to the App Address.
 * (This may reject with an error.)
 */
export const makeMintTransaction =
  (baseURL: string, contractInstanceId: string) =>
  async (params: MintParams): Promise<TransactionNftIdResponse> =>
    Promise.resolve({
      transaction: mockTransactionCBORHex,
      nftId: mockNftId,
    });
