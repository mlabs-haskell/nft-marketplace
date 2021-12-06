import { createContext, useState, useEffect, FC } from 'react';
import { getImage } from 'api/image';
import { v4 as uuid } from 'uuid';
import makeSdk from 'seabug-sdk/src';
import { InformationNft } from 'seabug-sdk/src/common';

type NftImage = {
  path: string;
  createdAt: Date;
  id: number;
  title: string;
  sha256hash: string;
};

type ValidNftImage = {
  nft: InformationNft;
  image: NftImage;
};

export type NftContextType = {
  images: Map<string, NftImage>;
  fetchImages: (skip: number, limit: number) => void;
  nfts: InformationNft[];
  fetchNfts: () => void;
  validationNftsImages: () => void;
  validImages: Map<string, ValidNftImage>;
};

export const NftContext = createContext<NftContextType>({
  images: new Map(),
  fetchImages: () => {},
  nfts: [],
  fetchNfts: () => {},
  validationNftsImages: () => {},
  validImages: new Map(),
});

export const NftContextProvider: FC = ({ children }) => {
  const [images, setImages] = useState<Map<string, NftImage>>(new Map());
  const [nfts, setNfts] = useState<InformationNft[]>([]);
  const [validImages, setValidImages] = useState<Map<string, ValidNftImage>>(
    new Map()
  );

  async function fetchImages(skip: number, limit: number) {
    const imageList = await getImage(skip, limit);

    const imageMap = new Map<string, NftImage>();

    imageList.forEach((img) => {
      imageMap.set(img.sha256hash, img);
    });

    setImages(imageMap);
  }

  async function fetchNfts() {
    // TODO: Replace with actual url and walletId once server and wallet integration ready
    const url = '';
    const walletId = '';

    const sdk = await makeSdk(url, walletId);

    const nftList = await sdk.query.listNfts();

    setNfts(nftList);
  }

  async function validationNftsImages() {
    nfts.forEach((nft: InformationNft) => {
      const image = images.get(nft.id.contentHash);
      if (image) {
        setValidImages(
          (prev) => new Map([...prev, [nft.id.contentHash, { nft, image }]])
        );
      }
    });
  }

  return (
    <NftContext.Provider
      value={{
        images,
        fetchImages,
        nfts,
        fetchNfts,
        validationNftsImages,
        validImages,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

/*
   nftList.forEach((nft: InformationNft, i: number) => {
      if (nft.id.contentHash === data[i].sha256hash) {
        setImages([...images, data[i]]);
      }
    });
*/
