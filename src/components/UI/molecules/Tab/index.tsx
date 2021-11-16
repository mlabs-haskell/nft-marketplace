import React, { Children } from 'react';
import Box from '../../atoms/Box';
import styles from './index.module.scss';

interface Props {
    tabs: string[];
    children: any;
}

const Tab = ({tabs, children}:Props) => {
    return (
        <Box boxClass={styles.container}>
            <ul className={styles["tab-container"]}>
                {tabs.map((tab, index) => (
                    <li key={index}>{tab}</li>
                ))}
                <li className={styles["active-tab"]}>hello</li>
            </ul>
            {children}
        </Box>
    )
}

export default Tab
