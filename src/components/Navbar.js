import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Navbar.module.css';

const Navbar = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
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
              <Link href='/'>Home</Link>
              <Link href='/about'>About</Link>
              <Link href='/explore'>Explore</Link>
            </li>
          </ul>
          <div id='header__hamburger' className={styles.header__hamburger}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
