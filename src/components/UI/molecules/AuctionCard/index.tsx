import { Link } from 'react-router-dom';
import { ImageType } from 'types/image';
import { priceToADA } from 'utils/priceToADA';
import dots from 'assets/svg/dots.svg';
import { useEffect, useState } from 'react';
import { InformationNft } from 'seabug-sdk/src/common';
import Box from '../../atoms/Box';
import styles from './index.module.scss';

interface Props {
  nft?: InformationNft;
  image?: ImageType.NftImage;
}

const formatTimeSegment = (time: number) =>
  String(Math.floor(time)).padStart(2, '0');

const formatTime = (ms: number) => {
  const seconds = ms / 1000;

  if (ms <= 0) return '00:00:00';

  const s = formatTimeSegment(seconds % 60);
  const m = formatTimeSegment((seconds / 60) % 60);
  const h = formatTimeSegment((seconds / (60 * 60)) % 24);
  const d = formatTimeSegment(seconds / (60 * 60 * 24));

  return `${d === '00' ? '' : `${d}:`}${h}:${m}:${s}`;
};

const AuctionCard = ({ nft, image }: Props) => {
  // const [liked, setLiked] = useState(false);

  const calcRemainingTime = (): number | undefined => {
    if (!nft?.auctionState?.deadline) return undefined;

    const endTime = nft.auctionState.deadline;
    const nowDate = new Date();

    return endTime.getTime() - nowDate.getTime();
  };

  const [timeRemaining, setTimeRemaining] = useState(calcRemainingTime());

  useEffect(() => {
    setInterval(() => {
      setTimeRemaining(calcRemainingTime());
    }, 1000);
  }, []);

  const price = nft ? priceToADA(nft.price) : '';
  let bid = '';

  if (nft?.auctionState) {
    if (nft.auctionState.highestBid) {
      bid = `Top bid: ${priceToADA(nft.auctionState.highestBid.bid)}`;
    } else if (nft.auctionState.minBid) {
      bid = `Min bid: ${priceToADA(nft.auctionState.minBid)}`;
    } else {
      bid = 'Place bid';
    }
  }

  return (
    <Box boxClass={styles.container}>
      <div className={styles.header}>
        <div className={styles['header-text']}>
          <p className={styles.title}>{image?.title ?? ''}</p>
          <div className={styles['span-container']}>
            {/* <span className={styles.span}>
              <img src="https://picsum.photos/id/33/32/32" alt="avatar" className={styles.avatar} />
            </span> */}
            <span className={styles.span}>
              <img src={dots} className={styles.dots} alt="more" />
            </span>
          </div>
        </div>
      </div>
      <Link to={`/itempage/${nft?.id.contentHash ?? ''}`}>
        <div className={styles.image}>
          <img src={image?.path} alt="nft-item" />
          {timeRemaining && (
            <div className={styles['time-wrapper']}>
              <span className={styles.time}>{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>
      </Link>
      <div className={styles.footer}>
        <div className={styles.amount}>
          <h3>{price}</h3>
          {/* {quantity && <p>{quantity}</p>} */}
        </div>
        <div className={styles.bid}>
          <p>{bid}</p>
          {/* <div className={styles['likes-wrapper']}>
            <p className={styles['bid-value']}>{likes}</p>
            <img src={liked ? filled : heart} alt="heart" onClick={() => setLiked(!liked)}></img>
          </div> */}
        </div>
      </div>
    </Box>
  );
};

export default AuctionCard;
