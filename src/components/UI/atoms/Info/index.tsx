import { useState } from 'react';
import question from '../../../../assets/svg/question-mark.svg';
import styles from './index.module.scss';

interface InfoProps {
  infoText?: string;
}

const Info = ({ infoText }: InfoProps) => {
  const [showInfo, setInfo] = useState(false);

  return (
    <div
      className={styles.info}
      role="presentation"
      onClick={() => setInfo(!showInfo)}
    >
      <img src={question} alt="info" />
      {showInfo && <p>{infoText}</p>}
    </div>
  );
};

export default Info;
