import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss'

interface BoxProps {
  boxClass?: string,
  color?: string,
  children?: any
}

const Box = ({children, boxClass, color}:BoxProps) => {
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
