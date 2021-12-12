import { useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NftContextType } from '../../../../../context/NftContext';
import Button from '../../../atoms/Button';
import AuctionCard from '../../../molecules/AuctionCard';
import styles from './index.module.scss';

interface Props {
  images: NftContextType['images'];
  NFTs: NftContextType['nfts'];
}

const Explore = ({ images, NFTs }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const cardsPerPage = 25;

  const limitedNfts = useMemo(
    () => Array.from(NFTs).slice(0, currentPage * cardsPerPage),
    [Array.from(NFTs), currentPage]
  );

  return (
    <div className={styles.contatiner}>
      <div className={styles.header}>
        <h2>Explore</h2>
        <div className={styles.button}>
          <Button label="My Sales" color="secondary" />
          <Button label="My Collection" color="primary" />
        </div>
      </div>
      <InfiniteScroll
        dataLength={limitedNfts.length} // This is important field to render the next data
        next={() => {
          if (currentPage !== 1) setCurrentPage(currentPage + 1);
        }}
        hasMore
        loader={Array(25).map((value, i) => (
          <AuctionCard key={i.toString()} amount="" isExplore />
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
          {limitedNfts.map((nft) => (
            <AuctionCard
              key={nft[0]}
              amount="0.005 ETH "
              title={images.get(nft[1].id.contentHash)?.title}
              image={images.get(nft[1].id.contentHash)?.path}
              nftId={nft[0]}
              isExplore
            />
          ))}
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
  );
};

export default Explore;
