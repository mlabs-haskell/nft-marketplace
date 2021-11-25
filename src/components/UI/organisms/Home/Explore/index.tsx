/* eslint-disable */
import styles from './index.module.scss';
import Button from '../../../atoms/Button';
import AuctionCard from '../../../molecules/AuctionCard';
import { useCallback, useEffect } from 'react';
import { addImage, getImage } from '../../../../../api/image';

const Explore = () => {
  const fetchImages = useCallback(async () => {
    try {
      const response = await getImage();
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }, []);
  const fetchImagesId = useCallback(async () => {
    try {
      const response = await addImage({image: "@Downloads/1.png", title: "first"});
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }, []);

  useEffect(()=>{
    fetchImages();
    fetchImagesId();
  })
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
        <AuctionCard
          likes="167"
          amount="0.005 ETH "
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          image={'https://picsum.photos/200/200'}
          isExplore={true}
          quantity="1/1"
        />
        <AuctionCard
          likes="167"
          amount="0.005 ETH "
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          image={'https://picsum.photos/200/300'}
          isExplore={true}
          quantity="1/1"
        />
        <AuctionCard
          likes="167"
          amount="0.005 ETH "
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          image={'https://picsum.photos/200/250'}
          isExplore={true}
          quantity="1/1"
        />
        <AuctionCard
          likes="167"
          amount="0.005 ETH "
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          image={'https://picsum.photos/200/200'}
          isExplore={true}
        />
        <AuctionCard
          likes="167"
          amount="0.005 ETH "
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          image={'https://picsum.photos/200/200'}
          isExplore={true}
        />
        <AuctionCard
          likes="167"
          amount="0.005 ETH "
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          image={'https://picsum.photos/200/300'}
          isExplore={true}
        />
        <AuctionCard
          likes="167"
          amount="0.005 ETH "
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          image={'https://picsum.photos/200/250'}
          isExplore={true}
        />
        <AuctionCard
          likes="167"
          amount="0.005 ETH "
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          image={'https://picsum.photos/200/200'}
          isExplore={true}
        />
        <AuctionCard
          likes="167"
          amount="0.005 ETH "
          title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
          image={'https://picsum.photos/200/300'}
          isExplore={true}
        />
      </div>
      <div className={styles.btn}>
        <Button label="Load More" color="primary" size="large" />
      </div>
    </div>
  );
};

export default Explore;
