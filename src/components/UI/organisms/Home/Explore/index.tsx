import { useEffect, useState } from 'react';
import ExploreHeader from 'components/UI/molecules/ExploreHeader';
import { useWalletContext } from 'context/WalletContext';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useUIContext } from 'context/UIContext';
import { NftContextType } from 'context/NftContext';
import Button from '../../../atoms/Button';
import AuctionCard from '../../../molecules/AuctionCard';
import styles from './index.module.scss';

interface Props {
  getImageByNftId: NftContextType['images']['getByNftId'];
  nfts: NftContextType['nfts']['list'];
  showFilterButtons: boolean;
}

const Explore = ({ getImageByNftId, nfts, showFilterButtons }: Props) => {
  const { home } = useUIContext();
  const cardsPerPage = 25;
  const [walletsPubKeyHashes, setWalletsPubKeyHashes] = useState<string[]>([]);
  const { getPubKeyHashes, connected } = useWalletContext();

  const handleMySalesClick = () => home.setFilterState('SALES');
  const handleMyCollectionClick = () => home.setFilterState('COLLECTION');
  const handleAllClick = () => home.setFilterState('ALL');
  const nftsAfterOwnerFilter =
    home.filterState === 'COLLECTION' || home.filterState === 'SALES'
      ? home.filterByOwner(nfts, walletsPubKeyHashes)
      : nfts;

  const nftsAfterSaleFilter =
    home.filterState === 'SALES'
      ? home.filterByOnSale(nftsAfterOwnerFilter)
      : nftsAfterOwnerFilter;

  const limitedNfts = nftsAfterSaleFilter.slice(
    0,
    home.currentPage * cardsPerPage
  );

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
        all={handleAllClick}
        filterState={home.filterState}
        showFilterButtons={showFilterButtons}
      />
      <div className={styles.contatiner}>
        <InfiniteScroll
          dataLength={limitedNfts.length}
          next={() => {
            if (home.currentPage !== 1)
              home.setCurrentPage(home.currentPage + 1);
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
            {limitedNfts.length === 0 ? (
              <div className="d-flex justify-content-center mt-4 mb-4">
                <h2>No NFTs found</h2>
              </div>
            ) : (
              limitedNfts.map((nft) => {
                const image = getImageByNftId(nft.id);
                return (
                  <AuctionCard
                    key={nft.id.contentHash}
                    nft={nft}
                    image={image}
                  />
                );
              })
            )}
          </div>
          {home.currentPage === 1 && nftsAfterSaleFilter.length > cardsPerPage && (
            <div className={styles.btn}>
              <Button
                label="Load More"
                color="primary"
                size="large"
                onClick={() => home.incrementCurrentPage()}
              />
            </div>
          )}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Explore;
