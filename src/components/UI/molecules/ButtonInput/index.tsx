import classNames from 'classnames';
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import styles from './index.module.scss';

interface Props {
  placeholder: string;
  btnClass?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: () => void;
}

const ButtonInput = ({
  placeholder,
  btnClass,
  value,
  onChange,
  onSubmit,
}: Props) => (
  <div className={classNames([styles.container], btnClass)}>
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      textClass={styles['input-box']}
    />
    <Button
      label="send"
      size="small"
      color="primary"
      btnClass={btnClass}
      onClick={onSubmit}
    />
  </div>
);

export default ButtonInput;
