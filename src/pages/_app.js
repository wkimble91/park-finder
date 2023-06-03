import '@/styles/globals.css';
import React from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
