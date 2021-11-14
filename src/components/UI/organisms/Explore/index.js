import React from 'react';
import CaptionCard from '../../molecules/CaptionCard';
import styles from './index.module.scss'

const Explore = () => {
  return (
    <div>
      <h2>Explore</h2>
      <div className={styles["card-container"]}>
        <CaptionCard title="Meelo" name="By Hennkok" />
        <CaptionCard title="Meelo" name="By Hennkok" />
        <CaptionCard title="Meelo" name="By Hennkok" />
        <CaptionCard title="Meelo" name="By Hennkok" />
        <CaptionCard title="Meelo" name="By Hennkok" />
        <CaptionCard title="Meelo" name="By Hennkok" />
        <CaptionCard title="Meelo" name="By Hennkok" />
        <CaptionCard title="Meelo" name="By Hennkok" />
        <CaptionCard title="Meelo" name="By Hennkok" />
        <CaptionCard title="Meelo" name="By Hennkok" />
      </div>
    </div>
  );
}; 

export default Explore;
