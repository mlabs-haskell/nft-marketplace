import styles from './index.module.scss';

interface Props {
  imageUrl?: string;
}

// TODO: Uncomment heart code once feature is ready

// This line is for eslit error unused likeCount
function ItemPhotoCard({ imageUrl }: Props) {
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
