import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/svg/navIcons/logo.svg';
import wallet from '../../../assets/svg/navIcons/wallet.svg';
import SearchInput from '../../UI/molecules/SearchInput';
import styles from './index.module.scss';

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <img className={styles["logo-icon"]} src={logo} alt="seabug" />
        </Link>
        <SearchInput placeholder="Search" />
      </div>
      <div className={styles["nav-links"]}>
        <ul>
          <li> <NavLink exact className={styles.nav} to="/" activeClassName={`${styles['active-nav']} active-nav`}>Explore</NavLink></li>
          {/* <li><NavLink className={styles.nav} to="/explore" activeClassName={`${styles['active-nav']} active-nav`}>Create</NavLink></li> */}
          <li><NavLink className={styles.nav} to="/help" activeClassName={`${styles['active-nav']} active-nav`}>Help</NavLink></li>
          {/* <li><Button label="Sign In" color="primary"/></li> */}
        </ul>
        <ul>
          {/* <li>
            <img src={person} alt="profile" />
          </li> */}
          <li className={`${styles['wallet-icon']}`}>
            <img src={wallet} alt="wallet" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
