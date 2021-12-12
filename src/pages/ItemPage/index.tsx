import { useContext, useEffect, useRef, useState } from 'react';
import { AuctionState, InformationNft } from 'seabug-sdk/src/common';
import { useParams } from 'react-router-dom';
import ItemDetails from 'components/UI/molecules/ItemDetails';
import ItemPhotoCard from 'components/UI/molecules/ItemPhotoCard';
import { NftContext } from 'context/NftContext';
import styles from './index.module.scss';

type NftItemDetail = {
  title: string;
  image: string;
  description: string;
  creatorName: string;
  creatorAvatarImage: string;
  creatorId: string;
  saleValue: InformationNft['price'];
  topBidValue?: AuctionState['highestBid'];
  creatorValue: InformationNft['share'];
};

function ItemPage() {
  const { id }: { id: string } = useParams();

  const { nfts, artists, images } = useContext(NftContext);

  const [itemDetailNft, setItemDetailNft] = useState<NftItemDetail>();
  useEffect(() => {
    window.scrollTo(0, 20);
  }, []);

  useEffect(() => {
    let isSubscribed = true;
    const getItems = () => {
      const nft = nfts.get(id);

      if (nft) {
        // search images
        const image = images.get(id);
        // search author
        const artist = artists.get(nft.author.pubKeyHash);

        if (isSubscribed && image && artist) {
          setItemDetailNft({
            title: image.title,
            image: image.path,
            description: image.description,
            creatorName: artist.name,
            creatorAvatarImage: image.avatarPath,
            creatorId: artist.pubKeyHash,
            saleValue: nft.price,
            topBidValue: nft.auctionState?.highestBid,
            creatorValue: nft.share,
          });
        }
      }
    };
    getItems();
    return () => {
      isSubscribed = false;
    };
  }, []);

  function calculateRoy() {
    if (!itemDetailNft) return '';

    const percentage =
      (itemDetailNft.creatorValue[0] * 100) / itemDetailNft.creatorValue[1];

    const rounded = Math.round((percentage + Number.EPSILON) * 100) / 100;
    return rounded.toString();
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
        id={itemDetailNft?.creatorId}
        type="SELL"
      />
    </div>
  );
}

export default ItemPage;
