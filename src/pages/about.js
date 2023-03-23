import Head from 'next/head';
import Image from 'next/image';
import { Navbar } from '@/components/Navbar.js';
import { Footer } from '@/components/Footer.js';
import { Inter } from 'next/font/google';
import styles from '@/styles/About.module.css';

const inter = Inter({ subsets: ['latin'] });
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function Home() {
  return (
    <>
      <Head>
        <title>Park Finder | About</title>
      </Head>
      <Navbar />

      <main className={styles.hero}>
        <div className={styles.heroHeaderContainer}>
          <h1 className={styles.heroHeader}>About Us</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
