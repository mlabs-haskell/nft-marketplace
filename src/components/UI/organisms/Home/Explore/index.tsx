import { getImage } from 'api/image';
import { useEffect, useRef, useState } from 'react';
import { NftContextType } from '../../../../../context/NftContext';
import Button from '../../../atoms/Button';
import AuctionCard from '../../../molecules/AuctionCard';
import styles from './index.module.scss';

interface Props {
  NFTs: NftContextType['validImages'];
  fetchImages: NftContextType['fetchImages'];
}

const Explore = ({ NFTs, fetchImages }: Props) => {
  const [images, setImages] = useState(NFTs);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleRequest = async () => {
      await fetchImages(17 * currentPage, 17);
    };

    handleRequest();
  }, [currentPage]);

  useEffect(() => {
    setImages(new Map(NFTs));
  }, [NFTs]);

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
        {Array.from(images.values()).map((item) => (
          <AuctionCard
            key={item.image.sha256hash}
            amount="0.005 ETH "
            title={item.image.title}
            image={item.image.path}
            isExplore
          />
        ))}
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
