import { Link } from 'react-router-dom';
import ButtonInput from '../../UI/molecules/ButtonInput';
import styles from './index.module.scss';
import instagram from '../../../assets/svg/instagram.svg';
import twitter from '../../../assets/svg/twitter.svg';
import medium from '../../../assets/svg/messanger.svg';
// import discord from '../../../assets/svg/meta.svg';
import youtube from '../../../assets/svg/youtube.svg';
import Dropdown from '../../UI/molecules/Dropdown';

const Footer = () => {
  const option = ['English', 'Spanish'];
  return (
    <div className={styles.container}>
      <div className={`${styles.footer} row`}>
        <div className="col-lg-6">
          <p>Get the latest Seabug updates</p>
          <ButtonInput placeholder="Your Email.:" btnClass={styles.button} />
          <ul className={styles['social-links']}>
            <li>
              <Link to="https://www.instagram.com/seabugnft">
                <img src={instagram} alt="instagram" />
              </Link>
            </li>
            {/* <li>
              <Link to="https://discord.com/invite/984WhhxgFG">
                <img src={discord} alt="discord" />
              </Link>
            </li> */}
            <li>
              <Link to="seabug.medium.com">
                <img src={medium} alt="medium" />
              </Link>
            </li>
            <li>
              <Link to="https://twitter.com/seabugnft">
                <img src={twitter} alt="twitter" />
              </Link>
            </li>
            <li>
              <Link to="https://www.youtube.com/channel/UC4u_QtUHAv2QpOitcnpt7ZA">
                <img src={youtube} alt="youtube" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-lg-3">
          <p>Seabug</p>
          <ul>
            <li>FAQ - 1</li>
            <li>FAQ - 1</li>
            <li>FAQ - 1</li>
            <li>FAQ - 1</li>
            <li>FAQ - 1</li>
            <li>FAQ - 1</li>
          </ul>
        </div>
        <div className="col-lg-3">
          <p>Language</p>
          <Dropdown options={option} />
        </div>
      </div>
      <div className={`${styles['footer-base']} row`}>
        <div className="col-lg-9">
          <p>Brought to you by MLabs</p>
        </div>
        <div className={`${styles['footer-text']} col-lg-3`}>
          <p>
            <Link to="/terms">Terms</Link>
            <Link to="/policy">Privacy policy</Link>
          </p>
          <p>© Seabug, Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
