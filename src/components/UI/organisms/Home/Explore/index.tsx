import { getImage } from 'api/image';
import { useEffect, useRef, useState } from 'react';
import { GlobalContent } from '../../../../../context/auth';
import Button from '../../../atoms/Button';
import AuctionCard from '../../../molecules/AuctionCard';
import styles from './index.module.scss';

interface Props {
  NFTs: GlobalContent['exploreImages'];
}

const Explore = ({ NFTs }: Props) => {
  const [images, setImages] = useState(NFTs);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasEndingPosts, setHasEndingPosts] = useState(false);

  useEffect(() => {
    const handleRequest = async () => {
      const data = await getImage(17, 17);

      if (!data.length) {
        setHasEndingPosts(true);
        return;
      }

      setImages([...images, ...data]);
    };

    handleRequest();
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
        {images.map((item, index) => (
          <AuctionCard
            key={item.sha256hash}
            amount="0.005 ETH "
            title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
            image={item.path}
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
