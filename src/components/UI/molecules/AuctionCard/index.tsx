// import { useState } from 'react';
import styles from './index.module.scss';
// import heart from '../../../../assets/svg/heart-icon.svg';
// import filled from '../../../../assets/svg/filled-heart.svg';
import dots from '../../../../assets/svg/dots.svg';
import Box from '../../atoms/Box';
import { Link } from 'react-router-dom';

interface Props {
  title: string,
  amount: string,
  quantity?: string,
  bid?: string,
  likes: string,
  time?: string,
  caption?: string,
  image: string,
  isExplore?: boolean
}

const AuctionCard = ({ title, amount, quantity, bid, likes, time, caption, image, isExplore }: Props) => {
  // const [liked, setLiked] = useState(false);

  const renderCurrectFooter = () => {
    if (isExplore) {
      return (
        <>
          <div className={styles.bid}>
            <h3>{amount}</h3>
            {/* <div className={styles['likes-wrapper']}>
              <p className={styles['bid-value']}>{likes}</p>
              <img src={liked ? filled : heart} alt="heart" onClick={() => setLiked(!liked)}></img>
            </div> */}
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className={styles.amount}>
            <h3>{amount}</h3>
            {/* {quantity && <p>{quantity}</p>} */}
          </div>
          <div className={styles.bid}>
            <p>{bid}</p>
            {/* <div className={styles['likes-wrapper']}>
              <p className={styles['bid-value']}>{likes}</p>
              <img src={liked ? filled : heart} alt="heart" onClick={() => setLiked(!liked)}></img>
            </div> */}
          </div>
        </>
      )
    }
  }

  return (
    <Box boxClass={`${styles.container} ${isExplore && styles.explore}`}>
        <div className={styles.header}>
          <div className={styles['header-text']}>
            <p className={styles.title}>{title}</p>
            <p>{caption}</p>
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
        <Link to="/itempage">
          <div className={styles.image}>
            <img src={image} alt="nft-item" />
            {time && <div className={styles["time-wrapper"]}>
              <span className={styles.time}>{time}</span>
            </div>}
            {isExplore && quantity && <p className={styles.quantity}>{quantity}</p>}
          </div>
        </Link>
        <div className={styles.footer}>
          {renderCurrectFooter()}
        </div>
    </Box>
  );
};

export default AuctionCard;
