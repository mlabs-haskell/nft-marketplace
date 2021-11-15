import React from 'react';
import classNames from 'classnames'
import styles from './index.module.scss';

interface InputProps {
  placeholder: string,
  textClass?: string
}

const Input = ({placeholder, textClass}:InputProps) => {
  return <input placeholder={placeholder} className={classNames([styles.input, textClass])} />;
};

export default Input;
