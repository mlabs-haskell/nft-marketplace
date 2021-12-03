import { useEffect, useState } from 'react';
import Slider from '../../../molecules/Slider';
import image1 from '../../../../../assets/svg/image1.svg';
import image2 from '../../../../../assets/svg/image2.svg';
import styles from './index.module.scss';
import AuctionCard from '../../../molecules/AuctionCard';

function Auction() {
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

  const [carrocelNum, setCarrocelNum] = useState(5);

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
  const end = '12/4/2021 10:11';
  return (
    <div>
      <h2 className={styles.header}>Live auctions</h2>
      <Slider show={carrocelNum}>
        <div className={styles['card-wrapper']}>
          <AuctionCard
            isAuction
            bid="Bid 5,000 DAI"
            amount="18 ETH"
            title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
            quantity="1/1"
            time={end}
            image={image1}
          />
        </div>
        <div className={styles['card-wrapper']}>
          <AuctionCard
            isAuction
            bid="Bid 5,000 DAI"
            amount="18 ETH"
            title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
            quantity="1/1"
            time={end}
            image={image2}
          />
        </div>
        <div className={styles['card-wrapper']}>
          <AuctionCard
            isAuction
            bid="Bid 5,000 DAI"
            amount="18 ETH"
            title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
            quantity="1/1"
            time={end}
            image={image1}
          />
        </div>
        <div className={styles['card-wrapper']}>
          <AuctionCard
            isAuction
            bid="Bid 5,000 DAI"
            amount="18 ETH"
            title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
            quantity="1/1"
            time={end}
            image={image2}
          />
        </div>
        <div className={styles['card-wrapper']}>
          <AuctionCard
            isAuction
            bid="Bid 5,000 DAI"
            amount="18 ETH"
            title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
            quantity="1/1"
            time={end}
            image={image1}
          />
        </div>
        <div className={styles['card-wrapper']}>
          <AuctionCard
            isAuction
            bid="Bid 5,000 DAI"
            amount="18 ETH"
            title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
            quantity="1/1"
            time={end}
            image={image2}
          />
        </div>

        <div className={styles['card-wrapper']}>
          <AuctionCard
            isAuction
            bid="Bid 5,000 DAI"
            amount="18 ETH"
            title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
            quantity="1/1"
            time={end}
            image={image1}
          />
        </div>
        <div className={styles['card-wrapper']}>
          <AuctionCard
            isAuction
            bid="Bid 5,000 DAI"
            amount="18 ETH"
            title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
            quantity="1/1"
            time={end}
            image={image2}
          />
        </div>
        <div className={styles['card-wrapper']}>
          <AuctionCard
            isAuction
            bid="Bid 5,000 DAI"
            amount="18 ETH"
            title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
            quantity="1/1"
            time={end}
            image={image1}
          />
        </div>
        <div className={styles['card-wrapper']}>
          <AuctionCard
            isAuction
            bid="Bid 5,000 DAI"
            amount="18 ETH"
            title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
            quantity="1/1"
            time={end}
            image={image2}
          />
        </div>
        <div className={styles['card-wrapper']}>
          <AuctionCard
            isAuction
            bid="Bid 5,000 DAI"
            amount="18 ETH"
            title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
            quantity="1/1"
            time={end}
            image={image1}
          />
        </div>
        <div className={styles['card-wrapper']}>
          <AuctionCard
            isAuction
            bid="Bid 5,000 DAI"
            amount="18 ETH"
            title="Lorem ipsum dolor sit, amet consectetur adipisicing elit. In, quos!"
            quantity="1/1"
            time={end}
            image={image2}
          />
        </div>
      </Slider>
    </div>
  );
}

export default Auction;
