import { useEffect, useState, useMemo } from 'react';
import ExploreHeader from 'components/UI/molecules/ExploreHeader';
import { useWalletContext } from 'context/WalletContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InformationNft } from 'seabug-sdk/src/common';
import { NftContextType } from '../../../../../context/NftContext';
import Button from '../../../atoms/Button';
import AuctionCard from '../../../molecules/AuctionCard';
import styles from './index.module.scss';
import { priceToADA } from '../../../../../utils/priceToADA';

interface Props {
  images: NftContextType['images']['list'];
  getImageByNftId: NftContextType['images']['getByNftId'];
  nfts: NftContextType['nfts']['list'];
}

type FilterState = 'ALL' | 'SALES' | 'COLLECTION';

const Explore = ({ images, getImageByNftId, nfts }: Props) => {
  const watchTicker = () => {
    const ticker = localStorage.getItem('ticker');
    return ticker?.includes('LOAD')
      ? parseInt(ticker?.replace('LOAD', ''), 10)
      : 1;
  };
  const cardsPerPage = 25;
  const [currentPage, setCurrentPage] = useState(watchTicker());
  // const [limitedNfts, setLimitedNfts] = useState<InformationNft[]>([]);
  // const limitedNfts = nfts.slice(0, currentPage * cardsPerPage);
  const [filterState, setFilterState] = useState<FilterState>('ALL');

  const handleMySalesClick = () => setFilterState('SALES');
  const handleMyCollectionClick = () => setFilterState('COLLECTION');

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  const [walletsPubKeyHashes, setWalletsPubKeyHashes] = useState<string[]>([]);
  const { getPubKeyHashes, connected } = useWalletContext();

  const filterByOwner = (ownerNfts: InformationNft[]) =>
    ownerNfts.filter((nft) =>
      walletsPubKeyHashes.includes(nft.owner.pubKeyHash)
    );

  const filterByOnSale = (ownerNfts: InformationNft[]) =>
    ownerNfts.filter(
      (nft) =>
        nft.price ||
        (nft?.auctionState?.deadline && nft.auctionState.deadline < new Date())
    );

  const nftsAfterOwnerFilter =
    filterState === 'COLLECTION' || filterState === 'SALES'
      ? filterByOwner(nfts)
      : nfts;

  const nftsAfterSaleFilter =
    filterState === 'SALES' ? filterByOnSale(nftsAfterOwnerFilter) : nfts;

  const limitedNfts = nftsAfterSaleFilter.slice(0, currentPage * cardsPerPage);

  useEffect(() => {
    const homeScrollPosition = parseInt(
      localStorage.getItem('homeScrollPosition') || '1',
      10
    );
    window.scrollTo(0, homeScrollPosition);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('homeScrollPosition', JSON.stringify(scrollPosition));
  }, [scrollPosition]);

  useEffect(() => {
    localStorage.setItem('ticker', JSON.stringify(currentPage));
  }, [currentPage]);
  useEffect(() => {
    // TODO
    const refreshPubKey = async () => {
      const pubKeyHashes = await getPubKeyHashes();
      setWalletsPubKeyHashes(pubKeyHashes);
    };
    refreshPubKey();
  }, [connected]);
  return (
    <>
      <ExploreHeader
        collections={handleMyCollectionClick}
        sales={handleMySalesClick}
      />
      <div className={styles.contatiner}>
        <InfiniteScroll
          dataLength={limitedNfts.length} // This is important field to render the next data
          next={() => {
            if (currentPage !== 1) setCurrentPage(currentPage + 1);
          }}
          hasMore
          loader={Array(25).map((value, i) => (
            <AuctionCard key={i.toString()} />
          ))}
          scrollableTarget={styles['card-container']}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollThreshold="80%"
          // below props only if you need pull down functionality
        >
          <div className={styles['card-container']}>
            {limitedNfts.map((nft) => {
              const image = getImageByNftId(nft.id);
              return (
                <AuctionCard key={nft.id.contentHash} nft={nft} image={image} />
              );
            })}
          </div>
        </InfiniteScroll>
        <div className={styles.btn}>
          {currentPage === 1 ? (
            <Button
              label="Load More"
              color="primary"
              size="large"
              onClick={() => setCurrentPage(currentPage + 1)}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Explore;
