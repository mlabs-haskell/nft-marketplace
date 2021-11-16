import React from 'react';
import CaptionCard from '../../../molecules/CaptionCard';
import Slider from '../../../molecules/Slider';
import styles from './index.module.scss';

const Header = () => {
  return (
    <div className={styles.contatiner}>
      <Slider >
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
      </Slider>
    </div>
  );
};

export default Header;
