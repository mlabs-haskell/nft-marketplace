import Button from 'components/UI/atoms/Button';
import styles from './index.module.scss';

interface Props {
  collections?: () => void;
  sales?: () => void;
}

const ExploreHeader = ({ collections, sales }: Props) => {
  return (
    <div className={styles.header}>
      <h2>Explore</h2>
      <div className={styles.button}>
        <Button label="My Sales" color="secondary" onClick={sales} />
        <Button label="My Collection" color="primary" onClick={collections} />
      </div>
    </div>
  );
};

export default ExploreHeader;
