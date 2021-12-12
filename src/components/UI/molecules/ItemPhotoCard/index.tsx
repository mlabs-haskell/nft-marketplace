import styles from './index.module.scss';
import heart from '../../../../assets/svg/like-heart.svg';
import image1 from '../../../../assets/svg/image1.svg';

interface Props {
  imageUrl?: string;
  likeCount: string;
}

// TODO: Uncomment heart code once feature is ready

function ItemPhotoCard({ imageUrl, likeCount }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.photobox}>
        {imageUrl ? (
          <img className={styles.nftImage} src={imageUrl} alt="nft" />
        ) : (
          <></>
        )}
        <div className={styles.heartAbsolute}>
          {/* <div className={styles.heartContainer}>
            <img src={heart} alt="heart" className={styles.heart} />
            <p className={styles['like-count']}>{likeCount}</p>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ItemPhotoCard;
