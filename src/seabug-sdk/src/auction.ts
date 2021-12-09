import { NftId, TransactionResponse } from './common';
import { mockTransactionCBORHex } from './mocks';

export type AuctionBidParams = {
  /**
   * NFT identifier.
   */
  nftId: NftId;

  /**
   * Bid amount in lovelace
   */
  bidAmount: bigint;
};

export type AuctionCloseParams = {
  /**
   * NFT identifier.
   */
  nftId: NftId;
};

export type AuctionOpenParams = {
  /**
   * NFT identifier.
   */
  nftId: NftId;
  /**
   * Auction deadline
   */
  deadline: Date;

  /**
   * Auction minimum bid in lovelace
   */
  minBid: bigint;
};

/**
 * Attempts to bid on NFT auction, locks new bid in the script, returns previous bid to previous bidder,
 * and sets new bid for the NFT.
 */
export const makeBidAuctionTransaction =
  (baseURL: string, contractInstanceId: string) =>
  async (params: AuctionBidParams): Promise<TransactionResponse> =>
    Promise.resolve({
      transaction: mockTransactionCBORHex,
    });

/**
 * Attempts to close NFT auction, checks if owner is closing an auction and deadline passed,
 * pays from script to previous owner, and sets new owner.
 */
export const makeCloseAuctionTransaction =
  (baseURL: string, contractInstanceId: string) =>
  async (params: AuctionCloseParams): Promise<TransactionResponse> =>
    Promise.resolve({
      transaction: mockTransactionCBORHex,
    });

/**
 * Attempts to start NFT auction, removes current price from NFT and starts auction.
 */
export const makeOpenAuctionTransaction =
  (baseURL: string, contractInstanceId: string) =>
  async (params: AuctionOpenParams): Promise<TransactionResponse> =>
    Promise.resolve({
      transaction: mockTransactionCBORHex,
    });
