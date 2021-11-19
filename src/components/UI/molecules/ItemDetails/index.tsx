import React, { useState } from 'react';
import UserPhoto from '../UserPhoto';
import styles from './index.module.scss';
import girl from '../../../../assets/svg/girl.svg';
import Button from '../../atoms/Button';

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
  const [ContentState, setContentState] = useState('owners');
  const ContentSwitching = (el: any) => {
    const contents = ['owners', 'bids', 'history'];
    contents.forEach((contentName: string) => {
      const wrapperElement: HTMLElement | null =
        document.getElementById(contentName);
      if (el.target.id !== contentName) {
        if (wrapperElement?.classList.contains(styles.active)) {
          wrapperElement.classList.remove(styles.active);
        }
      } else {
        if (!wrapperElement?.classList.contains(styles.active)) {
          wrapperElement?.classList.add(styles.active);
          setContentState(contentName);
        }
      }
    });
  };

  return (
    <div className={styles.content}>
      <h2>{title}</h2>
      <div className={styles.row}>
        <p>
          On sale for: <span>{saleValue}</span>
        </p>
        <p>
          Highest bid: <span>{topBidValue}</span>
        </p>
      </div>
      <div className={styles.row}>
        <p>Tessellation Class:</p>
        <p className={styles.blue}>{tessellationClass}</p>
      </div>
      <div className={styles.row}>
        <p>Seed: </p>
        <p className={styles.blue}>{seedValue}</p>
      </div>
      <p className={styles.description}>
        {description}{' '}
        <span id="hidden" className={styles.hidden}>
          this is hidden content{' '}
        </span>
        <span
          onClick={(thisElement) => {
            const el: HTMLElement | null = document.getElementById('hidden');
            const input = thisElement.target as HTMLElement;
            if (el?.style.display === 'inline') {
              input.innerText = 'Read more';
              el.style.display = 'none';
            } else {
              input.innerText = 'Hide';
              el!.style.display = 'inline';
            }
          }}
          className={styles.button}
        >
          Read more
        </span>
      </p>
      <p className={styles.creator}>
        Creator: <span>{creatorValue}</span>
      </p>
      <div className={styles.creator_img}>
        <UserPhoto imgUrl={girl} isChecked={true} />
        <p>{creatorName}</p>
      </div>
      <div className={styles.block}>
        <div className={styles.block__buttons}>
          <button
            onClick={ContentSwitching}
            id="owners"
            className={styles.active}
          >
            Owners
          </button>
          <button onClick={ContentSwitching} id="bids">
            Bids
          </button>
          <button onClick={ContentSwitching} id="history">
            History
          </button>
        </div>
        <div className={styles.block__content}>
          <UserPhoto imgUrl={girl} isChecked={true} />
          <div>
            <p>
              {creatorName}
              <br />
              <span>100 editions not for sale</span>
            </p>
          </div>
          <p style={{ marginLeft: '50px' }}>Content for {ContentState}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <Button label="Place a bid" color="secondary" />
        <Button label="BUY" color="primary" />
      </div>
      <p style={{ fontSize: '12px', lineHeight: '18px', marginBottom: '36px' }}>
        There's no bids yet. Be the first!
      </p>
    </div>
  );
};

export default ItemDetails;
