import { useContext, useEffect, useState } from 'react';
import ItemDetails from 'components/UI/molecules/ItemDetails';
import ItemPhotoCard from 'components/UI/molecules/ItemPhotoCard';
import { NftContext } from 'context/NftContext';
import styles from './index.module.scss';

const ItemPage = () => {
  const { itemDetailNft, fetchNft } = useContext(NftContext);
  const [infoNft, setInfoNft] = useState(itemDetailNft);
  useEffect(() => {
    const fetchItems = async () => {
      try {
        await fetchNft();
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    setInfoNft(itemDetailNft);
  }, [itemDetailNft]);

  return (
    <div className={styles.container}>
      <ItemPhotoCard image={infoNft?.image} likeCount="167" />
      <ItemDetails
        title={infoNft?.title}
        saleValue={`${infoNft?.saleValue}ETH`}
        topBidValue={`${infoNft?.topBidValue}ETH`}
        description={infoNft?.description}
        creatorValue={
          infoNft !== undefined
            ? `${(infoNft.creatorValue[0] * 100) / infoNft.creatorValue[1]}%`
            : 'NULL'
        }
        imgUrl={infoNft?.creatorAvatarImage}
        creatorName="Defacer#od"
        type="SELL"
      />
    </div>
  );
};

export default ItemPage;
