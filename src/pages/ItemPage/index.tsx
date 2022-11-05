import Button from 'components/UI/atoms/Button';
import ItemDetails from 'components/UI/molecules/ItemDetails';
import ItemPhotoCard from 'components/UI/molecules/ItemPhotoCard';
import PlaceBidModal from 'components/UI/organisms/ItemPage/PlaceBidModal';
import { NftContext } from 'context/NftContext';
import { WalletContext } from 'context/WalletContext';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAppConfig } from 'utils/appConfig';
import { priceToADA } from 'utils/priceToADA';
import { roundToFixed } from 'utils/roundToFixed';
import BuyModal from '../../components/UI/organisms/ItemPage/BuyModal';
import SetPriceModal from '../../components/UI/organisms/ItemPage/SetPriceModal';
import styles from './index.module.scss';

interface Props {
  type: 'BUY' | 'SELL';
}

const ItemPage = ({ type }: Props) => {
  const { nftId } = useParams<{ nftId: string }>();
  const { artists, images, nfts, common } = useContext(NftContext);
  const wallet = useContext(WalletContext);
  const [walletBalance, setWalletBalance] = useState(0n);
  const [displayModal, setDisplayModal] = useState<
    'NONE' | 'BUY' | 'SET_PRICE' | 'PLACE_BID'
  >('NONE');

  useEffect(() => {
    const setBal = async () => {
      setWalletBalance(wallet.getLovelace());
    };
    setBal();
  }, [wallet.connected]);

  const nft = nfts.getByIpfsHash(nftId);
  const artist = nft
    ? artists.getByPubKeyHash(nft.metadata.authorPkh)
    : undefined;
  const owner = nft
    ? artists.getByPubKeyHash(nft.metadata.ownerPkh)
    : undefined;
  const image = images.getByIpfsHash(nftId ?? '');

  useEffect(() => {
    wallet.connect('Nami');
    // If the user navigates directly to item page, the nfts or images may not
    // have been fetched yet.
    if (!nft || !image) common.fetchAll();
  }, []);

  const shareToPercentRoyalties = (share?: bigint) => {
    if (!share) return '';

    // Convert share from fraction of 10000 to fraction of 100
    const sharePercent = Number(share) / 100;

    return `${roundToFixed(sharePercent, 2)}% royalties`;
  };

  const closeModal = () => setDisplayModal('NONE');
  // Home Page explore loading
  const HomeExploreLoading = () => {
    const string = localStorage.getItem('ticker');
    localStorage.setItem('ticker', `LOAD${string?.replaceAll('LOAD', '')}`);
  };
  HomeExploreLoading();

  // TODO: Implement or remove auction logic
  const renderBuyButtons = () => {
    return (
      <>
        <div className={styles.buttons}>
          <Button
            label={type}
            color="primary"
            btnClass={styles.btn}
            onClick={() => setDisplayModal('BUY')}
          />
        </div>
      </>
    );
  };

  const isOwner = (pkh = '') => {
    return wallet.connected?.pkh === pkh;
  };

  const renderSellerButtons = () => {
    return (
      <div className={styles.buttons}>
        <Button
          label="Change Price"
          color="secondary"
          btnClass={styles.btn}
          onClick={() => setDisplayModal('SET_PRICE')}
        />
      </div>
    );
  };

  return (
    <>
      <div className={styles.container}>
        <ItemPhotoCard
          imageUrl={`${getAppConfig().ipfs.baseUrl}${nft?.ipfsHash}`}
        />
        <div className={styles['item-details-container']}>
          <ItemDetails
            title={image?.title ?? ''}
            saleValue={priceToADA(nft?.metadata.ownerPrice)}
            topBidValue=""
            description={image?.description ?? ''}
            creatorValue={shareToPercentRoyalties(nft?.metadata.authorShare)}
            creatorName={artist?.name ?? ''}
            creatorImagePath={artist?.imagePath}
            ownerPKH={owner?.pubKeyHash ?? ''}
            ownerImagePath={owner?.imagePath}
          />
          {owner?.pubKeyHash &&
            (isOwner(owner?.pubKeyHash)
              ? renderSellerButtons()
              : renderBuyButtons())}
        </div>
      </div>
      <SetPriceModal
        isOpen={displayModal === 'SET_PRICE'}
        closeModal={closeModal}
        title={image?.title || ''}
        from={artist?.name || ''}
        nftPrice={nft?.metadata.ownerPrice || BigInt(0)}
        nftId={nftId}
      />
      <BuyModal
        isOpen={displayModal === 'BUY'}
        closeModal={closeModal}
        title={image?.title || ''}
        from={artist?.name || ''}
        balance={walletBalance}
        percentTax={0.0}
        nftPrice={nft?.metadata.ownerPrice || BigInt(0)}
        nftId={nftId}
      />
      <PlaceBidModal
        isOpen={displayModal === 'PLACE_BID'}
        closeModal={closeModal}
        title={image?.title || ''}
        from={artist?.name || ''}
        balance={0}
        percentTax={0.0}
        nftId={nftId}
      />
    </>
  );
};

export default ItemPage;
