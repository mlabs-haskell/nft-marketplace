import Button from 'components/UI/atoms/Button';
import ItemDetails from 'components/UI/molecules/ItemDetails';
import ItemPhotoCard from 'components/UI/molecules/ItemPhotoCard';
import { NftContext } from 'context/NftContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rational } from 'seabug-sdk/src/common';
import { priceToADA } from 'utils/priceToADA';
import BuyModal from '../../components/UI/organisms/ItemPage/BuyModal';
import styles from './index.module.scss';

interface Props {
  type: 'BUY' | 'SELL';
}

const ItemPage = ({ type }: Props) => {
  const { nftId } = useParams<{ nftId: string }>();
  const { artists, images, nfts, common } = useContext(NftContext);
  const [displayModal, setDisplayModal] = useState<'NONE' | 'BUY'>('NONE');

  const nft = nfts.getById({ contentHash: nftId ?? '' });
  const artist = nft
    ? artists.getByPubKeyHash(nft.author.pubKeyHash)
    : undefined;
  const owner = nft ? artists.getByPubKeyHash(nft.owner.pubKeyHash) : undefined;
  const image = images.getByNftId({ contentHash: nftId ?? '' });

  useEffect(() => {
    // If the user navigates directly to item page, the nfts or images may not
    // have been fetched yet.
    if (!nft || !image) common.fetchAll();
  }, []);

  const rationalToFloat = (share: Rational, decimals: number) => {
    const sharePercent = (share[0] * 100) / share[1];
    const multiplier = 10 ** decimals;

    return Math.round(sharePercent * multiplier) / multiplier;
  };

  const closeModal = () => setDisplayModal('NONE');

  const renderBuyButtons = () => {
    return (
      <>
        <div className={styles.buttons}>
          <Button label="Place a bid" color="secondary" btnClass={styles.btn} />
          <div className={styles.spacer} />
          <Button
            label={type}
            color="primary"
            btnClass={styles.btn}
            onClick={() => setDisplayModal('BUY')}
          />
        </div>
        <p style={{ fontSize: '12px', lineHeight: '18px' }}>
          There&apos;s no bids yet. Be the first!
        </p>
      </>
    );
  };

  const renderSellerButtons = () => {
    return (
      <div className={styles.buttons}>
        <Button label="Start Auction" color="secondary" btnClass={styles.btn} />
        <Button
          label={type}
          color="primary"
          btnClass={styles.btn}
          onClick={() => {}}
        />
      </div>
    );
  };

  return (
    <>
      <div className={styles.container}>
        <ItemPhotoCard imageUrl={image?.path} likeCount="167" />
        <div className={styles['item-details-container']}>
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
            ownerPKH={owner?.pubKeyHash ?? ''}
            ownerImagePath={owner?.imagePath}
          />
          {type === 'BUY' ? renderBuyButtons() : renderSellerButtons()}
        </div>
      </div>
      <BuyModal
        isOpen={displayModal === 'BUY'}
        closeModal={closeModal}
        title={image?.title || ''}
        from={artist?.name || ''}
        balance={0}
        percentTax={0.0}
        nftPrice={nft?.price || BigInt(0)}
        nftId={nftId}
      />
    </>
  );
};

export default ItemPage;
