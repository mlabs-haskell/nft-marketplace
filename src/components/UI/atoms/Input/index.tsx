import classNames from 'classnames';
import styles from './index.module.scss';

interface InputProps {
  placeholder: string;
  textClass?: string;
  type?: 'text' | 'number';
  textarea?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  placeholder,
  textClass,
  type,
  value,
  textarea,
  onChange,
}: InputProps) => (
  <>
    {textarea ? (
      <textarea
        className={classNames(styles.input, textClass)}
        placeholder={placeholder}
      />
    ) : (
      <input
        placeholder={placeholder}
        className={classNames([styles.input, textClass])}
        type={type}
        value={value}
        onChange={(e) => (onChange ? onChange(e) : {})}
      />
    )}
  </>
);

export default Input;
