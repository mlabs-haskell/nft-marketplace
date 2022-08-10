/*eslint-disable  */
import Box from 'components/UI/atoms/Box';
import { truncatePubKeyHash } from 'components/Util/TruncateKey';
import { useWalletContext } from 'context/WalletContext';
import { connect } from 'http2';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { WalletOption } from 'seabug-contracts';
import logo from '../../../assets/svg/navIcons/logo.svg';
import walletIcon from '../../../assets/svg/navIcons/wallet.svg';
import SearchInput from '../../UI/molecules/SearchInput';
import styles from './index.module.scss';

function NavBar() {
  const wallet =
    useWalletContext();

  const [walletsPubKeyHashes, setWalletsPubKeyHashes] = useState<string[]>([]);
  const [connectedWallet, setConnectedWallet] = useState(false);
  const [showWallets, setShowWallets] = useState(false);

  const handleWalletSelection = (walletOption: WalletOption) => {
    wallet.connect(walletOption);
    setShowWallets(false);
  };

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
          <li>
            <NavLink
              className={styles.nav}
              to="/help"
              activeClassName={`${styles['active-nav']} active-nav`}
            >
              Help
            </NavLink>
          </li>
        </ul>
        <ul className={styles['wallet-list']}>
          {/* <li>
          <img src={person} alt="profile" />
        </li> */}
          <li className={`${styles['wallet-icon']}`}>
            <div
              className={`${styles['wallet-wrapper']}`}
              role="presentation"
              onClick={() => setShowWallets(!showWallets)}
            >
              <img src={walletIcon} alt="wallet" />
              {connectedWallet &&
                <p className={`${styles['wallet-name']}`}>
                  {walletsPubKeyHashes.length !== 0 && connectedWallet
                  ? truncatePubKeyHash(walletsPubKeyHashes[0], 5)
                  : ''}
                </p>
              } 
            </div>
            {showWallets ? (
              <Box boxClass={styles.option}>
                <ul role="presentation">
                  <li
                    onClick={() => handleWalletSelection('Nami')}
                  >
                    Nami
                  </li>
                  <li
                    onClick={() => handleWalletSelection('Gero')}
                  >
                    Gero
                  </li>
                </ul>
              </Box>
            ) : (
              ''
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
