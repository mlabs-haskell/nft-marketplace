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
  images: NftContextType['images']['list'];
  getImageByNftId: NftContextType['images']['getByNftId'];
  nfts: NftContextType['nfts']['list'];
}

const Explore = ({ images, getImageByNftId, nfts }: Props) => {
  const {
    handelPageChange,
    currentPage,
    filterByOwner,
    filterByOnSale,
    filterState,
    handleAllClick,
    handleMyCollectionClick,
    handleMySalesClick,
  } = useUIContext();
  const cardsPerPage = 25;
  const [walletsPubKeyHashes, setWalletsPubKeyHashes] = useState<string[]>([]);
  const { getPubKeyHashes, connected } = useWalletContext();

  const nftsAfterOwnerFilter =
    filterState === 'COLLECTION' || filterState === 'SALES'
      ? filterByOwner(nfts, walletsPubKeyHashes)
      : nfts;

  const nftsAfterSaleFilter =
    filterState === 'SALES'
      ? filterByOnSale(nftsAfterOwnerFilter)
      : nftsAfterOwnerFilter;

  let limitedNfts = nftsAfterSaleFilter.slice(0, currentPage * cardsPerPage);
  const setLimitedNfts = () => {
    limitedNfts = nfts.slice(0, currentPage * cardsPerPage);
  };
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
      />
      <div className={styles.contatiner}>
        <InfiniteScroll
          dataLength={limitedNfts.length}
          next={setLimitedNfts}
          hasMore
          loader={
            <div className={styles.btn}>
              <Button
                label="Load More"
                color="primary"
                size="large"
                onClick={() => handelPageChange(currentPage)}
              />
            </div>
          }
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
      </div>
    </>
  );
};

export default Explore;
