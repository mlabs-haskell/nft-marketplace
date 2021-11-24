import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss'

interface BoxProps {
  boxClass?: string | string[],
  children?: any,
  style?: any,
  onClick?: any,
}

const Box = ({ children, boxClass, style, onClick }:BoxProps) => {
    return (
        <div
            className={classNames([styles.container, boxClass])}
            style={style ? style : null}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default Box
