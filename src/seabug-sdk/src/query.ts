import { Content, InformationNft, Maybe, NftId, UserId } from './common';
import { makeMockInformationNfts, mockUserId } from './mocks';

/**
 * Retrieves the current owner of a given NftId.
 */
export const queryCurrentOwner =
  (baseURL: string, contractInstanceId: string) =>
  async (nftId: NftId): Promise<UserId> =>
    Promise.resolve(mockUserId);

/**
 * Retrieves the current price of the given NftId.
 */
export const queryCurrentPrice =
  (baseURL: string, contractInstanceId: string) =>
  async (nftId: NftId): Promise<Maybe<bigint>> =>
    Promise.resolve(250000000n);

/**
 * Query the list of all NFTs in the app
 */
export const queryListNfts =
  (baseURL: string, contractInstanceId: string) =>
  async (): Promise<InformationNft[]> =>
    Promise.resolve(makeMockInformationNfts(1000));

/**
 * Given an application instance and a `Content` returns the status of the NFT
 */
export const queryContent =
  (baseURL: string, contractInstanceId: string) =>
  async (content: Content): Promise<Maybe<InformationNft>> =>
    Promise.resolve(makeMockInformationNfts(1)[0]);
