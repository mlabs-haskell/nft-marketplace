import React from 'react';
import styles from './index.module.scss';


type Props = {
    display:boolean,
    handleParentFunction:() => void
};

function ItemSell({display,handleParentFunction}:Props) {
    return(
        <div className={styles.container} style={{display:`${display ? "block" : "none"}`}}>
            <div className={styles.header}>
               <p>SELL</p>
            </div>
            <div className={styles.body}>
                <div className={styles.box}>
                    <p className={styles.title}>Description</p>
                    <textarea className={styles.description} rows={10} cols={8} placeholder="Write your description"/>
                </div>
                <div className={styles.box}>
                    <p className={styles.title}>Minimum Bid</p>
                    <input className={styles.inputBox} placeholder="Enter Bid"/>
                    <div className={styles.inside}>
                        <div className={styles.iconBox}>
                            <div className={styles.questionMark}></div>
                            <span>ADA</span>
                            <div className={styles.arrowDown}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.box}>
                    <p className={styles.title}>Expiration Date</p>
                    <input className={styles.inputBox} placeholder="Enter Bid"></input>
                    <div className={styles.inside}>
                        <div className={styles.iconBox}>
                            <div className={styles.questionMark}></div>
                            <span>ADA</span>
                            <div className={styles.arrowDown}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.button} onClick={e => handleParentFunction()}>
                    <p>Post Listing</p>
                </div>
            </div>
        </div>
    )
}

export default ItemSell;