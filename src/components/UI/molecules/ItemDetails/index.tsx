import { useState } from 'react';
import girl from 'assets/svg/girl.svg';
import UserPhoto from '../UserPhoto';
import styles from './index.module.scss';
import Button from '../../atoms/Button';

interface Props {
  title: string;
  saleValue: string;
  topBidValue: string;
  description: string;
  creatorValue: string;
  creatorName: string;
  type: string;
  handleParentFunction?: () => void;
}

const ItemDetails = ({
  title,
  saleValue,
  topBidValue,
  description,
  creatorValue,
  creatorName,
  type,
  handleParentFunction,
}: Props) => {
  const [active, setActive] = useState('owners');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles['top-text']}>
        <ul>
          <li>
            On Sales for: <span>{saleValue}</span>
          </li>
        </ul>
        <ul>
          <li>
            Highest Bid: <span>{topBidValue}</span>
          </li>
        </ul>
      </div>
      <p className={styles.description}>
        {description}{' '}
        <span id="hidden" className={styles.hidden}>
          this is hidden content{' '}
        </span>
        <span role="button" tabIndex={0} className={styles.button}>
          Read more
        </span>
      </p>
      <p className={styles.creator}>
        Creator: <span>{creatorValue}</span>
      </p>
      <div className={styles.creator_img}>
        <UserPhoto imgUrl={girl} />
        <p>{creatorName}</p>
      </div>
      <div className={styles.buttons}>
        {type === 'BUY' ? (
          <>
            <Button
              label="Place a bid"
              color="secondary"
              btnClass={styles.btn}
            />
            <Button
              label={type}
              color="primary"
              btnClass={styles.btn}
              onClick={handleParentFunction}
            />
          </>
        ) : (
          <>
            <Button
              label="Start Auction"
              color="secondary"
              btnClass={styles.btn}
            />
            <Button
              label={type}
              color="primary"
              btnClass={styles.btn}
              onClick={handleParentFunction}
            />
          </>
        )}
      </div>
      <p style={{ fontSize: '12px', lineHeight: '18px', marginBottom: '36px' }}>
        There&apos;s no bids yet. Be the first!
      </p>
    </div>
  );
};

export default ItemDetails;
