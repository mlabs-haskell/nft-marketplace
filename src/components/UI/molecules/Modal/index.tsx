import classNames from 'classnames';
import {useEffect} from 'react'
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

  useEffect(() => {
    const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, [onClose]);

    return (
        <>
            {showModal &&
                <div className={classNames([styles.container, modalClass])} onClick={onClose}>
                    <Box boxClass={styles.box} onClick={(e: React.SyntheticEvent) => {e.stopPropagation();}}>
                        <h3>{title}</h3>
                        {children}
                    </Box>
                </div>
            }
        </>
    )
}

export default Modal
