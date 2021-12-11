import { createContext, useState, FC, useCallback } from 'react';
import { getImage } from 'api/image';
import { getArtist } from 'api/artist';
import { ArtistsType } from 'types/artists';
import makeSdk from 'seabug-sdk/src';
import { InformationNft, Maybe, NftId } from 'seabug-sdk/src/common';

type NftImage = {
  path: string;
  createdAt: Date;
  id: number;
  title: string;
  sha256hash: string;
};

export type NftContextType = {
  imagesByNftId: Map<string, NftImage>;
  fetchImages: () => void;
  nfts: InformationNft[];
  nftsById: Map<string, InformationNft>;
  fetchNfts: () => void;
  imageLoading: boolean;

  // artists
  fetchArtists: () => void;
  artists: ArtistsType.Artist[];
};

export const NftContext = createContext<NftContextType>({
  // images
  imagesByNftId: new Map(),
  fetchImages: () => {},
  // nfts
  nfts: [],
  nftsById: new Map(),
  fetchNfts: () => {},
  imageLoading: false,
  // artists
  fetchArtists: () => {},
  artists: [],
});

export const NftContextProvider: FC = ({ children }) => {
  const [imagesByNftId, setImagesByNftId] = useState<Map<string, NftImage>>(
    new Map()
  );
  const [nfts, setNfts] = useState<InformationNft[]>([]);
  const [nftsById, setNftsById] = useState<Map<string, InformationNft>>(
    new Map()
  );
  const [imageLoading, setImageLoading] = useState(true);
  const [artists, setArtists] = useState<ArtistsType.Artist[]>([]);

  async function fetchImages() {
    const imageList = await getImage();

    const imageMap = new Map<string, NftImage>();

    imageList.forEach((img) => {
      imageMap.set(img.sha256hash, img);
    });

    setImagesByNftId(imageMap);
  }

  async function fetchNfts() {
    // TODO: Replace with actual url and walletId once server and wallet integration ready
    const url = '';
    const walletId = '';

    const sdk = await makeSdk(url, walletId);
    const newNfts = await sdk.query.listNfts();

    const newNftsById = new Map(
      newNfts.map((nft) => [nft.id.contentHash, nft])
    );

    setNfts(newNfts);
    setNftsById(newNftsById);
  }

  const fetchArtists = useCallback(async () => {
    try {
      const newArtists = await getArtist();
      setArtists(newArtists);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <NftContext.Provider
      value={{
        imagesByNftId,
        fetchImages,
        nfts,
        nftsById,
        fetchNfts,
        imageLoading,
        fetchArtists,
        artists,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};
