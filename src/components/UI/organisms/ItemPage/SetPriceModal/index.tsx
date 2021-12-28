import Input from 'components/UI/atoms/Input';
import toast from 'react-hot-toast';
import { NftContext } from 'context/NftContext';
import { useContext, useState } from 'react';
import { priceToADA } from 'utils/priceToADA';
import ToLovelace from 'components/Util/ToLovelace';
import Button from '../../../atoms/Button';
import Modal from '../../../molecules/Modal';
import styles from './index.module.scss';
import Dropdown from '../../../molecules/Dropdown';

type Props = {
  isOpen: boolean;
  nftId: string;
  title: string;
  from: string;
  nftPrice: bigint;

  closeModal: () => void;
};

const SetPriceModal = ({
  isOpen,
  nftId,
  closeModal,
  title,
  from,
  nftPrice,
}: Props) => {
  const { nfts } = useContext(NftContext);
  const [newPrice, setNewPrice] = useState<number>(0);
  const onChangePrice = async () => {
    nfts.setPrice({
      nftId: { contentHash: nftId },
      price: ToLovelace(Math.ceil(newPrice)),
    });
    toast.success('price changed successfully');
    closeModal();
  };

  const handleOnChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPrice(parseFloat(e.target.value));
  };

  return (
    <Modal showModal={isOpen} title="Chage Price" onClose={closeModal}>
      <div className={styles['modal-content-wrapper']}>
        <h4 className={styles.title}>
          {title}
          <br />
          <span className={styles.from}>from </span>
          <span className={styles.author}>{from}</span>
        </h4>
        <div className={styles['table-wrapper']}>
          <div className={styles['table-row']}>
            <span className={styles['item-name']}> Current Price: </span>
            <span className={styles['item-value']}>{priceToADA(nftPrice)}</span>
          </div>
          <div className={styles['input-box']}>
            <Input
              placeholder="New price"
              textClass={styles.input}
              type="number"
              onChange={handleOnChangeInput}
            />
            <Dropdown options={['ADA']} dropdownClass={styles.dropdown} />
          </div>
        </div>
        <Button
          label="Change Price"
          color="primary"
          btnClass={styles.button}
          onClick={onChangePrice}
        />
      </div>
    </Modal>
  );
};

export default SetPriceModal;
