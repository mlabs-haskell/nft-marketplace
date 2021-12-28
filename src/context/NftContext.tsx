import { createContext, useState, FC, useMemo, useContext } from 'react';
import toast from 'react-hot-toast';
import { getImages } from 'api/image';
import { getArtists } from 'api/artist';
import { ArtistsType } from 'types/artists';
import { ImageType } from 'types/image';
import makeSdk from 'seabug-sdk/src';
import { InformationNft, Maybe, NftId } from 'seabug-sdk/src/common';
import { BuyParams } from 'seabug-sdk/src/buy';
import { SetPriceParams } from 'seabug-sdk/src/setPrice';

type AppMessage = {
  type: 'Success' | 'Error' | 'Info';
  userMsg: string;
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
    getById: (nftId: NftId) => Maybe<InformationNft>;
    getLiveAuctionList: () => InformationNft[];
    fetch: () => void;
    buy: (buyParams: BuyParams) => void;
    setPrice: (setPriceParams: SetPriceParams) => void;
  };
  search: {
    text: string;
    setText: (searchText: string) => void;
    getMatchingArtists: () => ArtistsType.Artist[];
  };
  common: {
    messages: AppMessage[];
    fetchAll: () => void;
  };
};

export const NftContext = createContext<NftContextType>({
  artists: {
    list: [],
    getByPubKeyHash: () => undefined,
    fetch: () => {},
  },
  images: {
    list: [],
    getByNftId: () => undefined,
    fetch: () => {},
  },
  nfts: {
    list: [],
    getById: () => undefined,
    getLiveAuctionList: () => [],
    fetch: () => {},
    buy: () => undefined,
    setPrice: () => {},
  },
  search: {
    text: '',
    setText: () => {},
    getMatchingArtists: () => [],
  },
  common: {
    messages: [],
    fetchAll: () => undefined,
  },
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
  const [searchText, setSearchText] = useState('');
  const [messages, setMessages] = useState<AppMessage[]>([]);
  // App Messages

  const addMessage = (msg: AppMessage) => {
    if (!msg.userMsg && !msg.debugMsg) {
      toast.error('Attempted to add message with no content!');
      return;
    }

    setMessages([...messages, msg]);

    if (msg.debugMsg) {
      if (msg.type === 'Error') {
        toast.error(msg.userMsg);
        console.log(msg.debugMsg);
      } else {
        toast.success(msg.userMsg);
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

  const nftsOnAuctionList = useMemo(() => {
    console.log(
      `listOnAuction() called. Length: ${
        nftsList.filter(
          (nft) => (nft?.auctionState?.deadline ?? 0) > Date.now()
        ).length
      }`
    );

    return nftsList.filter(
      (nft) => (nft?.auctionState?.deadline ?? 0) > Date.now()
    );
  }, [nftsList]);

  const getNftById = (nftId: NftId) => nftsById.get(nftId.contentHash);

  const getLiveAuctionNftsList = () =>
    nftsOnAuctionList.filter(
      (nft) => (nft?.auctionState?.deadline ?? 0) > Date.now()
    );

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

  async function buyNft(buyParams: BuyParams) {
    try {
      const url = '';
      const walletId = '';

      const sdk = await makeSdk(url, walletId);
      const response = await sdk.makeTransaction.buy(buyParams);

      // TODO: Get transaction from response, sign and submit it
      // (once wallet integration is ready)
    } catch (err) {
      addMessage({
        type: 'Error',
        userMsg: 'Unable to buy NFT',
        debugMsg: err,
      });
    }
  }

  async function ChangePrice(setPriceParams: SetPriceParams) {
    try {
      const url = '';
      const walletId = '';

      const sdk = await makeSdk(url, walletId);

      const response = await sdk.makeTransaction.setPrice(setPriceParams);
      console.log(response);
      // TODO: Get transaction from response, sign and submit it
      // (once wallet integration is ready)
    } catch (err) {
      addMessage({
        type: 'Error',
        userMsg: 'Unable to change price of NFT',
        debugMsg: err,
      });
    }
  }

  // Search

  // TODO: optimize search performance (e.g., n-grams search index, memoize results, etc.)
  const getMatchingArtists = () =>
    artistsList.filter((item) => {
      const regex = new RegExp(searchText, 'gi');
      return item.name.match(regex);
    });

  // Common

  const fetchAll = async () => {
    fetchArtists();
    fetchImages();
    fetchNfts();
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
          getById: getNftById,
          getLiveAuctionList: getLiveAuctionNftsList,
          fetch: fetchNfts,
          buy: buyNft,
          setPrice: ChangePrice,
        },
        search: {
          text: searchText,
          setText: setSearchText,
          getMatchingArtists,
        },
        common: {
          messages,
          fetchAll,
        },
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

export const useNftContext = () => useContext<NftContextType>(NftContext);
