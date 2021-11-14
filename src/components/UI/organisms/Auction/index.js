import React from 'react';
import AuctionCard from '../../molecules/AuctionCard';
import styles from './index.module.scss';

function Auction() {
  return (
    <div>
      <h2>Live auctions</h2>
      <div className={styles["auction-container"]}>
        <AuctionCard
          bid="Bid 5,000 DAI"
          likes="167"
          amount="18 ETH"
          title="Defacer#od"
          quantity="1/1"
          time="22:14"
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          likes="167"
          amount="18 ETH"
          title="Defacer#od"
          quantity="1/1"
          time="22:14"
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          likes="167"
          amount="18 ETH"
          title="Defacer#od"
          quantity="1/1"
          time="22:14"
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          likes="167"
          amount="18 ETH"
          title="Defacer#od"
          quantity="1/1"
          time="22:14"
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          likes="167"
          amount="18 ETH"
          title="Defacer#od"
          quantity="1/1"
          time="22:14"
        />
        <AuctionCard
          bid="Bid 5,000 DAI"
          likes="167"
          amount="18 ETH"
          title="Defacer#od"
          quantity="1/1"
          time="22:14"
        />
      </div>
    </div>
  );
}

export default Auction;
