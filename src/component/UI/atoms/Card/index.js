import React from 'react'
import heart from '../../../../assets/svg/heart-icon.svg'
import styles from './index.module.scss'

export function Card(props) {
    

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h4>Defacer#od</h4>
                <div className={styles["span-container"]}>
                    <span className={styles.span}></span>
                    <span className={styles.span}></span>
                    <span className={styles.span}></span>
                </div>
                <div className={styles.absolute}>
                    <p>22:14 Left</p>
                </div>
            </div>
            <div className={styles.footer}>
                <h3>18 ETH <span>1/1</span></h3>
                <div className={styles.bid}>
                    <p>Bid 5,000 DAI</p>
                    <div style={{display: 'flex'}}>
                        <p className={styles["bid-value"]}>167</p>
                        <img src={heart} alt="heart"></img>
                    </div>
                </div>
            </div>

        </div>
    )
}
