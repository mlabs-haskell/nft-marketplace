import React from 'react';
import Box from '../../atoms/Box';
import styles from './index.module.scss';
import heart from '../../../../assets/svg/heart-icon.svg';

interface Props {
  imgUrl: string;
  likeCount: string;
}

function ItemPhotoCard({ imgUrl, likeCount }: Props) {
  return (
    <div className={styles.container}>
      <Box boxClass={styles.photobox}>
        <div className={styles.heart}>
          <img src={heart} alt="heart" className={styles.photo} />
          <p className={styles['like-count']}>{likeCount}</p>
        </div>
      </Box>
    </div>
  );
}

export default ItemPhotoCard;
