import classNames from 'classnames';
import styles from './index.module.scss';

interface InputProps {
  placeholder: string;
  textClass?: string;
  type?: 'text' | 'number';
  textarea?: boolean;
}

const Input = ({ placeholder, textClass, type, textarea }: InputProps) => (
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
      />
    )}
  </>
);

export default Input;
