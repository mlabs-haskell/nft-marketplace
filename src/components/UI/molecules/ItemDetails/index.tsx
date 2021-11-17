import React from 'react';
import Box from '../../atoms/Box';
import UserPhoto from '../UserPhoto';
import Button from '../../atoms/Button';
import styles from './index.module.scss';
import image2 from '../../../../assets/svg/image2.svg';

interface Props {
  title: string;
  saleValue: string;
  topBidValue: string;
  tessellationClass: string;
  seedValue: string;
  description: string;
  creatorValue: string;
  creatorName: string;
  ownersData: string;
  bidsData: string;
  historyData: string;
}

const ItemDetails = ({
  title,
  saleValue,
  topBidValue,
  tessellationClass,
  seedValue,
  description,
  creatorValue,
  creatorName,
  ownersData,
  bidsData,
  historyData,
}: Props) => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>{title}</h4>
      <div style={{ marginTop: 12 }}>
        <div>
          <h4 className={styles.subtitle}>On Sales for:</h4>
          <h4 className={styles.value}>{saleValue}</h4>
        </div>
        <div style={{ marginLeft: 36 }}>
          <h4 className={styles.subtitle}>Highest Bid:</h4>
          <h4 className={styles.value}>{topBidValue}</h4>
        </div>
      </div>

      <div style={{ marginTop: 27 }}>
        <h4 className={styles.subtitle} style={{ width: 170 }}>
          Tessellation Class:
        </h4>
        <h6 className={styles.value1}>{tessellationClass}</h6>
      </div>

      <div style={{ marginTop: 14 }}>
        <h4 className={styles.subtitle} style={{ width: 170 }}>
          Seed:
        </h4>
        <h6 className={styles.value1}>{seedValue}</h6>
      </div>

      <h6
        className={styles.description}
        style={{ display: 'inline-block', marginTop: 36 }}
      >
        {description}{' '}
        <span style={{ color: '#3983F2', fontWeight: 600 }}>Read more</span>
      </h6>

      <div style={{ marginTop: 36 }}>
        <h4
          className={styles.subtitle}
          style={{ marginRight: 9, color: 'black' }}
        >
          Creator:
        </h4>
        <span className={styles.subtitle}>{creatorValue}</span>
      </div>

      <div style={{ alignItems: 'center', marginTop: 9 }}>
        <UserPhoto imgUrl={image2} isChecked={true} />
        <h4 className={styles['creator-name']}>{creatorName}</h4>
      </div>

      <Box boxClass={styles['tab-bar']}></Box>
      <div
        style={{
          marginTop: 27,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Button label="Place a bid" size="medium" color="" />
        <Button label="Share" size="medium" color="" />
      </div>
      <div style={{ marginTop: 18, marginBottom: 60 }}>
        <h6>There's no bids yet. Be the first!</h6>
      </div>
    </div>
  );
};

export default ItemDetails;
