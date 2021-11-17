import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss'

interface BoxProps {
  boxClass?: string,
  children?: any
}

const Box = ({ children, boxClass }:BoxProps) => {
    return (
        <div className={classNames([styles.container, boxClass])}>
            {children}
        </div>
    )
}

export default Box
