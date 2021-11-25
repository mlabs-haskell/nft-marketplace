/* eslint-disable */
import ButtonInput from '../../UI/molecules/ButtonInput';
import styles from './index.module.scss';
import instagram from '../../../assets/svg/instagram.svg';
import twitter from '../../../assets/svg/twitter.svg';
import messenger from '../../../assets/svg/messanger.svg';
import meta from '../../../assets/svg/meta.svg';
import youtube from '../../../assets/svg/youtube.svg';
import Dropdown from '../../UI/molecules/Dropdown';

const Footer = () => {
  const option = ["English", "Spanish"]
  return (
    <div className={styles.container}>
      <div className={`${styles.footer} row`}>
        <div className='col-lg-6'>
          <p>Get the latest Seabug updates</p>
          <ButtonInput placeholder="Your Email.:" btnClass={styles.button}/>
          <ul className={styles["social-links"]}>
            <li><img src={instagram} alt="instagram" /></li>
            <li><img src={meta} alt="meta" /></li>
            <li><img src={messenger} alt="messenger" /></li>
            <li><img src={twitter} alt="twitter" /></li>
            <li><img src={youtube} alt="youtube" /></li>
          </ul>
        </div>
        <div className='col-lg-3'>
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
        <div className='col-lg-3'>
          <p>Language</p>
          <Dropdown options={option} />
        </div>
      </div>
      <div className={`${styles["footer-base"]} row`}>
        <div className='col-lg-9'>
          <p>Brought to you by MLabs</p>
        </div>
        <div className={`${styles["footer-text"]} col-lg-3`}>
          <p>
            Terms
            <span>Privacy policy</span>
          </p>
          <p>© Seabug, Inc. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
