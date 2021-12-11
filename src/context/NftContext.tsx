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
  saleValue: InformationNft['price'];
  topBidValue?: AuctionState['highestBid'];
  creatorValue: InformationNft['share'];
};

export type NftContextType = {
  images: Map<string, NftImage>;
  fetchImages: () => void;
  nfts: Map<string, InformationNft>;
  fetchNfts: () => void;
  imageLoading: boolean;

  // artists
  fetchArtists: () => void;
  artists: ArtistsType.Artist[];
  fetchNft: (nftId: string) => void;
  itemDetailNft?: NftItemDetail;
  getNftById?: (id: string) => InformationNft | undefined;
};

export const NftContext = createContext<NftContextType>({
  images: new Map(),
  fetchImages: () => {},
  nfts: new Map(),
  fetchNfts: () => {},
  imageLoading: false,
  // artists
  fetchArtists: () => {},
  artists: [],
  fetchNft: () => {},
});

export const NftContextProvider: FC = ({ children }) => {
  const [images, setImages] = useState<Map<string, NftImage>>(new Map());
  const [nfts, setNfts] = useState<Map<string, InformationNft>>(new Map());
  const [itemDetailNft, setItemDetailNft] = useState<NftItemDetail>();
  const [imageLoading, setImageLoading] = useState(true);
  const [artists, setArtists] = useState<ArtistsType.Artist[]>([]);

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
      setArtists(newArtists);
    } catch (err) {
      console.error(err);
    }
  }, []);

  function getNftById(id: string) {
    const nft = nfts.get(id);
    if (nft) return nft;
    return undefined;
  }

  async function fetchNft(nftId: string) {
    // search in nfts
    const nft = getNftById(nftId);
    // search images
    const image = images.get(nftId);
    // search author
    artists.forEach((artist) => {
      if (image && nft && artist.pubKeyHash === nft.author.pubKeyHash) {
        setItemDetailNft({
          title: image.title,
          image: image.path,
          description: image.description,
          creatorName: artist.name,
          creatorAvatarImage: artist.imagePath,
          saleValue: nft.price,
          topBidValue: nft.auctionState?.highestBid,
          creatorValue: nft.share,
        });
      }
    });
  }

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
        getNftById,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};
