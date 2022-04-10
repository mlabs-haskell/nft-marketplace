import {
  createContext,
  useState,
  FC,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import toast from 'react-hot-toast';
import { getImages } from 'api/image';
import { getArtists } from 'api/artist';
import { Artist } from 'types/artists';
import makeSdk from 'seabug-sdk/src';
import { InformationNft, Maybe, NftId } from 'seabug-sdk/src/common';
import { BuyParams } from 'seabug-sdk/src/buy';
import { SetPriceParams } from 'seabug-sdk/src/setPrice';
import { AuctionBidParams } from 'seabug-sdk/src/auction';
import { Image } from 'types/images';
import { Pagination } from 'types/shared';

type AppMessage = {
  type: 'Success' | 'Error' | 'Info';
  userMsg?: string;
  debugMsg?: any;
};

export type NftContextType = {
  artists: {
    list: Artist[];
    listRandomized: Artist[];
    getByPubKeyHash: (pkh: string) => Maybe<Artist>;
    fetch: () => Promise<void>;
    artistPagination: Pagination;
  };
  images: {
    list: Image[];
    getByNftId: (nftId: NftId) => Maybe<Image>;
    fetch: () => void;
    imagePagination: Pagination;
  };
  nfts: {
    list: InformationNft[];
    getById: (nftId: NftId) => Maybe<InformationNft>;
    getLiveAuctionList: () => InformationNft[];
    fetch: () => void;
    buy: (buyParams: BuyParams) => void;
    bid: (bidParams: AuctionBidParams) => void;
    setPrice: (setPriceParams: SetPriceParams) => void;
    getByPubKeyHash: (pkh: string) => Maybe<InformationNft[]>;
  };
  search: {
    text: string;
    setText: (searchText: string) => void;
    getMatchingArtists: () => Artist[];
  };
  common: {
    messages: AppMessage[];
    fetchAll: () => void;
  };
};

export const NftContext = createContext<NftContextType>({} as NftContextType);

export const NftContextProvider: FC = ({ children }) => {
  // Internal state
  const [artistsByPkh, setArtistsByPkh] = useState<Map<string, Artist>>(
    new Map()
  );
  const [imagesByNftId, setImagesByNftId] = useState<Map<string, Image>>(
    new Map()
  );
  const [nftsById, setNftsById] = useState<Map<string, InformationNft>>(
    new Map()
  );
  const [searchText, setSearchText] = useState('');
  const [messages, setMessages] = useState<AppMessage[]>([]);
  const [artistPagination, setArtistPagination] = useState<Pagination>(
    {} as Pagination
  );
  const [imagePagination, setImagePagination] = useState<Pagination>(
    {} as Pagination
  );

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
    if (msg.userMsg) {
      if (msg.type === 'Error') {
        toast.error(msg.userMsg);
      } else if (msg.type === 'Success') {
        toast.success(msg.userMsg);
      } else {
        toast(msg.userMsg);
      }
    }
  };

  // Artists

  const artistsList = useMemo(() => [...artistsByPkh.values()], [artistsByPkh]);
  const artistsListRandomized = artistsList.sort(() => 0.5 - Math.random());

  const getArtistByPubKeyHash = (pkh: string) => artistsByPkh.get(pkh);

  const fetchArtists = async () => {
    try {
      const { data, headers } = await getArtists();
      const newArtistsByPkh = new Map(
        data?.map((artist) => [artist.pubKeyHash, artist])
      );
      setArtistsByPkh(newArtistsByPkh);
      setArtistPagination(headers);
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
      const { data, headers } = await getImages();
      const newImagesByNftId = new Map(
        data?.map((image) => [image.sha256hash, image])
      );
      setImagesByNftId(newImagesByNftId);
      setImagePagination(headers);
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
  async function bidNft(bidParams: AuctionBidParams) {
    try {
      const url = '';
      const walletId = '';

      const sdk = await makeSdk(url, walletId);
      const response = await sdk.makeTransaction.auction.bid(bidParams);

      // TODO: Get transaction from response, sign and submit it
      // (once wallet integration is ready)
    } catch (err) {
      addMessage({
        type: 'Error',
        userMsg: 'Unable to bid on NFT',
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

  const nftsByArtistPkh = useMemo(() => {
    const nftsMap = new Map<string, InformationNft[]>();

    nftsById.forEach((nft) => {
      nftsMap.set(nft.author.pubKeyHash, [
        ...(nftsMap.get(nft.author.pubKeyHash) ?? []),
        nft,
      ]);
    });

    return nftsMap;
  }, [nftsById, artistsByPkh]);

  const getNftsByPubKeyHash = (pkh: string) => nftsByArtistPkh.get(pkh);

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
          listRandomized: artistsListRandomized,
          getByPubKeyHash: getArtistByPubKeyHash,
          fetch: fetchArtists,
          artistPagination,
        },
        images: {
          list: imagesList,
          getByNftId: getImageByNftId,
          fetch: fetchImages,
          imagePagination,
        },
        nfts: {
          list: nftsList,
          getById: getNftById,
          getLiveAuctionList: getLiveAuctionNftsList,
          fetch: fetchNfts,
          buy: buyNft,
          bid: bidNft,
          setPrice: ChangePrice,
          getByPubKeyHash: getNftsByPubKeyHash,
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
