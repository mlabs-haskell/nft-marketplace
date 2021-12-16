import classNames from 'classnames';
import styles from './index.module.scss';

interface InputProps {
  placeholder: string;
  textClass?: string;
  type?: 'text' | 'number';
  textarea?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  placeholder,
  textClass,
  type,
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
        onChange={(e) => (onChange ? onChange(e) : {})}
      />
    )}
  </>
);

export default Input;
