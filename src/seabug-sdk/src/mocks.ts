import { InformationNft, NftId, UserId } from './common';

export const mockNftId: NftId = {
  contentHash: 'abcd1234',
};

export const mockUserId: UserId = {
  pubKeyHash: 'wxyz7890',
};

export const mockTransactionCBORHex =
  '84a500800d80018182581d60a2c20c77887ace1cd986193e4e75babd8993cfd56995cd5cfce609c21a0098968002000e80a0f5f6';

export const mockInformationNft0: InformationNft = {
  id: { contentHash: 'abcd1234' },
  share: [1, 20],
  author: { pubKeyHash: 'wxyz7890' },
  owner: { pubKeyHash: 'xyza8901' },
  price: 20000000n,
  auctionState: {
    highestBid: undefined,
    deadline: new Date(),
    minBid: 0n,
  },
};

export const mockInformationNft1: InformationNft = {
  id: { contentHash: 'bcde2345' },
  share: [2, 10],
  author: { pubKeyHash: 'wxyz7890' },
  owner: { pubKeyHash: 'wxyz7890' },
  price: 10000000n,
  auctionState: {
    highestBid: {
      bid: 15000000n,
      bidder: mockUserId,
    },
    deadline: new Date(),
    minBid: 0n,
  },
};

export const mockInformationNft2: InformationNft = {
  id: { contentHash: 'cdef3456' },
  share: [33, 100],
  author: { pubKeyHash: 'xyza8902' },
  owner: { pubKeyHash: 'xyza8902' },
  price: 50000000n,
  auctionState: {
    highestBid: {
      bid: 55000000n,
      bidder: mockUserId,
    },
    deadline: new Date(),
    minBid: 0n,
  },
};

export const mockInformationNfts = [
  mockInformationNft0,
  mockInformationNft1,
  mockInformationNft2,
];
