import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { InformationNft } from 'seabug-sdk/src/common';
import { NftContextType } from '../../../../../context/NftContext';
import Button from '../../../atoms/Button';
import AuctionCard from '../../../molecules/AuctionCard';
import styles from './index.module.scss';

interface Props {
  images: NftContextType['images'];
  NFTs: NftContextType['nfts'];
  fetchNft: NftContextType['fetchNft'];
}

const Explore = ({ images, NFTs, fetchNft }: Props) => {
  function limitNfts(limit: number) {
    const listNfts: InformationNft[] = [];
    NFTs.forEach((nft: InformationNft, i: number) => {
      if (i < limit) {
        listNfts.push(nft);
      }
    });
    return listNfts;
  }

  const [limitedNfts, setLimitedNfts] = useState(limitNfts(25));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLimitedNfts(limitNfts(25));
  }, [NFTs]);

  useEffect(() => {
    setLimitedNfts(limitNfts(25 * currentPage));
  }, [currentPage]);

  return (
    <div className={styles.contatiner}>
      <div className={styles.header}>
        <h2>Explore</h2>
        <div className={styles.button}>
          <Button label="My Sales" color="secondary" />
          <Button label="My Collection" color="primary" />
        </div>
      </div>
      <div className={styles['card-container']}>
        <InfiniteScroll
          dataLength={limitedNfts.length} // This is important field to render the next data
          next={() => {
            if (currentPage !== 1) setCurrentPage(currentPage + 1);
          }}
          hasMore
          loader={Array(25).map((value, i) => (
            <AuctionCard key={i.toString()} amount="0.005 ETH " isExplore />
          ))}
          className={styles['infinite-scroll-component']}
          scrollableTarget={styles['card-container']}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollThreshold="80%"
          // below props only if you need pull down functionality
        >
          {limitedNfts.map(
            (nft) =>
              images.get(nft.id.contentHash) && (
                <AuctionCard
                  key={images.get(nft.id.contentHash)?.sha256hash}
                  amount="0.005 ETH "
                  title={images.get(nft.id.contentHash)?.title}
                  image={images.get(nft.id.contentHash)?.path}
                  isExplore
                />
              )
          )}
        </InfiniteScroll>
      </div>
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
