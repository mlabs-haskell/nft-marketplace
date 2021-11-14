import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss'

const Box = ({children, boxClass, color}) => {
    let colorClass = '';

  // set size class
  if (color !== 'dark') {
    colorClass = styles[`button--${color}`];
  }
    return (
        <div className={classNames([styles.container, boxClass, colorClass])}>
            {children}
        </div>
    )
}

export default Box
