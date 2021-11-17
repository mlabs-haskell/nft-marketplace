// import {useState} from 'react';
import ItemDetails from '../../components/UI/molecules/ItemDetails';
import ItemPhotoCard from '../../components/UI/molecules/ItemPhotoCard';
// import Box from '../../components/UI/atoms/Box';
// import Tab from '../../components/UI/molecules/Tab';
// import styles from './index.module.scss';

const ItemPage = () => {
  // const [active, setActive] = useState('owners');
  // const tabs = ['owners', 'Bids', 'History'];
  return (
    <div>
    <div style={{ display: 'flex' }}>
      <ItemPhotoCard imgUrl="" likeCount="167"/>
      <ItemDetails
        title="SPIRIT SEED - SYNTHETIC"
        subTitle="Not for sale.100 editions"
        tessellationClass="N/A"
        seedValue="Synthetic"
        description="Syntertic Seeds cannot be bought on the primary marktet and can only be earned or gifted. Synthetic Seeds do not belong to any Tessellation Class, cannot be incubated and are not eligible to be ..."
        creatorValue="10% royalties"
        ownersData="Defacer#od"
        bidsData=""
        historyData=""
      />
    </div>
      {/* <Box boxClass={styles.container}>
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
        </Box> */}
    </div>
  );
};

export default ItemPage;
