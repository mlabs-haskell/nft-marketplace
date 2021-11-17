import React from 'react';
import Box from '../../atoms/Box';
import Button from '../../atoms/Button';
import styles from './index.module.scss';

interface Props {
  title: string;
  subTitle: string;
  tessellationClass: string;
  seedValue: string;
  description: string;
  creatorValue: string;
  ownersData: string;
  bidsData: string;
  historyData: string;
}

const ItemDetails = ({
  title,
  subTitle,
  tessellationClass,
  seedValue,
  description,
  creatorValue,
  ownersData,
  bidsData,
  historyData,
}: Props) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{title}</h4>
      <h4>{subTitle}</h4>

      <div style={{ display: 'flex' }}>
        <h6>Tessellation Class:</h6>
        <h5>{tessellationClass}</h5>
      </div>

      <div style={{ display: 'flex' }}>
        <h6>Seed:</h6>
        <h5>{seedValue}</h5>
      </div>

      <h6 style={{ display: 'inline-block' }}>{description} Read more</h6>

      <div>
        <h5>Creator: {creatorValue}</h5>
      </div>
      <Box boxClass={styles['tab-bar']}></Box>
      <div
        style={{
          display: 'flex',
          marginTop: 27,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Button label="Place a bid" size="medium" color="" />
        <Button label="Share" size="medium" color="" />
      </div>
      <h6>There's no bids yet. Be the first!</h6>
    </div>
  );
}

export default ItemDetails;
