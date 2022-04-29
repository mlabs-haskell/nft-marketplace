import { useEffect, useState } from 'react';
import Slider from '../../../molecules/Slider';
import styles from './index.module.scss';

function Auction() {
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
    if (windowDimensions.width > 2500) {
      setCarrocelNum(8);
    } else if (windowDimensions.width > 1024) {
      setCarrocelNum(5);
    } else if (windowDimensions.width > 767 && windowDimensions.width <= 1024) {
      setCarrocelNum(3);
    } else if (windowDimensions.width <= 767) {
      setCarrocelNum(1);
    }
  }, [windowDimensions]);

  const renderAuctionCards = () => {
    // TODO: Implement or remove auction logic
    return [];
  };

  return (
    <div>
      <h2 className={styles.header}>Live auctions</h2>
      <Slider show={carrocelNum}>{renderAuctionCards()}</Slider>
    </div>
  );
}

export default Auction;
