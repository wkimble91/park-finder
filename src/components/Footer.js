import React from 'react';
import styles from '@/styles/Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBox}>
        <div className={styles.footerCopyright}>
          <div className={styles.footerLogo}></div>
          <p>
            Designed and Hand Coded by{' '}
            <a href='https://willkimble.com' target='_blank'>
              Will Kimble
            </a>{' '}
            <span>Copyright &copy; 2022 - Present</span>
          </p>
        </div>
        <p className={styles.footerAcknowledgment}>
          Thanks to the{' '}
          <a
            href='https://www.nps.gov/subjects/developer/index.htm'
            target='_blank'
          >
            NPS
          </a>{' '}
          for access to their free API
        </p>
      </div>
    </footer>
  );
};
