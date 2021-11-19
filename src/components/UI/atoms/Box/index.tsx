import React from 'react';
import classNames from 'classnames';
import styles from './index.module.scss'

interface BoxProps {
  boxClass?: string | string[],
  children?: any
  style?: any
}

const Box = ({ children, boxClass, style }:BoxProps) => {
    return (
        <div className={classNames([styles.container, boxClass])} style={style ? style : null}>
            {children}
        </div>
    )
}

export default Box
