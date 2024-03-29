import { NftContext } from 'context/NftContext';
import { useContext } from 'react';
import { priceToADA } from 'utils/priceToADA';
import Button from '../../../atoms/Button';
import Modal from '../../../molecules/Modal';
import styles from './index.module.scss';

type Props = {
  isOpen: boolean;
  nftId: string;
  title: string;
  from: string;
  balance: bigint;
  percentTax: number;
  nftPrice: bigint;

  closeModal: () => void;
};

const BuyModal = ({
  isOpen,
  nftId,
  closeModal,
  title,
  from,
  balance,
  percentTax,
  nftPrice,
}: Props) => {
  const { nfts } = useContext(NftContext);
  const calculatePercentFee = (): bigint => {
    const currentFeeSumm = nftPrice
      ? (Number(nftPrice) * percentTax).toFixed(0)
      : 0n;
    return BigInt(currentFeeSumm);
  };

  // TODO: Include fee in calculation
  const calculateSummPay = () => nftPrice;

  const onCheckout = async () => {
    // TODO: Leave modal open and show transaction status once wallet
    // integration is ready.
    const nft = nfts.getByIpfsHash(nftId);
    if (!nft) {
      console.log(`Problem buying NFT: Nft with id '${nftId}' not found.`);
      return;
    }

    nfts.buy(nft);
    closeModal();
  };

  return (
    <Modal showModal={isOpen} title="Checkout" onClose={closeModal}>
      <div className={styles['modal-content-wrapper']}>
        <h4 className={styles.title}>
          {title}
          <br />
          <span className={styles.from}>from </span>
          <span className={styles.author}>{from}</span>
        </h4>
        <div className={styles['table-wrapper']}>
          <div className={styles['table-row']}>
            <span className={styles['item-name']}>Balance</span>
            <span className={styles['item-value']}>{priceToADA(balance)}</span>
          </div>
          <div className={styles['table-row']}>
            <span className={styles['item-name']}>
              Service fee {percentTax}%
            </span>
            <span className={styles['item-value']}>
              {priceToADA(calculatePercentFee()) || '0 ADA'}
            </span>
          </div>
          <div className={styles['table-row']}>
            <span className={styles['item-name']}>You will pay</span>
            <span className={styles['item-value']}>
              {priceToADA(calculateSummPay()) || '0 ADA'}
            </span>
          </div>
        </div>
        <Button
          label="Checkout"
          color="primary"
          btnClass={styles.button}
          onClick={onCheckout}
        />
      </div>
    </Modal>
  );
};

export default BuyModal;
