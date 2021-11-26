import styles from './index.module.scss';
import check from '../../../../assets/svg/check-fill.svg';

interface Props {
  imgUrl: string;
  isChecked: boolean;
}

const UserPhoto = (props: Props) => {
  const { imgUrl, isChecked } = props;
  return (
    <div className={styles.container}>
      <img src={imgUrl} alt="userPhoto" />
      <img src={check} alt="check" className={styles.check} />
    </div>
  );
};

export default UserPhoto;
