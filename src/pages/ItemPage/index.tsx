import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetails from 'components/UI/molecules/ItemDetails';
import ItemPhotoCard from 'components/UI/molecules/ItemPhotoCard';
import { NftContext } from 'context/NftContext';
import styles from './index.module.scss';

function ItemPage() {
  const { id }: { id: string } = useParams();

  const { itemDetailNft, fetchNft } = useContext(NftContext);

  useEffect(() => {
    window.scrollTo(0, 20);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        await fetchNft(id);
      } catch (err) {
        console.log(err);
      }
    };
    fetchItems();
  }, []);

  function calculateRoy() {
    if (itemDetailNft !== undefined) {
      const num =
        (itemDetailNft.creatorValue[0] * 100) / itemDetailNft.creatorValue[1];

      const result = Math.round((num + Number.EPSILON) * 100) / 100;
      return result.toString();
    }
    return '';
  }

  return (
    <div className={styles.container}>
      <ItemPhotoCard likeCount="167" />
      <ItemDetails
        title={itemDetailNft?.title}
        saleValue={`${itemDetailNft?.saleValue}ETH`}
        topBidValue={
          itemDetailNft?.topBidValue?.bid
            ? `${itemDetailNft?.topBidValue?.bid}ETH`
            : 'None'
        }
        description={itemDetailNft?.description}
        creatorValue={`${calculateRoy()}%`}
        imgUrl={itemDetailNft?.creatorAvatarImage}
        creatorName={itemDetailNft?.creatorName}
        type="SELL"
      />
    </div>
  );
}

export default ItemPage;
