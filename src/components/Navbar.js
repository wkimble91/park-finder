import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';

export const Navbar = () => {
  return (
    <header className={styles.header}>
      <Link
        href='/'
        rel='home'
        aria-label='Top of page link'
        className={styles.headerLogo}
        target='_parent'
      ></Link>

      <nav>
        <ul id='navigation' className={styles.header__nav}>
          <li className={styles.header__navItem}>
            <a href='https://www.nps.gov/' target='_blank'>
              NPS Website
            </a>
          </li>
        </ul>
        <div id='header__hamburger' className={styles.header__hamburger}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </nav>
    </header>
  );
};
