import styles from './index.module.scss';
import check from '../../../../assets/svg/check-fill.svg';

interface Props {
  imgUrl?: string;
}

const UserPhoto = ({ imgUrl }: Props) => {
  return (
    <div className={styles.container}>
      {imgUrl && <img src={imgUrl} alt="userPhoto" />}
      <img src={check} alt="check" className={styles.check} />
    </div>
  );
};

export default UserPhoto;
