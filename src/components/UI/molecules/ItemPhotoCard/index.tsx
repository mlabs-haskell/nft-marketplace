import styles from './index.module.scss';
import heart from '../../../../assets/svg/like-heart.svg';
import image1 from '../../../../assets/svg/image1.svg';

interface Props {
  likeCount: string;
  image?: string;
}

function ItemPhotoCard({ likeCount, image }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.photobox}>
        <img src={image1} alt="nft" />
        <div className={styles.heartAbsolute}>
          <div className={styles.heartContainer}>
            <img src={heart} alt="heart" className={styles.heart} />
            <p className={styles['like-count']}>{likeCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPhotoCard;
