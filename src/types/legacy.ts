import { Maybe } from "./common";

/**
 * Types from legacy NFT marketplace (to be removed)
 */

export type NftId = {
  contentHash: string
}

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
