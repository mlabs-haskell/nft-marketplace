import Input from 'components/UI/atoms/Input';
import { NftContext } from 'context/NftContext';
import { useContext, useEffect, useState } from 'react';
import { BuyParams } from 'seabug-sdk/src/buy';
import { InformationNft } from 'seabug-sdk/src/common';
import { priceToADA } from 'utils/priceToADA';
import Button from '../../../atoms/Button';
import Modal from '../../../molecules/Modal';
import styles from './index.module.scss';

type Props = {
  isOpen: boolean;
  nftId: string;
  title: string;
  from: string;
  nftPrice: bigint;

  closeModal: () => void;
};

const ModalDialog = ({
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
      price: BigInt(Math.ceil(newPrice)),
    });
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
            <span>New Price</span>
            <Input
              placeholder="New price"
              textClass={styles.input}
              type="number"
              onChange={handleOnChangeInput}
            />
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

export default ModalDialog;
