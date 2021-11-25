/* eslint-disable */
import styles from './index.module.scss';
import search from '../../../../assets/svg/search.svg';
import arrow from '../../../../assets/svg/arrow-down.svg';

interface Props {
    placeholder: string
}

const SearchInput = ({placeholder} : Props) => {
    return (
        <div className={styles.input}>
            <div className={styles.left}>
            <img src={search} alt="search" />
            <input placeholder={placeholder} />
            </div>
            <img src={arrow} alt="arrow-down"/>
        </div>
    )
}

export default SearchInput
