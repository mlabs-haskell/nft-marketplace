import React from 'react';
import Box from '../../atoms/Box';
import styles from './index.module.scss';
import heart from '../../../../assets/svg/heart-icon.svg';

const AuctionCard = ({ title, amount, quantity, bid, likes, time }) => {
  return (
    <div className={styles.container}>
      <Box boxClass={styles.header}>
        <div className={styles['header-text']}>
          <h4>{title}</h4>
          <div className={styles['span-container']}>
            <span className={styles.span}></span>
            <span className={styles.span}></span>
            <span className={styles.span}></span>
          </div>
          <div className={styles.absolute}>
            <p>{time} Left</p>
          </div>
        </div>
      </Box>
      <Box color="light" boxClass={styles.footer}>
        <div>
          <h3>
            {amount} <span>{quantity}</span>
          </h3>
          <div className={styles.bid}>
            <p>{bid}</p>
            <div style={{ display: 'flex' }}>
              <p className={styles['bid-value']}>{likes}</p>
              <img src={heart} alt="heart"></img>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default AuctionCard;
