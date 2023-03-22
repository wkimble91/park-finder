import '@/styles/globals.css';
import React, { useState } from 'react';
import FetchParkData from '@/services/FetchParkData.js';

export default function App({ Component, pageProps }) {
  const [parkData, setParkData] = useState(null);
  const [selectedParkCode, setSelectedParkCode] = useState('');
  const [selectedParkData, setSelectedParkData] = useState([]);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const { data, loading, error, setLoading } = FetchParkData(
    `https://developer.nps.gov/api/v1/parks?limit=500&api_key=${API_KEY}`
  );

  if (error) return <h1>error</h1>;

  return (
    <>
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
