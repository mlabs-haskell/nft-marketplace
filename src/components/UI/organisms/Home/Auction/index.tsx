import { useContext, useEffect, useState } from 'react';
import { NftContext } from 'context/NftContext';
import Slider from '../../../molecules/Slider';
import image1 from '../../../../../assets/svg/image1.svg';
import image2 from '../../../../../assets/svg/image2.svg';
import styles from './index.module.scss';
import AuctionCard from '../../../molecules/AuctionCard';

function Auction() {
  const { nfts, images } = useContext(NftContext);
  const [carrocelNum, setCarrocelNum] = useState(1);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowDimensions.width > 1024) {
      setCarrocelNum(5);
    }
    if (windowDimensions.width > 767 && windowDimensions.width <= 1024) {
      setCarrocelNum(3);
    }
    if (windowDimensions.width <= 767) {
      setCarrocelNum(1);
    }
  }, [windowDimensions]);

  // Date used just for testing!
  const end = new Date(
    new Date().getTime() + Math.floor(Math.random() * 6000000)
  ).toISOString();

  const renderAuctionCards = () =>
    nfts.list
      .filter((nft) => nft.auctionState?.highestBid)
      .map((nft) => (
        <div key={nft.id.contentHash} className={styles['card-wrapper']}>
          <AuctionCard image={images.getByNftId(nft.id)} nft={nft} />
        </div>
      ));

  return (
    <div>
      <h2 className={styles.header}>Live auctions</h2>
      <Slider show={carrocelNum}>{renderAuctionCards()}</Slider>
    </div>
  );
}

export default Auction;
