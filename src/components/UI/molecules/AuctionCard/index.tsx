import {useState} from 'react';
import styles from './index.module.scss';
import heart from '../../../../assets/svg/heart-icon.svg';
import filled from '../../../../assets/svg/filled-heart.svg';
import more from '../../../../assets/svg/more-icon.svg';

interface Props {
  title: string,
  amount: string,
  quantity: string,
  bid?: string,
  likes: string,
  time?: string,
  caption?: string,
  image: string,
}

const AuctionCard = ({ title, amount, quantity, bid, likes, time, caption, image }: Props) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles['header-text']}>
          <p>{title}</p>
          <p>{caption}</p>
          <div className={styles['span-container']}>
            <span className={styles.span}></span>
            <span className={styles.span}><img src={more} alt="more" /></span>
          </div>
        </div>
      </div>
      <div className={styles.image}>
        <img src={image} alt="nft-item" />
        <div className={styles.absolute}>
          <p>{time}</p>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.amount}>
          <h3>
            {amount}
          </h3>
          <p>{quantity}</p>
        </div>
        <div className={styles.bid}>
          <p>{bid}</p>
          <div style={{ display: 'flex' }}>
            <p className={styles['bid-value']}>{likes}</p>
            <img src={liked ? filled : heart} alt="heart" onClick={() => setLiked(!liked)}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
