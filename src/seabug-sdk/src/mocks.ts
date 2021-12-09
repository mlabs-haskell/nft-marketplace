import { Rational, UserId } from './common';

const getRandomElement = <T>(list: T[]) =>
  list[Math.floor(Math.random() * list.length)];

const generateIds = (count: number) => [...Array(count).keys()];

const getRandomPrice = () => BigInt(Math.ceil(Math.random() * 1000000000));

export const mockUserId: UserId = {
  pubKeyHash: 'wxyz7890',
};

export const mockTransactionCBORHex =
  '84a500800d80018182581d60a2c20c77887ace1cd986193e4e75babd8993cfd56995cd5cfce609c21a0098968002000e80a0f5f6';

export const makeMockHash = (baseHash: string, suffixNum: number) => {
  const suffix = suffixNum.toString();
  return baseHash.substring(0, baseHash.length - suffix.length) + suffix;
};

export const makeMockNftId = (suffixNum: number) => ({
  contentHash: makeMockHash('aa00000000', suffixNum),
});

export const makeMockInformationNfts = (count: number) => {
  const baseArtistHash = 'ff00000000';
  const artistHashes = [...Array(22).keys()].map((idNum) =>
    makeMockHash(baseArtistHash, idNum)
  );

  const heighestBids = [
    undefined,
    {
      bid: BigInt(Math.floor(Math.random() * 100000000)),
      bidder: { pubKeyHash: getRandomElement(artistHashes) },
    },
  ];

  const getRandomAuctionState = () => {
    if (Math.random() < 0.7) {
      return undefined;
    }
    return {
      highestBid: getRandomElement(heighestBids),
      deadline: new Date(
        new Date().getTime() + Math.floor(Math.random() * 6000000)
      ),
      minBid: 0n,
    };
  };

  return generateIds(count).map((idNum) => {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const nums: Rational = [num1, num2];

    return {
      id: makeMockNftId(idNum),
      share: nums.sort(),
      author: { pubKeyHash: getRandomElement(artistHashes) },
      owner: { pubKeyHash: getRandomElement(artistHashes) },
      price: getRandomPrice(),
      auctionState: getRandomAuctionState(),
    };
  });
};
