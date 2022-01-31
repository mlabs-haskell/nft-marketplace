import { NftContext } from 'context/NftContext';
import toast from 'react-hot-toast';
import Input from 'components/UI/atoms/Input';
import Dropdown from 'components/UI/molecules/Dropdown';
import { useContext, useState } from 'react';
import { BuyParams } from 'seabug-sdk/src/buy';
import { priceToLovelace } from 'utils/priceToLovelace';
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
}: Props) => {
  const { nfts } = useContext(NftContext);
  const [bid, setBid] = useState<bigint>(0);
  const calculatePercentFee = () => {
    const currentFeeSumm = bid ? (Number(bid) * percentTax).toFixed(0) : 0;
    return BigInt(currentFeeSumm);
  };

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBid(BigInt(e.target.value));
  };

  const calculateSummPay = () => {
    const summPay = bid ? calculatePercentFee() + bid : 0;
    return BigInt(summPay);
  };

  const onPlaceBid = async () => {
    const data: BuyParams = {
      nftId: {
        contentHash: nftId,
      },
      price: bid,
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
            onChange={handleBidChange}
          />
          <Dropdown options={['ADA']} dropdownClass={styles.dropdown} />
        </div>
        <div className={styles['table-wrapper']}>
          <div className={styles['table-row']}>
            <span className={styles['item-name']}>Your bidding balnce</span>
            <span className={styles['item-value']}>{balance} ADA</span>
          </div>
          <div className={styles['table-row']}>
            <span className={styles['item-name']}>
              Service fee {percentTax}%
            </span>
            <span className={styles['item-value']}>
              {priceToLovelace(calculatePercentFee()) || '0 Lovelace'}
            </span>
          </div>
          <div className={styles['table-row']}>
            <span className={styles['item-name']}>You will pay</span>
            <span className={styles['item-value']}>
              {priceToLovelace(calculateSummPay()) || '0 Lovelace'}
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
