export type Maybe<T> = T | undefined

export type Rational = [number, number]

export type NftId = {
  contentHash: string
}

export type UserId = {
  pubKeyHash: string
}

/**
 * The contents of a file.
 */
export type Content = string | Blob;

export type InformationNft = { 
  /**
   * NFT ID. Represents the key of the Datum. ?could even be taken out of the information?
   */
  id: NftId,
  
  /**
   * Author's share of the NFT.
   */
  share: Rational,
  
  /**
   * Author's wallet pubKey.
   */
  author: UserId,
  
  /**
   * Owner's wallet pubkey.
   */
  owner: UserId,
  
  /**
   * Price in Lovelace. If Nothing, NFT not for sale.
   */
  price: Maybe<bigint>,
  
  /**
   * Auction state
   */
  auctionState: Maybe<AuctionState>
}

export type AuctionState = {
  /**
   * Highest bid
   */
  highestBid: Maybe<AuctionBid>,
  
  /**
   * Deadline
   */
  deadline: Date, 
  
  /**
   * Minimum bid amount
   */
  minBid: bigint
}

export type AuctionBid = {
  /**
   * Bid in Lovelace
   */
  bid: bigint,
  
  /** 
   * Bidder's wallet pubkey
   */
  bidder: UserId
}

export interface TransactionResponse {
  /**
   * CBOR hex of an unsigned transaction.
   */
  transaction: string
}

export interface TransactionNftIdResponse extends TransactionResponse {
  /**
   * The identifier of the NFT.
   */
  nftId: NftId
}