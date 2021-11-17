import React from 'react';
import AuctionCard from '../../../molecules/AuctionCard';
import Slider from '../../../molecules/Slider';
import image1 from '../../../../../assets/svg/image1.svg';
import image2 from '../../../../../assets/svg/image2.svg';
import styles from './index.module.scss';

function Auction() {
  return (
    <div>
      <h2 className={styles.header}>Live auctions</h2>
      <Slider>
        <AuctionCard
          bid="Bid 5,000 DAI"
          likes="167"
          amount="18 ETH"
          title="Ape  Pixel "
          quantity="1/1"
          time="22:14"
          image={image1}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          likes="167"
          amount="18 ETH"
          title="Ape  Pixel "
          quantity="1/1"
          time="22:14"
          image={image2}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          likes="167"
          amount="18 ETH"
          title="Ape  Pixel "
          quantity="1/1"
          time="22:14"
          image={image2}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          likes="167"
          amount="18 ETH"
          title="Ape  Pixel "
          quantity="1/1"
          time="22:14"
          image={image1}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          likes="167"
          amount="18 ETH"
          title="Ape  Pixel "
          quantity="1/1"
          time="22:14"
          image={image2}
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          likes="167"
          amount="18 ETH"
          title="Ape  Pixel "
          quantity="1/1"
          time="22:14"
          image={image1}
        />
      </Slider>
    </div>
  );
}

export default Auction;