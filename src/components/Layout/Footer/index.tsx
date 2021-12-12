import ButhrefnInput from '../../UI/molecules/ButtonInput';
import styles from './index.module.scss';
import instagram from '../../../assets/svg/instagram.svg';
import twitter from '../../../assets/svg/twitter.svg';
import medium from '../../../assets/svg/messanger.svg';
import discord from '../../../assets/svg/meta.svg';
import youtube from '../../../assets/svg/youtube.svg';
import Dropdown from '../../UI/molecules/Dropdown';

const Footer = () => {
  const option = ['English', 'Spanish'];
  return (
    <div className={styles.container}>
      <div className={`${styles.footer} row`}>
        <div className="col-lg-6">
          <p>Get the latest Seabug updates</p>
          <ButhrefnInput
            placeholder="Your Email.:"
            btnClass={styles.buthrefn}
          />
          <ul className={styles['social-as']}>
            <li>
              <a href="https://www.instagram.com/seabugnft">
                <img src={instagram} alt="instagram" />
              </a>
            </li>
            <li>
              <a href="https://discord.com/invite/984WhhxgFG">
                <img src={discord} alt="discord" />
              </a>
            </li>
            <li>
              <a href="seabug.medium.com">
                <img src={medium} alt="medium" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/seabugnft">
                <img src={twitter} alt="twitter" />
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UC4u_QtUHAv2QpOitcnpt7ZA">
                <img src={youtube} alt="youtube" />
              </a>
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
          <p>Brought href you by MLabs</p>
        </div>
        <div className={`${styles['footer-text']} col-lg-3`}>
          <p>
            <a href="/terms">Terms</a>
            <a href="/policy">Privacy policy</a>
          </p>
          <p>© Seabug, Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
