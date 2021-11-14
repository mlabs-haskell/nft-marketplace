import React from 'react'
import Button from '../../atoms/Button';
import Input from '../../atoms/Input';
import styles from './index.module.scss'

function ButtonInput({text}) {
    return (
        <div className={styles.container}>
            <Input text={text} textClass={styles["input-box"]}/>
            <Button label="send" size="small" color="primary"/>
        </div>
    )
}

export default ButtonInput
