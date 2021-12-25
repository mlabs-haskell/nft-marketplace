import Dropdown from 'components/UI/molecules/Dropdown';
import { truncatePubKeyHash } from 'components/Util/TruncateKey';
import { useWalletContext, WalletName } from 'context/WalletContext';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/svg/navIcons/logo.svg';
import wallet from '../../../assets/svg/navIcons/wallet.svg';
import SearchInput from '../../UI/molecules/SearchInput';
import styles from './index.module.scss';

function NavBar() {
  const { wallets, connect, connected, fetchWallets, getPubKeyHashes } =
    useWalletContext();

  const [walletsPubKeyHashes, setWalletsPubKeyHashes] = useState<string[]>([]);
  const [connectedWallet, setConnectedWallet] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      fetchWallets();
    };
    fetch();
  }, []);

  useEffect(() => {
    // TODO
    const refreshPubKey = async () => {
      const pubKeyHashes = await getPubKeyHashes();
      setWalletsPubKeyHashes(pubKeyHashes);
    };
    refreshPubKey();
  }, [connected]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <img className={styles['logo-icon']} src={logo} alt="seabug" />
        </Link>
        <SearchInput placeholder="Search" />
      </div>
      <div className={styles['nav-links']}>
        <ul className={styles.list}>
          <li>
            <NavLink
              exact
              className={styles.nav}
              to="/"
              activeClassName={`${styles['active-nav']} active-nav`}
            >
              Explore
            </NavLink>
          </li>
          {/* <li><NavLink className={styles.nav} to="/explore" activeClassName={`${styles['active-nav']} active-nav`}>Create</NavLink></li> */}
          <li>
            <NavLink
              className={styles.nav}
              to="/help"
              activeClassName={`${styles['active-nav']} active-nav`}
            >
              Help
            </NavLink>
          </li>
          {/* <li><Button label="Sign In" color="primary"/></li> */}
        </ul>
        <ul className={styles['wallet-list']}>
          {/* <li>
          <img src={person} alt="profile" />
        </li> */}
          <li className={`${styles['wallet-icon']}`}>
            <div className={`${styles['wallet-wrapper']}`}>
              <img src={wallet} alt="wallet" />
              <p className={`${styles['wallet-name']}`}>
                {walletsPubKeyHashes.length !== 0 && connectedWallet
                  ? truncatePubKeyHash(walletsPubKeyHashes[0], 5)
                  : ''}
              </p>
            </div>
            {wallets && (
              <Dropdown
                options={wallets}
                dropdownClass={
                  connectedWallet ? styles['dropdown-active'] : styles.dropdown
                }
                handleParentFunction={(item: string) => {
                  //  TODO
                  item === 'TEST'
                    ? setConnectedWallet(true)
                    : setConnectedWallet(false);
                  connect(item);
                }}
              />
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
