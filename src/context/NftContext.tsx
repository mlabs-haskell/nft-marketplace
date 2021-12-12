import { createContext, useState, FC, useCallback } from 'react';
import { getImage } from 'api/image';
import { getArtist } from 'api/artist';
import { ArtistsType } from 'types/artists';
import makeSdk from 'seabug-sdk/src';
import { InformationNft } from 'seabug-sdk/src/common';

type NftImage = {
  path: string;
  avatarPath: string;
  createdAt: Date;
  id: number;
  title: string;
  sha256hash: string;
  description: string;
};

export type NftContextType = {
  images: Map<string, NftImage>;
  fetchImages: () => void;
  nfts: Map<string, InformationNft>;
  fetchNfts: () => void;
  imageLoading: boolean;

  // artists
  fetchArtists: () => void;
  artists: Map<string, ArtistsType.Artist>;
};

export const NftContext = createContext<NftContextType>({
  images: new Map(),
  fetchImages: () => {},
  nfts: new Map(),
  fetchNfts: () => {},
  imageLoading: false,
  // artists
  fetchArtists: () => {},
  artists: new Map(),
});

export const NftContextProvider: FC = ({ children }) => {
  const [images, setImages] = useState<Map<string, NftImage>>(new Map());
  const [nfts, setNfts] = useState<Map<string, InformationNft>>(new Map());
  const [imageLoading, setImageLoading] = useState(true);
  const [artists, setArtists] = useState<Map<string, ArtistsType.Artist>>(
    new Map()
  );

  async function fetchImages() {
    try {
      const imageList = await getImage();

      const imageMap = new Map<string, NftImage>();

      imageList.forEach((img) => {
        imageMap.set(img.sha256hash, img);
      });

      setImages(imageMap);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchNfts() {
    // TODO: Replace with actual url and walletId once server and wallet integration ready

    try {
      const url = '';
      const walletId = '';
      const sdk = await makeSdk(url, walletId);

      const nftsList = await sdk.query.listNfts();

      const nftsMap = new Map<string, InformationNft>();

      nftsList.forEach((nft) => {
        nftsMap.set(nft.id.contentHash, nft);
      });

      setNfts(nftsMap);
    } catch (err) {
      console.log(err);
    }
  }

  const fetchArtists = useCallback(async () => {
    try {
      const newArtists = await getArtist();
      const artistsMap = new Map<string, ArtistsType.Artist>();

      newArtists.forEach((artist) => {
        artistsMap.set(artist.pubKeyHash, artist);
      });
      setArtists(artistsMap);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <NftContext.Provider
      value={{
        images,
        fetchImages,
        nfts,
        imageLoading,
        fetchNfts,
        fetchArtists,
        artists,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};
