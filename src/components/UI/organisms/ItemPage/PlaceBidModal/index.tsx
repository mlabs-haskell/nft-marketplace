import { NftContext } from 'context/NftContext';
import toast from 'react-hot-toast';
import Input from 'components/UI/atoms/Input';
import Dropdown from 'components/UI/molecules/Dropdown';
import { useContext, useState } from 'react';
import { AuctionBidParams } from 'seabug-sdk/src/auction';
import ToLovelace from 'components/Util/ToLovelace';
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
  const [bid, setBid] = useState<number>(0);
  const calculatePercentFee = () => {
    const currentFeeSumm = bid ? (bid * percentTax).toFixed(0) : 0;
    return currentFeeSumm;
  };

  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBid(parseFloat(e.target.value));
  };

  const calculateSummPay = () => {
    const summPay = bid ? Number(calculatePercentFee()) + bid : 0;
    return summPay;
  };

  const onPlaceBid = async () => {
    const data: AuctionBidParams = {
      nftId: {
        contentHash: nftId,
      },
      bidAmount: ToLovelace(Math.ceil(bid)),
    };

    nfts.bid(data);
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
              {calculatePercentFee() || '0 ADA'}
            </span>
          </div>
          <div className={styles['table-row']}>
            <span className={styles['item-name']}>You will pay</span>
            <span className={styles['item-value']}>
              {`${calculateSummPay()} ADA` || '0 ADA'}
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
