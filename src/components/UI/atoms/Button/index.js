import React from 'react';
import styles from './index.module.scss';
import classNames from 'classnames';

const Button = ({ label, size, disabled, color, btnClass, onClick, style, ...props }) => {
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

  return <button className={classNames([styles.button, sizeClass, colorClass, disabledClass, btnClass])} onClick={onClick} style={style} {...props}>{label}</button>;
};

export default Button;
