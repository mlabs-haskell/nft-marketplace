import { createContext, useState, FC, useMemo, useContext } from 'react';
import { getImages } from 'api/image';
import { getArtists } from 'api/artist';
import { ArtistsType } from 'types/artists';
import { ImageType } from 'types/image';
import makeSdk from 'seabug-sdk/src';
import { InformationNft, Maybe, NftId } from 'seabug-sdk/src/common';

type AppMessage = {
  type: 'Success' | 'Error' | 'Info';
  userMsg?: string;
  debugMsg?: any;
};

export type NftContextType = {
  artists: {
    list: ArtistsType.Artist[];
    getByPubKeyHash: (pkh: string) => Maybe<ArtistsType.Artist>;
    fetch: () => void;
  };
  images: {
    list: ImageType.NftImage[];
    getByNftId: (nftId: NftId) => Maybe<ImageType.NftImage>;
    fetch: () => void;
  };
  nfts: {
    list: InformationNft[];
    onAuctionCount: number;
    getById: (nftId: NftId) => Maybe<InformationNft>;
    fetch: () => void;
  };
  common: {
    messages: AppMessage[];
    fetchAll: () => void;
  };
  filteredArtist: ArtistsType.Artist[];
  setFilteredArtists: (artistList: ArtistsType.Artist[]) => void;
};

export const NftContext = createContext<NftContextType>({
  artists: {
    list: [],
    getByPubKeyHash: (pkh: string) => undefined,
    fetch: () => {},
  },
  images: {
    list: [],
    getByNftId: (nftId: NftId) => undefined,
    fetch: () => {},
  },
  nfts: {
    list: [],
    onAuctionCount: 0,
    getById: (nftId: NftId) => undefined,
    fetch: () => {},
  },
  common: {
    messages: [],
    fetchAll: () => undefined,
  },
  filteredArtist: [],
  setFilteredArtists: () => undefined,
});

export const NftContextProvider: FC = ({ children }) => {
  // Internal state
  const [artistsByPkh, setArtistsByPkh] = useState<
    Map<string, ArtistsType.Artist>
  >(new Map());
  const [imagesByNftId, setImagesByNftId] = useState<
    Map<string, ImageType.NftImage>
  >(new Map());
  const [nftsById, setNftsById] = useState<Map<string, InformationNft>>(
    new Map()
  );
  const [messages, setMessages] = useState<AppMessage[]>([]);
  const [filteredArtist, setFilteredArtist] =
    useState<ArtistsType.Artist[]>([]);

  // App Messages

  const addMessage = (msg: AppMessage) => {
    if (!msg.userMsg && !msg.debugMsg) {
      console.error('Attempted to add message with no content!');
      return;
    }

    setMessages([...messages, msg]);

    if (msg.debugMsg) {
      if (msg.type === 'Error') {
        console.error(msg.debugMsg);
      } else {
        console.log(msg.debugMsg);
      }
    }
  };

  // Artists

  const artistsList = useMemo(() => [...artistsByPkh.values()], [artistsByPkh]);

  const getArtistByPubKeyHash = (pkh: string) => artistsByPkh.get(pkh);

  const fetchArtists = async () => {
    try {
      const newArtists = await getArtists();
      const newArtistsByPkh = new Map(
        newArtists.map((artist) => [artist.pubKeyHash, artist])
      );
      setArtistsByPkh(newArtistsByPkh);
    } catch (err) {
      addMessage({
        type: 'Error',
        userMsg: 'Unable to fetch artists. Please try again.',
        debugMsg: err,
      });
    }
  };

  // Images

  const imagesList = useMemo(
    () => [...imagesByNftId.values()],
    [imagesByNftId]
  );

  const getImageByNftId = (nftId: NftId) =>
    imagesByNftId.get(nftId.contentHash);

  async function fetchImages() {
    try {
      const newImages = await getImages();
      const newImagesByNftId = new Map(
        newImages.map((image) => [image.sha256hash, image])
      );
      setImagesByNftId(newImagesByNftId);
    } catch (err) {
      addMessage({
        type: 'Error',
        userMsg: 'Unable to fetch images. Please try again.',
        debugMsg: err,
      });
    }
  }

  // NFTs

  const nftsList = useMemo(() => [...nftsById.values()], [nftsById]);

  const nftsOnAuctionCount = useMemo(
    () =>
      nftsList.filter((nft) => (nft?.auctionState?.deadline ?? 0) > Date.now())
        .length,
    [nftsById]
  );

  const getNftById = (nftId: NftId) => nftsById.get(nftId.contentHash);

  async function fetchNfts() {
    try {
      // TODO: Replace with actual url and walletId once server and wallet integration ready
      const url = '';
      const walletId = '';

      const sdk = await makeSdk(url, walletId);
      const newNfts = await sdk.query.listNfts();

      const newNftsById = new Map(
        newNfts.map((nft) => [nft.id.contentHash, nft])
      );

      setNftsById(newNftsById);
    } catch (err) {
      addMessage({
        type: 'Error',
        userMsg: 'Unable to fetch NFTs. Please try again.',
        debugMsg: err,
      });
    }
  }

  const fetchAll = async () => {
    fetchArtists();
    fetchImages();
    fetchNfts();
  };

  const setFilteredArtists = (artistList: ArtistsType.Artist[]) => {
    setFilteredArtist(artistList);
  };

  return (
    <NftContext.Provider
      value={{
        artists: {
          list: artistsList,
          getByPubKeyHash: getArtistByPubKeyHash,
          fetch: fetchArtists,
        },
        images: {
          list: imagesList,
          getByNftId: getImageByNftId,
          fetch: fetchImages,
        },
        nfts: {
          list: nftsList,
          onAuctionCount: nftsOnAuctionCount,
          getById: getNftById,
          fetch: fetchNfts,
        },
        common: {
          messages,
          fetchAll,
        },
        filteredArtist,
        setFilteredArtists,
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

export const useNftContext = () => useContext<NftContextType>(NftContext);
