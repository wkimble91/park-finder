import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBox}>
        <p className={styles.footerAcknowledgment}>
          Thanks to the NPS for access to their free API
        </p>
        <p className={styles.footerCopyright}>
          Designed and Hand Coded by{' '}
          <a href='https://willkimble.com'>Will Kimble</a>{' '}
          <span>Copyright &copy; 2022 - Present</span>
        </p>
      </div>
    </footer>
  );
};
