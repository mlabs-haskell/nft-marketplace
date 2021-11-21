import classNames from 'classnames';
// import {useState} from 'react'
import Box from '../../atoms/Box';
import styles from './index.module.scss';

interface Props {
    children: any;
    title: string;
    showModal: boolean;
    onClose: () => void;
    modalClass?: string;
}

const Modal = ({children, title, onClose, showModal, modalClass}:Props) => {
    // const [modal, setModal] = useState(showModal);
    return (
        <>
            {showModal &&
                <div className={classNames([styles.container, modalClass])}>
                    <Box boxClass={styles.box}>
                        <h3>{title}</h3>
                        {children}
                    </Box>
                </div>
            }
        </>
    )
}

export default Modal
