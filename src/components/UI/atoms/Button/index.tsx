import classNames from 'classnames';
import styles from './index.module.scss';

interface ButtonProps {
  label: string;
  size?: string;
  disabled?: string;
  color?: string;
  btnClass?: string;
  onClick?: () => void;
}

const Button = ({
  label,
  size,
  disabled,
  color,
  btnClass,
  onClick,
}: ButtonProps) => {
  let sizeClass = '';
  let disabledClass = '';
  let colorClass = '';

  if (size) {
    sizeClass = styles[`button--${size}`];
  }

  if (disabled) {
    disabledClass = styles['button--disabled'];
  }

  if (color) {
    colorClass = styles[`button--${color}`];
  }

  return (
    <button
      type="button"
      className={classNames([
        styles.button,
        sizeClass,
        colorClass,
        disabledClass,
        btnClass,
      ])}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
