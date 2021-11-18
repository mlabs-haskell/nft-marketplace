import React from 'react';
import styles from './index.module.scss';
import Button from '../../../atoms/Button';
import AuctionCard from '../../../molecules/AuctionCard';
import image1 from '../../../../../assets/svg/image1.svg';
import image2 from '../../../../../assets/images/Jokong.png';

const Explore = () => {
  return (
    <div className={styles.contatiner}>
      <div className={styles.header}>
        <h2>Explore</h2>
        <Button label="My Collection" color="primary" />
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
