import { useState}  from "react";
import ItemDetails from '../../components/UI/molecules/ItemDetails';
import ItemPhotoCard from '../../components/UI/molecules/ItemPhotoCard';
import styles from './index.module.scss';
import SellModal from "../../components/UI/organisms/SellPage/SellModal";

const ItemPageSell = () => {

    const [itemSell, setItemSell] = useState(false);

    const handleItemSell = () => {
      
        setItemSell(!itemSell)
      };

  return (
      <div className={styles.container}>
        <ItemPhotoCard imgUrl="" likeCount="167" />
        <ItemDetails
          title="SPIRIT SEED - SYNTHETIC"
          saleValue="250ETH"
          topBidValue="1.123WETH"
          tessellationClass="N/A"
          seedValue="Synthetic"
          description="Syntertic Seeds cannot be bought on the primary marktet and can only be earned or gifted. Synthetic Seeds do not belong to any Tessellation Class, cannot be incubated and are not eligible to be ..."
          creatorValue="10% royalties"
          creatorName="Defacer#od"
          ownersData="Defacer#od"
          bidsData=""
          historyData=""
          type="SELL"
          handleParentFunction={handleItemSell}
        />
      <SellModal 
        display={itemSell}
        handleParentFunction={handleItemSell}
      />
      </div>
  );
};

export default ItemPageSell;
