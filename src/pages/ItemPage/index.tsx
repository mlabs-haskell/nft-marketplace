import {useState} from 'react'
import Box from '../../components/UI/atoms/Box';
import Tab from '../../components/UI/molecules/Tab';
import styles from './index.module.scss';

const ItemPage = () => {
    const [active, setActive] = useState('owners');
    const tabs = ['owners', 'Bids', 'History'];

    return (
        <Box boxClass={styles.container}>
            <div className={styles["tab-container"]}>
            {tabs.map((tab, index) => (
                <Tab
                    key={index}
                    title={tab}
                    onClick={() => setActive(tab)}
                    active= {active === tab}
                />
            ))}
            </div>
            <div className={styles.content}>
            {active === 'owners' && <p>hi</p>}
            {active === 'Bids' && <p>bye</p>}
            </div>
        </Box>
    )
}

export default ItemPage
