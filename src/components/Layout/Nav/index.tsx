import React from 'react';
import person from '../../../assets/svg/navIcons/person-icon.svg';
import wallet from '../../../assets/svg/navIcons/wallet-icon.svg';
import Button from '../../UI/atoms/Button';
import styles from './index.module.scss';

const NavBar = () => {
  return (
    <div className={styles.container}>
      <div>
        <h4>NFTLabs</h4>
      </div>
      <div className={styles["nav-links"]}>
        <ul>
          <li>Explore</li>
          <li>Create</li>
          <li>Help</li>
          <li><Button label="Sign In" color="primary"/></li>
        </ul>
        <ul className={styles.icon}>
          <li>
            <img src={person} alt="profile" />
          </li>
          <li>
            <img src={wallet} alt="wallet" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
