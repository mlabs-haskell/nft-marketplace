import { useEffect, useState } from 'react';
import { InformationNft } from 'seabug-sdk/src/common';
import { NftContextType } from '../../../../../context/NftContext';
import Button from '../../../atoms/Button';
import AuctionCard from '../../../molecules/AuctionCard';
import styles from './index.module.scss';
import { priceToADA } from '../../../../../utils/priceToADA';

interface Props {
  images: NftContextType['images'];
  NFTs: NftContextType['nfts'];
}

const Explore = ({ images, NFTs }: Props) => {
  function limitNfts(limit: number) {
    const listNfts: InformationNft[] = [];
    NFTs.forEach((nft: InformationNft, i: number) => {
      if (i < limit) {
        listNfts.push(nft);
      }
    });
    return listNfts;
  }

  const [limitedNfts, setLimitedNfts] = useState(limitNfts(15));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLimitedNfts(limitNfts(16));
  }, [NFTs]);

  useEffect(() => {
    setLimitedNfts(limitNfts(16 * currentPage));
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
        {limitedNfts.map(
          (nft) =>
            images.get(nft.id.contentHash) && (
              <AuctionCard
                key={images.get(nft.id.contentHash)?.sha256hash}
                amount={priceToADA(nft.price as any)}
                title={images.get(nft.id.contentHash)?.title}
                image={images.get(nft.id.contentHash)?.path}
                isExplore
              />
            )
        )}
      </div>
      <div className={styles.btn}>
        <Button
          label="Load More"
          color="primary"
          size="large"
          onClick={() => setCurrentPage(currentPage + 1)}
        />
      </div>
    </div>
  );
};

export default Explore;
