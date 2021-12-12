import { createContext, useState, FC, useCallback, useContext } from 'react';
import { getImage } from 'api/image';
import { getArtist } from 'api/artist';
import { ArtistsType } from 'types/artists';
import makeSdk from 'seabug-sdk/src';
import { InformationNft } from 'seabug-sdk/src/common';

type NftImage = {
  path: string;
  createdAt: Date;
  id: number;
  title: string;
  sha256hash: string;
};

export interface NftContextType {
  images: Map<string, NftImage>;
  fetchImages: () => void;
  nfts: InformationNft[];
  fetchNfts: () => void;
  imageLoading: boolean;

  // artists
  fetchArtists: () => void;
  artists: ArtistsType.Artist[];
  filteredArtist: ArtistsType.Artist[];
  setFilteredArtists: (artistList: ArtistsType.Artist[]) => void;
}

export const NftContext = createContext<NftContextType>({} as NftContextType);
interface Props {
  children: React.ReactNode;
}
export const NftContextProvider: FC<Props> = ({ children }) => {
  const [images, setImages] = useState<Map<string, NftImage>>(new Map());
  const [nfts, setNfts] = useState<InformationNft[]>([]);
  const [imageLoading] = useState(true);
  const [artists, setArtists] = useState<ArtistsType.Artist[]>([]);
  const [filteredArtist, setFilteredArtist] =
    useState<ArtistsType.Artist[]>(artists);

  async function fetchImages() {
    const imageList = await getImage();

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

  const fetchArtists = useCallback(async () => {
    try {
      const newArtists = await getArtist();
      setArtists(newArtists);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const setFilteredArtists = (artistList: ArtistsType.Artist[]) => {
    setFilteredArtist(artistList);
  };

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
        filteredArtist,
        setFilteredArtists,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

export const useNftContext = () => useContext<NftContextType>(NftContext);
