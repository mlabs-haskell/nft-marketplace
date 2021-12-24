import { ReactNode, useEffect, useState } from 'react';
import girl from 'assets/svg/girl.svg';
import { formtTimeItemDetail } from 'components/Util/formatTime';
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
  deadline?: Date;
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
  deadline,
}: Props) => {
  const truncatePubKeyHash = (pkh: string) =>
    pkh.length <= 15 ? pkh : `${pkh.slice(0, 10)}...${pkh.slice(-4)}`;

  const [showFullDescription, setShowFullDescription] = useState(false);
  const handleDesciption = () => setShowFullDescription(!showFullDescription);

  //  Time
  const calcRemainingTime = (): number | undefined => {
    if (!deadline) return undefined;

    const endTime = deadline;
    const nowDate = new Date();
    const remaining = endTime.getTime() - nowDate.getTime();

    return remaining > 0 ? remaining : undefined;
  };

  const [timeRemaining, setTimeRemaining] = useState(calcRemainingTime());

  useEffect(() => {
    setInterval(() => {
      setTimeRemaining(calcRemainingTime());
    }, 1000);
  }, []);

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
        {showFullDescription
          ? description
          : `${description.substring(0, 256)}...`}
        <span
          role="button"
          tabIndex={0}
          className={styles.button}
          onClick={() => handleDesciption()}
        >
          {showFullDescription ? 'Read less' : 'Read more'}
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
        <div className={styles['user-details']}>
          <p className={styles['user-details-text']}>Owner</p>
          <div className={styles['user-photo-container']}>
            <UserPhoto imgUrl={ownerImagePath} />
            <p>{truncatePubKeyHash(ownerPKH)}</p>
          </div>
        </div>
      </div>
      {timeRemaining && (
        <div className={styles['info-box']}>
          <div className={styles['time-container']}>
            <span className={styles['time-text']}>Auction ends in</span>
            <div className={styles['time-wrapper']}>
              {Object.entries(formtTimeItemDetail(timeRemaining)).map(
                (item, i) => (
                  <div key={`${item[0]}`} className={styles['time-div']}>
                    <span className={styles.time}>{item[1]}</span>
                    <span className={styles['time-text']}>{item[0]}</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
