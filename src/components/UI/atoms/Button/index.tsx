/* eslint-disable */
import styles from './index.module.scss';
import classNames from 'classnames';

interface ButtonProps {
  label: string,
  size?: string,
  disabled?: string,
  color?: string,
  btnClass?: string,
  onClick?: () => void,
  style?: string
}

const Button = ({ label, size, disabled, color, btnClass, onClick, style } : ButtonProps) => {
  let sizeClass = '';
  let disabledClass = '';
  let colorClass = '';

  // set size class
  if (size !== 'normal') {
    sizeClass = styles[`button--${size}`];
  }

  // set disabled class
  if (disabled) {
    disabledClass = styles['button--disabled'];
  }

  // set color class
  if (color !== 'dark') {
    colorClass = styles[`button--${color}`];
  }

  return <button className={classNames([styles.button, sizeClass, colorClass, disabledClass, btnClass])} onClick={onClick}>{label}</button>;
};

export default Button;
