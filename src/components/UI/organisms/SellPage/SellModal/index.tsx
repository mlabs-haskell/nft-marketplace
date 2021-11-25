/* eslint-disable */
import Button from '../../../atoms/Button';
import Input from '../../../atoms/Input';
import Dropdown from '../../../molecules/Dropdown';
import Modal from '../../../molecules/Modal';
import styles from './index.module.scss';


type Props = {
    display:boolean,
    handleParentFunction:() => void
};

function SellModal({display,handleParentFunction}:Props) {
    return(
        <Modal showModal={display} title="Open Auction" onClose={handleParentFunction}>
            <div className={styles.body}>
                {/* <div className={styles.box}>
                    <p className={styles.title}>Description</p>
                    <Input textarea placeholder="Write your description" textClass={styles.description} />
                </div> */}
                <p className={styles.title}>Minimum Bid</p>
                <div className={styles.inputBox}>
                    <Input placeholder="Enter Bid" textClass={styles.input}/>
                    <Dropdown options={['ADA']} dropdownClass={styles.dropdown} infoText="ada" />
                </div>
                <p className={styles.title}>Expiration Date</p>
                <div className={styles.inputBox}>
                    <Input placeholder="Enter Bid" textClass={styles.input}/>
                    <Dropdown options={['ADA']} dropdownClass={styles.dropdown}  infoText="ada" />
                </div>
                <div className={styles.button}>
                    <Button label="Post Listing" color="primary" btnClass={styles.btn}/>
                </div>
            </div>
        </Modal>
    )
}

export default SellModal;