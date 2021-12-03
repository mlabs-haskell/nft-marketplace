import { createContext, useState, useEffect, FC } from 'react';
import { getImage } from 'api/image';
import { v4 as uuid } from 'uuid';
import makeSdk from 'seabug-sdk/src';
import { InformationNft } from 'seabug-sdk/src/common';

export type GlobalContent = {
  images: Array<any>;
  fetchImages: () => void;
};

export const NftContext = createContext<GlobalContent>({
  images: [], // set a default value
  fetchImages: () => {},
});

export const NftContextProvider: FC = ({ children }) => {
  const [images, setImages] = useState<Array<any>>([]);

  async function fetchImages() {
    const url = '';
    const walletId = '';

    const sdk = await makeSdk(url, walletId);

    // Get NFT and Image Data
    const nftList = await sdk.query.listNfts();

    const time = nftList[0].auctionState?.deadline;

    const { data } = await getImage();
    useEffect(() => {
      nftList.forEach((nft: InformationNft, i: number) => {
        if (nft.id.contentHash === data[i].sha256hash) {
          setImages([...images, data[i]]);
        }
      });
    }, []);
  }

  return (
    <NftContext.Provider value={{ images, fetchImages }}>
      {children}
    </NftContext.Provider>
  );
};
