import ItemDetails from 'components/UI/molecules/ItemDetails';
import ItemPhotoCard from 'components/UI/molecules/ItemPhotoCard';
import { useEffect } from 'react';
import styles from './index.module.scss';

const ItemPage = () => {
  useEffect(() => {
    window.scrollTo(0, 20);
  }, []);

  return (
    <div className={styles.container}>
      <ItemPhotoCard likeCount="167" />
      <ItemDetails
        title="SPIRIT SEED - SYNTHETIC"
        saleValue="250ETH"
        topBidValue="1.123WETH"
        description="Syntertic Seeds cannot be bought on the primary marktet and can only be earned or gifted. Synthetic Seeds do not belong to any Tessellation Class, cannot be incubated and are not eligible to be ..."
        creatorValue="10% royalties"
        creatorName="Defacer#od"
        type="SELL"
      />
    </div>
  );
};

export default ItemPage;
