import React from 'react';
import ButtonInput from '../../UI/molecules/ButtonInput';
import styles from './index.module.scss';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.footer} row`}>
        <div className='col-lg-6'>
          <p>Get the latest Rarible updates</p>
          <ButtonInput/>
        </div>
        <div className='col-lg-4'>
          <p>Rarible</p>
          <ul>
            <li>Explore</li>
            <li>Help center</li>
            <li>Blog</li>
            <li>Jobs21</li>
            <li>Become a partner</li>
            <li>Bug bounty</li>
          </ul>
        </div>
        <div className='col-lg-2'>
          <p>Community</p>
          <ul>
            <li>RARI Token</li>
            <li>Discussion</li>
            <li>Voting</li>
            <li>Suggest feature</li>
            <li>Rarible protocol</li>
            <li>Subscribe</li>
          </ul>
        </div>
      </div>
      <div className={`${styles["footer-base"]} row`}>
        <div className='col-lg-6'>
          <p>
            Terms
            <span>Privacy policy</span>
          </p>
        </div>
        <div className='col-lg-4'>
          <p>© Rarible, Inc. All rights reserved.</p>
        </div>
        <div className='col-lg-2'>
          <p>
            Language <span className={styles.language}>En</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
