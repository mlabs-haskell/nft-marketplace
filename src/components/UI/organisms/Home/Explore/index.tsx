import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useUIContext } from 'context/UIContext';
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

const Explore = ({ images, getImageByNftId, nfts }: Props) => {
  const { handelPageChange, currentPage } = useUIContext();
  const cardsPerPage = 25;
  let limitedNfts = nfts.slice(0, currentPage * cardsPerPage);
  const setLimitedNfts = () => {
    limitedNfts = nfts.slice(0, currentPage * cardsPerPage);
  };

  return (
    <div className={styles.contatiner}>
      <InfiniteScroll
        dataLength={nfts.length}
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
  );
};

export default Explore;
