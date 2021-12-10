import { createContext, useState, FC, useCallback } from 'react';
import { getImage } from 'api/image';
import { getArtist } from 'api/artist';
import { ArtistsType } from 'types/artists';
import makeSdk from 'seabug-sdk/src';
import { AuctionState, InformationNft } from 'seabug-sdk/src/common';

type NftImage = {
  path: string;
  createdAt: Date;
  id: number;
  title: string;
  sha256hash: string;
  description: string;
};

type NftItemDetail = {
  title: string;
  image: string;
  description: string;
  creatorName: string;
  creatorAvatarImage: string;
  saleValue: number;
  topBidValue?: number;
  creatorValue: InformationNft['share'];
};

export type NftContextType = {
  images: Map<string, NftImage>;
  fetchImages: () => void;
  nfts: InformationNft[];
  fetchNfts: () => void;
  imageLoading: boolean;

  // artists
  fetchArtists: () => void;
  artists: ArtistsType.Artist[];
  fetchNft: () => void;
  itemDetailNft?: NftItemDetail;
};

export const NftContext = createContext<NftContextType>({
  images: new Map(),
  fetchImages: () => {},
  nfts: [],
  fetchNfts: () => {},
  imageLoading: false,
  // artists
  fetchArtists: () => {},
  artists: [],
  fetchNft: () => {},
});

export const NftContextProvider: FC = ({ children }) => {
  const [images, setImages] = useState<Map<string, NftImage>>(new Map());
  const [nfts, setNfts] = useState<InformationNft[]>([]);
  const [itemDetailNft, setItemDetailNft] = useState<NftItemDetail>();
  const [imageLoading, setImageLoading] = useState(true);
  const [artists, setArtists] = useState<ArtistsType.Artist[]>([]);

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

  async function fetchNft() {
    setItemDetailNft({
      title:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos',
      image: 'https://picsum.photos/300/500',
      description:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos',
      creatorName: 'Defacer#od',
      creatorAvatarImage: 'https://picsum.photos/200/300',
      saleValue: 10,
      topBidValue: 250,
      creatorValue: [1, 10],
    });
  }
  console.log(itemDetailNft);
  return (
    <NftContext.Provider
      value={{
        images,
        fetchImages,
        nfts,
        itemDetailNft,
        imageLoading,
        fetchNfts,
        fetchArtists,
        artists,
        fetchNft,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};
