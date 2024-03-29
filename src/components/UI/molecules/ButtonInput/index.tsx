import classNames from 'classnames';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import styles from './index.module.scss';

interface Props {
  placeholder: string;
  btnClass?: string;
}

const ButtonInput = ({ placeholder, btnClass }: Props) => (
  <div className={classNames([styles.container], btnClass)}>
    <Input placeholder={placeholder} textClass={styles['input-box']} />
    <Button label="send" size="small" color="primary" btnClass={btnClass} />
  </div>
);

export default ButtonInput;
