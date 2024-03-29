import {
  createContext,
  useState,
  FC,
  useMemo,
  useContext,
  useEffect,
} from 'react';
import { getImages } from 'api/image';
import { getArtists } from 'api/artist';
import { Artist } from 'types/artists';
import { Nft, nftFromNftListing } from 'types/nfts';
import { AuctionBidParams, SetPriceParams } from 'types/legacy';
import { Image } from 'types/images';
import { Maybe, NftImage } from 'types/common';
import { getCtl } from 'ctl';
import { MsgContext } from './MsgContext';

export type FetchStatus = 'stopped' | 'fetching';

type FetchState = {
  status: FetchStatus;
  nextRange?: string;
};

export type NftContextType = {
  artists: {
    list: Artist[];
    listRandomized: Artist[];
    getById: (id: number) => Maybe<Artist>;
    getByPubKeyHash: (pkh: string) => Maybe<Artist>;
    fetch: () => void;
  };
  images: {
    list: Image[];
    getByIpfsHash: (ipfsHash: string) => Maybe<Image>;
    fetch: () => void;
  };
  nfts: {
    list: Nft[];
    getByIpfsHash: (nftId: string) => Maybe<Nft>;
    getLiveAuctionList: () => Nft[];
    fetch: () => void;
    fetchStatus: FetchStatus;
    buy: (nft: Nft) => Promise<void>;
    bid: (bidParams: AuctionBidParams) => void;
    setPrice: (setPriceParams: SetPriceParams) => void;
  };
  nftImages: {
    list: NftImage[];
    getByArtist: (pkh: string) => NftImage[];
    getByOwner: (pkh: string) => NftImage[];
  };
  search: {
    text: string;
    setText: (searchText: string) => void;
    getMatchingArtists: () => Artist[];
  };
  common: {
    fetchAll: () => void;
  };
};

export const NftContext = createContext<NftContextType>({} as NftContextType);

