import '@/styles/globals.css';
import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Script src='https://getinsights.io/js/insights.js' defer></Script>
      <Script id='getInsights-script' defer>
        insights.init('Q4aXnJtuMFDfixwb'); insights.trackPages();
      </Script>
    </>
  );
}
