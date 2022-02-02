import Button from 'components/UI/atoms/Button';
import styles from './index.module.scss';

const ExploreHeader = () => {
  return (
    <div className={styles.header}>
      <h2>Explore</h2>
      <div className={styles.button}>
        <Button label="My Sales" color="secondary" />
        <Button label="My Collection" color="primary" />
      </div>
    </div>
  );
};

export default ExploreHeader;
