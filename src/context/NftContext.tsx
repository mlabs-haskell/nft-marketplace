import { createContext, useState, FC, useMemo, useContext } from 'react';
import toast from 'react-hot-toast';
import { getImages } from 'api/image';
import { getArtists } from 'api/artist';
import { ArtistsType } from 'types/artists';
import { ImageType } from 'types/image';
import { Maybe, NftId } from 'seabug-sdk/src/common';
import { SetPriceParams } from 'seabug-sdk/src/setPrice';
import { AuctionBidParams } from 'seabug-sdk/src/auction';
import { Metadata, NftListing } from 'cardano-transaction-lib-seabug';
import { getCtl } from 'ctl';

type AppMessage = {
  type: 'Success' | 'Error' | 'Info';
  userMsg?: string;
  debugMsg?: any;
};

export type NftContextType = {
  artists: {
    list: ArtistsType.Artist[];
    listRandomized: ArtistsType.Artist[];
    getByPubKeyHash: (pkh: string) => Maybe<ArtistsType.Artist>;
    fetch: () => void;
  };
  images: {
    list: ImageType.NftImage[];
    getByNftId: (ipfsHash: string) => Maybe<ImageType.NftImage>;
    fetch: () => void;
  };
  nfts: {
    list: NftListing[];
    getById: (nftId: string) => Maybe<NftListing>;
    getLiveAuctionList: () => NftListing[];
    fetch: () => void;
    buy: (nftMetadata: Metadata) => void;
    bid: (bidParams: AuctionBidParams) => void;
    setPrice: (setPriceParams: SetPriceParams) => void;
    getByPubKeyHash: (pkh: string) => Maybe<NftListing[]>;
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
    listRandomized: [],
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
    bid: () => undefined,
    setPrice: () => {},
    getByPubKeyHash: () => [],
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
  const [nftsById, setNftsById] = useState<Map<string, NftListing>>(new Map());
  const [searchText, setSearchText] = useState('');
  const [messages, setMessages] = useState<AppMessage[]>([]);

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

  const getImageByNftId = (ipfsHash: string) => imagesByNftId.get(ipfsHash);

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

  const getNftById = (nftId: string) => nftsById.get(nftId);

  // TODO: Implement or remove auction logic
  const getLiveAuctionNftsList = () => [];

  async function fetchNfts() {
    try {
      const ctl = await getCtl();
      const newNfts = await ctl.listNfts();

      console.log({ newNfts });

      const newNftsById = new Map(
        newNfts.map((nft) => [nft.metadata.ipfsHash, nft])
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

  async function buyNft(nftMetadata: Metadata) {
    try {
      const ctl = await getCtl();

      await ctl.buyNft({
        nftCollectionArgs: {
          collectionNftCs: nftMetadata.seabugMetadata.collectionNftCS,
          lockLockup: 0n,
          lockLockupEnd: 0n,
          lockingScript: nftMetadata.seabugMetadata.lockingScript,
          author: nftMetadata.seabugMetadata.authorPkh,
          daoScript: nftMetadata.seabugMetadata.marketplaceScript,
          authorShare: nftMetadata.seabugMetadata.authorShare,
          daoShare: nftMetadata.seabugMetadata.marketplaceShare,
        },
        nftIdArgs: {
          collectionNftTn: nftMetadata.seabugMetadata.collectionNftTN,
          price: nftMetadata.seabugMetadata.ownerPrice,
          owner: nftMetadata.seabugMetadata.ownerPkh,
        },
      });
    } catch (err) {
      addMessage({
        type: 'Error',
        userMsg: 'Unable to buy NFT',
        debugMsg: err,
      });
    }
  }
  async function bidNft(bidParams: AuctionBidParams) {
    // TODO: Add bid logic
  }

  async function ChangePrice(setPriceParams: SetPriceParams) {
    // TODO: Add price change logic
  }

  const nftsByArtistPkh = useMemo(() => {
    const nftsMap = new Map<string, NftListing[]>();

    nftsById.forEach((nft) => {
      nftsMap.set(nft.metadata.seabugMetadata.authorPkh, [
        ...(nftsMap.get(nft.metadata.seabugMetadata.authorPkh) ?? []),
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