export const NftContextProvider: FC = ({ children }) => {
  const { messages, addMessage } = useContext(MsgContext);
  // Internal state
  const [artistsById, setArtistsById] = useState<Map<number, Artist>>(
    new Map()
  );
  const [artistsByPkh, setArtistsByPkh] = useState<Map<string, Artist>>(
    new Map()
  );
  const [imagesByIpfsHash, setImagesByIpfsHash] = useState<Map<string, Image>>(
    new Map()
  );
  const [nftsByIpfsHash, setNftsByIpfsHash] = useState<Map<string, Nft>>(
    new Map()
  );
  const [searchText, setSearchText] = useState('');
  const [artistFetchState, setArtistFetchState] = useState<FetchState>({
    status: 'stopped',
  });
  const [imageFetchState, setImageFetchState] = useState<FetchState>({
    status: 'stopped',
  });
  const [nftFetchState, setNftFetchState] = useState<FetchState>({
    status: 'stopped',
  });

  // Artists

  const artistsList = useMemo(() => [...artistsByPkh.values()], [artistsByPkh]);

  const artistsListRandomized = useMemo(
    () => artistsList.sort(() => 0.5 - Math.random()),
    [artistsByPkh]
  );

  const getArtistById = (id: number) => artistsById.get(id);
  const getArtistByPubKeyHash = (pkh: string) => artistsByPkh.get(pkh);

  // TODO: Improve pagination logic (fetch pages as user scrolls)
  const fetchArtistPage = async () => {
    try {
      const { artists, nextRange } = await getArtists(
        artistFetchState?.nextRange
      );
      const newArtistsById = new Map(
        artists?.map((artist) => [artist.id, artist])
      );
      const newArtistsByPkh = new Map(
        artists?.map((artist) => [artist.pubKeyHash, artist])
      );
      const hasMorePages = nextRange && artists && artists.length > 0;

      setArtistsById(new Map([...artistsById, ...newArtistsById]));
      setArtistsByPkh(new Map([...artistsByPkh, ...newArtistsByPkh]));
      setArtistFetchState({
        status: hasMorePages ? 'fetching' : 'stopped',
        nextRange: hasMorePages ? nextRange : undefined,
      });
    } catch (err) {
      addMessage({
        type: 'Error',
        userMsg: 'Unable to fetch artists. Please try again.',
        debugMsg: err,
      });
    }
  };

  const fetchArtists = () => {
    setArtistFetchState({
      status: 'fetching',
    });
  };

  useEffect(() => {
    if (artistFetchState.status === 'fetching') fetchArtistPage();
  }, [artistFetchState]);

  // Images

  const imagesList = useMemo(
    () => [...imagesByIpfsHash.values()],
    [imagesByIpfsHash]
  );

  const getImageByIpfsHash = (ipfsHash: string) =>
    imagesByIpfsHash.get(ipfsHash);

  // TODO: Improve pagination logic (fetch pages as user scrolls)
  const fetchImagePage = async () => {
    try {
      const { images, nextRange } = await getImages(imageFetchState?.nextRange);
      const newImagesByIpfsHash = new Map(
        images?.map((image) => [image.ipfsHash, image])
      );

      setImagesByIpfsHash(
        new Map([...imagesByIpfsHash, ...newImagesByIpfsHash])
      );
      setImageFetchState(
        nextRange && images && images.length > 0
          ? {
              status: 'fetching',
              nextRange,
            }
          : { status: 'stopped' }
      );
    } catch (err) {
      addMessage({
        type: 'Error',
        userMsg: 'Unable to fetch images. Please try again.',
        debugMsg: err,
      });
    }
  };

  const fetchImages = () => {
    setImageFetchState({
      status: 'fetching',
    });
  };

  useEffect(() => {
    if (imageFetchState.status === 'fetching') fetchImagePage();
  }, [imageFetchState]);

  // NFTs

  const nftsList = useMemo(
    () => [...nftsByIpfsHash.values()],
    [nftsByIpfsHash]
  );

  const getNftByIpfsHash = (nftId: string) => nftsByIpfsHash.get(nftId);

  // TODO: Implement or remove auction logic
  const getLiveAuctionNftsList = () => [];

  const fetchNftList = async () => {
    try {
      const ctl = await getCtl();

      console.log('calling listNfts()');

      const newNfts = await ctl.listNfts();

      console.log('listNfts() finished successfully');

      const newNftsByIpfsHash = new Map(
        newNfts.map((nftListing) => {
          const nft = nftFromNftListing(nftListing);
          return [nft.ipfsHash, nft];
        })
      );

      setNftsByIpfsHash(newNftsByIpfsHash);
    } catch (err: any) {
      const isNamiMissing = (err.message as string)?.includes(
        `Cannot read properties of undefined (reading 'enable')`
      );

      setNftFetchState({ status: 'stopped' });
      addMessage({
        type: 'Error',
        userMsg: isNamiMissing
          ? 'Nami wallet not found.'
          : 'Unable to fetch NFTs. Please try again.',
        debugMsg: err,
      });
    }
  };

  const fetchNfts = () => {
    setNftFetchState({
      status: 'fetching',
    });
  };

  useEffect(() => {
    if (nftFetchState.status === 'fetching') fetchNftList();
  }, [nftFetchState]);

  async function buyNft(nft: Nft) {
    try {
      const ctl = await getCtl();

      await ctl.buyNft({
        nftCollectionArgs: {
          collectionNftCs: nft.metadata.collectionNftCS,
          lockLockup: 5n,
          lockLockupEnd: 5n,
          lockingScript: nft.metadata.lockingScript,
          author: nft.metadata.authorPkh,
          daoScript: nft.metadata.marketplaceScript,
          authorShare: nft.metadata.authorShare,
          daoShare: nft.metadata.marketplaceShare,
        },
        nftIdArgs: {
          collectionNftTn: nft.metadata.collectionNftTN,
          price: nft.metadata.ownerPrice,
          owner: nft.metadata.ownerPkh,
        },
      });
    } catch (err) {
      addMessage({
        type: 'Error',
        userMsg:
          "Unable to buy NFT, please ensure Nami is installed and try again. Note: Buying is not currently supported if you have any UTxOs with CIP-32 inline datums at your wallet's address",
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

  // Nfts combined with image data (excluding nfts without corresponding image records)

  const nftImages = useMemo(() => {
    const nftImagesList: NftImage[] = [];
    const byArtist = new Map<string, NftImage[]>();
    const byOwner = new Map<string, NftImage[]>();

    nftsByIpfsHash.forEach((nft) => {
      const image = getImageByIpfsHash(nft.ipfsHash);
      if (!image) return;

      const nftImage = { nft, image };

      nftImagesList.push(nftImage);

      byArtist.set(nft.metadata.authorPkh, [
        ...(byArtist.get(nft.metadata.authorPkh) ?? []),
        nftImage,
      ]);

      byOwner.set(nft.metadata.ownerPkh, [
        ...(byOwner.get(nft.metadata.ownerPkh) ?? []),
        nftImage,
      ]);
    });

    return {
      list: nftImagesList,
      byArtist,
      byOwner,
    };
  }, [nftsByIpfsHash, imagesByIpfsHash]);

  const getNftImagesByArtist = (pkh: string) =>
    nftImages.byArtist.get(pkh) ?? [];

  const getNftImagesByOwner = (pkh: string) => nftImages.byOwner.get(pkh) ?? [];

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
          getById: getArtistById,
          getByPubKeyHash: getArtistByPubKeyHash,
          fetch: fetchArtists,
        },
        images: {
          list: imagesList,
          getByIpfsHash: getImageByIpfsHash,
          fetch: fetchImages,
        },
        nfts: {
          list: nftsList,
          getByIpfsHash: getNftByIpfsHash,
          getLiveAuctionList: getLiveAuctionNftsList,
          fetch: fetchNfts,
          fetchStatus: nftFetchState.status,
          buy: buyNft,
          bid: bidNft,
          setPrice: ChangePrice,
        },
        nftImages: {
          list: nftImages.list,
          getByArtist: getNftImagesByArtist,
          getByOwner: getNftImagesByOwner,
        },
        search: {
          text: searchText,
          setText: setSearchText,
          getMatchingArtists,
        },
        common: {
          fetchAll,
        },
      }}
    >
      {children}
    </NftContext.Provider>
  );
};

export const useNftContext = () => useContext<NftContextType>(NftContext);
