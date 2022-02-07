import Button from 'components/UI/atoms/Button';
import styles from './index.module.scss';

interface Props {
  collections?: () => void;
  sales?: () => void;
  all?: () => void;
}

const ExploreHeader = ({ collections, sales, all }: Props) => {
  return (
    <div className={styles.header}>
      <h2>Explore</h2>
      <div className={styles.button}>
        <Button label="All" color="secondary" onClick={all} />
        <Button label="My Sales" color="secondary" onClick={sales} />
        <Button label="My Collection" color="primary" onClick={collections} />
      </div>
    </div>
  );
};

export default ExploreHeader;
