/* eslint-disable */
import styles from './index.module.scss';
import {useState} from 'react';
import question from '../../../../assets/svg/question-mark.svg';

interface InfoProps {
  infoText?: string;
}

const Info = ({ infoText } : InfoProps) => {
    const [showInfo, setInfo] = useState(false);

  return(
      <div className={styles.info}>
        <img src={question} onClick={() => setInfo(!showInfo)} alt="info" />
        { showInfo && <p>{infoText}</p> }
      </div>
  );
};

export default Info;
