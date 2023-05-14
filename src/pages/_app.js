import '@/styles/globals.css';
import React, { useState } from 'react';
import Head from 'next/head';
import useFetchParkData from '@/services/useFetchParkData.js';
import $ from 'jquery';

export default function App({ Component, pageProps }) {
  const [parkData, setParkData] = useState(null);
  const [selectedParkCode, setSelectedParkCode] = useState('');
  const [selectedParkData, setSelectedParkData] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const { data, loading, error, setLoading } = useFetchParkData(
    `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${API_KEY}`
  );

  if (error) return <h1>error</h1>;

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <Component
        allData={data}
        setParkData={setParkData}
        parkData={parkData}
        setSelectedParkData={setSelectedParkData}
        selectedParkData={selectedParkData}
        selectedParkCode={selectedParkCode}
        setSelectedParkCode={setSelectedParkCode}
      />
    </>
  );
}
