import { NftContext } from 'context/NftContext';
import toast from 'react-hot-toast';
import Input from 'components/UI/atoms/Input';
import Dropdown from 'components/UI/molecules/Dropdown';
import { useContext, useState } from 'react';
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

const PlaceBidModal = ({
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
  const [bid, setBid] = useState<number>(0);

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBid(parseFloat(e.target.value));
  };

  const calculateSummPay = () => {
    const summPay = nftPrice ? calculatePercentFee() + nftPrice : 0;
    return BigInt(summPay);
  };

  const onPlaceBid = async () => {
    const data: BuyParams = {
      nftId: {
        contentHash: nftId,
      },
      price: nftPrice,
      newPrice: undefined,
    };

    // TODO: Leave modal open and show transaction status once wallet
    // integration is ready.
    nfts.buy(data);
    toast.success('Transaction Complete');
    closeModal();
  };

  return (
    <Modal showModal={isOpen} title="Place a bid" onClose={closeModal}>
      <div className={styles['modal-content-wrapper']}>
        <h4 className={styles.title}>
          {title}
          <br />
          <span className={styles.from}>from </span>
          <span className={styles.author}>{from}</span>
        </h4>
        <div className={styles['input-box']}>
          <Input
            placeholder="Enter bid"
            textClass={styles.input}
            type="number"
            onChange={handleOnChangeInput}
          />
          <Dropdown options={['ADA']} dropdownClass={styles.dropdown} />
        </div>
        <div className={styles['table-wrapper']}>
          <div className={styles['table-row']}>
            <span className={styles['item-name']}>Your bidding balnce</span>
            <span className={styles['item-value']}>{balance} ADA</span>
          </div>
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
          label="Place bid"
          color="primary"
          btnClass={styles.button}
          onClick={onPlaceBid}
        />
      </div>
    </Modal>
  );
};

export default PlaceBidModal;
