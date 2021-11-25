import search from '../../../../assets/svg/search.svg';
import arrow from '../../../../assets/svg/arrow-down.svg';
import styles from './index.module.scss';

interface Props {
  placeholder: string;
}

const SearchInput = ({ placeholder }: Props) => (
  <div className={styles.input}>
    <div className={styles.left}>
      <img src={search} alt="search" />
      <input placeholder={placeholder} />
    </div>
    <img src={arrow} alt="arrow-down" />
  </div>
);

export default SearchInput;
