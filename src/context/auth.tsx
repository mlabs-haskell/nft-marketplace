import { createContext, useState, useEffect, FC } from 'react';
import { getImage } from 'api/image';
import { v4 as uuid } from 'uuid';
import makeSdk from 'seabug-sdk/src';
import { InformationNft } from 'seabug-sdk/src/common';

export type GlobalContent = {
  images: Array<any>;
  exploreImages: Array<{
    sha256hash: string;
    path: string;
  }>;
  fetchImages: () => void;
};

export const NftContext = createContext<GlobalContent>({
  images: [], // set a default value
  exploreImages: [
    {
      sha256hash: '',
      path: '',
    },
  ],
  fetchImages: () => {},
});

export const NftContextProvider: FC = ({ children }) => {
  const [images, setImages] = useState<Array<any>>([]);
  const [exploreImages, setExploreImages] = useState<Array<any>>([]);

  async function fetchImages() {
    const url = '';
    const walletId = '';

    const sdk = await makeSdk(url, walletId);

    // Get NFT and Image Data
    const nftList = await sdk.query.listNfts();

    const data = await getImage(0, 18);
    setExploreImages(data);
    nftList.forEach((nft: InformationNft, i: number) => {
      if (nft.id.contentHash === data[i].sha256hash) {
        setImages([...images, data[i]]);
      }
    });
  }
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <NftContext.Provider value={{ images, exploreImages, fetchImages }}>
      {children}
    </NftContext.Provider>
  );
};
