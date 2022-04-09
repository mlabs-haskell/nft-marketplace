import { NftContext } from 'context/NftContext';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { BuyParams } from 'seabug-sdk/src/buy';
import { priceToADA } from 'utils/priceToADA';
import Button from '../../../atoms/Button';
import Modal from '../../../molecules/Modal';
import styles from './index.module.scss';

type Props = {
  isOpen: boolean;
  nftId: string;
  title: string;
  from: string;
  balance: number;
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
  const calculatePercentFee = () => {
    const currentFeeSumm = nftPrice
      ? (Number(nftPrice) * percentTax).toFixed(0)
      : 0;
    return BigInt(currentFeeSumm);
  };

  const calculateSummPay = () => {
    const summPay = nftPrice ? calculatePercentFee() + nftPrice : 0;
    return BigInt(summPay);
  };

  const onCheckout = async () => {
    // TODO: Leave modal open and show transaction status once wallet
    // integration is ready.
    const nft = nfts.getById(nftId);
    if (!nft) {
      console.log(`Problem buying NFT: Nft with id '${nftId}' not found.`);
      return;
    }

    nfts.buy(nft.metadata);
    toast.success('Transaction Complete');
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
            <span className={styles['item-value']}>{balance} ADA</span>
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
