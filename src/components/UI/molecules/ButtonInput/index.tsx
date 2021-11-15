import React from 'react'
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import styles from './index.module.scss'

interface Props {
    placeholder: string,
}

function ButtonInput({placeholder}: Props) {
    return (
        <div className={styles.container}>
            <Input placeholder={placeholder} textClass={styles["input-box"]}/>
            <Button label="send" size="small" color="primary"/>
        </div>
    )
}

export default ButtonInput
