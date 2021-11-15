import React from 'react';
import CaptionCard from '../../molecules/CaptionCard';
import styles from './index.module.scss';
import Button from '../../atoms/Button';

const Explore = () => {
  return (
    <div className={styles.contatiner}>
      <div className={styles.header}>
        <h2>Explore</h2>
        <Button label="My Collection" color="secondary" />
      </div>
      <div className={styles['card-container']}>
        <CaptionCard title="Meelo" name="By Hennkok" className={styles.card} />
        <CaptionCard title="Meelo" name="By Hennkok" className={styles.card} />
        <CaptionCard title="Meelo" name="By Hennkok" className={styles.card} />
        <CaptionCard title="Meelo" name="By Hennkok" className={styles.card} />
        <CaptionCard title="Meelo" name="By Hennkok" className={styles.card} />
        <CaptionCard title="Meelo" name="By Hennkok" className={styles.card} />
        <CaptionCard title="Meelo" name="By Hennkok" className={styles.card} />
        <CaptionCard title="Meelo" name="By Hennkok" className={styles.card} />
        <CaptionCard title="Meelo" name="By Hennkok" className={styles.card} />
        <CaptionCard title="Meelo" name="By Hennkok" className={styles.card} />
      </div>
      <div className={styles.btn}>
        <Button label="Load More" color="tertiary" size="large" />
      </div>
    </div>
  );
};

export default Explore;
