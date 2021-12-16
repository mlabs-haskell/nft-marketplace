import { ReactNode } from 'react';
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
  creatorImagePath?: string;
  ownerPKH: string;
  ownerImagePath?: string;
}

const ItemDetails = ({
  title,
  saleValue,
  topBidValue,
  description,
  creatorValue,
  creatorName,
  creatorImagePath,
  ownerPKH,
  ownerImagePath,
}: Props) => {
  const truncatePubKeyHash = (pkh: string) =>
    pkh.length <= 15 ? pkh : `${pkh.slice(0, 10)}...${pkh.slice(-4)}`;

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
        {description.substring(0, 256) +
          (description.length > 256 ? '...' : '')}{' '}
        <span role="button" tabIndex={0} className={styles.button}>
          Read more
        </span>
      </p>
      <div className={styles['user-details-container']}>
        <div className={styles['user-details']}>
          <p className={styles['user-details-text']}>
            Creator: <span>{creatorValue}</span>
          </p>
          <div className={styles['user-photo-container']}>
            <UserPhoto imgUrl={creatorImagePath} />
            <p>{creatorName}</p>
          </div>
        </div>
        <div className={styles['user-details-spacer']} />
        <div className={styles['user-details']}>
          <p className={styles['user-details-text']}>Owner</p>
          <div className={styles['user-photo-container']}>
            <UserPhoto imgUrl={ownerImagePath} />
            <p>{truncatePubKeyHash(ownerPKH)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
