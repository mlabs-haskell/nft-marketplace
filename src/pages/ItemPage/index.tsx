import ItemDetails from 'components/UI/molecules/ItemDetails';
import ItemPhotoCard from 'components/UI/molecules/ItemPhotoCard';
import { NftContext } from 'context/NftContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rational } from 'seabug-sdk/src/common';
import { priceToADA } from 'utils/priceToADA';
import styles from './index.module.scss';

interface Props {
  type: 'BUY' | 'SELL';
}

const ItemPage = ({ type }: Props) => {
  const { nftId } = useParams<{ nftId: string }>();
  const { artists, images, nfts, common } = useContext(NftContext);

  const nft = nfts.getById({ contentHash: nftId });
  const artist = nft
    ? artists.getByPubKeyHash(nft.author.pubKeyHash)
    : undefined;
  const image = images.getByNftId({ contentHash: nftId });

  useEffect(() => {
    window.scrollTo(0, 20);

    // If the user navigates directly to item page, the nfts or images may not
    // have been fetched yet.
    if (!nft || !image) common.fetchAll();
  }, []);

  const rationalToFloat = (share: Rational, decimals: number) => {
    const sharePercent = (share[0] * 100) / share[1];
    const multiplier = 10 ** decimals;

    return Math.round(sharePercent * multiplier) / multiplier;
  };

  return (
    <div className={styles.container}>
      <ItemPhotoCard imageUrl={image?.path} likeCount="167" />
      <ItemDetails
        title={image?.title ?? ''}
        saleValue={priceToADA(nft?.price)}
        topBidValue={priceToADA(nft?.auctionState?.highestBid?.bid)}
        description={image?.description ?? ''}
        creatorValue={`${
          nft?.share ? rationalToFloat(nft?.share, 2) : 0
        }% royalties`}
        creatorName={artist?.name ?? ''}
        creatorImagePath={artist?.imagePath}
        type={type}
      />
    </div>
  );
};

export default ItemPage;
