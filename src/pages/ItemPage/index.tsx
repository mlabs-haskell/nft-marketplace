import ItemDetails from 'components/UI/molecules/ItemDetails';
import ItemPhotoCard from 'components/UI/molecules/ItemPhotoCard';
import { NftContext } from 'context/NftContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InformationNft, Rational } from 'seabug-sdk/src/common';
import styles from './index.module.scss';

interface Props {
  type: 'BUY' | 'SELL';
}

const ItemPage = ({ type }: Props) => {
  const { nftId } = useParams<{ nftId: string }>();
  const { nftsById, imagesByNftId } = useContext(NftContext);

  const nft = nftsById.get(nftId);
  const image = imagesByNftId.get(nftId);

  useEffect(() => {
    window.scrollTo(0, 20);
  }, []);

  const priceToADA = (value?: bigint): string => {
    if (!value) return '';
    const result = Number(value) / 1000000;
    return `${result.toFixed(3)} ADA`;
  };

  const rationalToFloat = (share: Rational, decimals: number) => {
    const sharePercent = (share[0] * 100) / share[1];
    const multiplier = 10 ** decimals;

    return Math.round(sharePercent * multiplier) / multiplier;
  };

  return (
    <div className={styles.container}>
      <ItemPhotoCard imageUrl={image?.path ?? ''} likeCount="167" />
      <ItemDetails
        title={image?.title ?? ''}
        saleValue={priceToADA(nft?.price)}
        topBidValue={priceToADA(nft?.auctionState?.highestBid?.bid)}
        description="Syntertic Seeds cannot be bought on the primary marktet and can only be earned or gifted. Synthetic Seeds do not belong to any Tessellation Class, cannot be incubated and are not eligible to be ..."
        creatorValue={`${
          nft?.share ? rationalToFloat(nft?.share, 2) : 0
        }% royalties`}
        creatorName=""
        type={type}
      />
    </div>
  );
};

export default ItemPage;
