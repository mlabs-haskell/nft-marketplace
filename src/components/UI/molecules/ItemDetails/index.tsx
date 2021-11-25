/* eslint-disable */
import { useState } from 'react';
import UserPhoto from '../UserPhoto';
import styles from './index.module.scss';
import girl from 'assets/svg/girl.svg';
import Button from '../../atoms/Button';
import Box from '../../atoms/Box';
import Tab from '../Tab';

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
  type:string;
  handleParentFunction: () =>void;

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
  type,
  handleParentFunction,
}: Props) => {
  const [active, setActive] = useState('owners');
  const tabs = ['owners', 'Bids', 'History'];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles["top-text"]}>
        <ul>
          <li>On Sales for: <span>{saleValue}</span></li>
          {/* <li>Tessellation Class:</li>
          <li>Seed:</li> */}
        </ul>
        <ul>
          <li>Highest Bid: <span>{topBidValue}</span></li>
          {/* <li><h3>{tessellationClass}</h3></li>
          <li><h3>{seedValue}</h3></li> */}
        </ul>
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
          {active === 'owners' && 
          <div className={styles.block__content}>
          <UserPhoto imgUrl={girl} isChecked={true} />
          <div>
            <p>
              {creatorName}
              <br />
              <span>100 editions not for sale</span>
            </p>
          </div>
          <p style={{ marginLeft: '50px' }}>Content for </p>
        </div>}
          {active === 'Bids' && <p>bye</p>}
        </div>
      </Box>
      <div className={styles.buttons}>
        {type === "BUY" ? 
          (<>
          <Button label="Place a bid" color="secondary" btnClass={styles.btn} />
          <Button label={type} color="primary" btnClass={styles.btn}  onClick={handleParentFunction}/>
          </>) : (<>
          <Button label="Start Auction" color="secondary" btnClass={styles.btn} />
          <Button label={type} color="primary" btnClass={styles.btn}  onClick={handleParentFunction}/>
          </>)}
      </div>
      <p style={{ fontSize: '12px', lineHeight: '18px', marginBottom: '36px' }}>
        There's no bids yet. Be the first!
      </p>
    </div>
  );
};

export default ItemDetails;
