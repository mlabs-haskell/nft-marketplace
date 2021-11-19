import {useState} from 'react';
import Box from '../../atoms/Box';
import UserPhoto from '../UserPhoto';
import Button from '../../atoms/Button';
import styles from './index.module.scss';
import image2 from '../../../../assets/svg/image2.svg';
import Tab from '../../molecules/Tab';

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
  const [active, setActive] = useState('owners');
  const tabs = ['owners', 'Bids', 'History'];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles["top-text"]}>
        <ul>
          <li>On Sales for: <span>{saleValue}</span></li>
          <li>Tessellation Class:</li>
          <li>Seed:</li>
        </ul>
        <ul>
          <li>Highest Bid: <span>{topBidValue}</span></li>
          <li><h3>{tessellationClass}</h3></li>
          <li><h3>{seedValue}</h3></li>
        </ul>
      </div>

      <p className={styles.description}>
        {description}{' '}
        <span style={{ color: '#3983F2' }}>Read more</span>
      </p>

      <div className={styles["creator-name"]}>
        <h4 className={styles.subtitle}>
          Creator: <span className={styles.subtitle}>{creatorValue}</span>
        </h4>
      </div>

      <div className={styles.img}>
        <UserPhoto imgUrl={image2} isChecked={true} />
        <h4>{creatorName}</h4>
      </div>

      <Box boxClass={styles["box-container"]}>
        <div className={styles["tab-container"]}>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              title={tab}
              onClick={() => setActive(tab)}
              active= {active === tab}
            />
          ))}
        </div>
        <div className={styles.content}>
          {active === 'owners' && <p>hi</p>}
          {active === 'Bids' && <p>bye</p>}
        </div>
      </Box>

      <div className={styles["btn-container"]}>
        <Button label="Place a bid" size="medium" color="secondary" btnClass={styles.btn} />
        <Button label="Share" size="medium" color="primary" btnClass={styles.btn} />
      </div>
      <div>
        <p>There's no bids yet. Be the first!</p>
      </div>
    </div>
  );
};

export default ItemDetails;
