import React from 'react';
import classNames from 'classnames'
import styles from './index.module.scss';

const Input = ({text, textClass}) => {
  return <input placeholder={text} className={classNames([styles.input, textClass])} />;
};

export default Input;
