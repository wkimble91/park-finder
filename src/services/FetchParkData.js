import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function fetchParkData(url) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      });
    // .finally(() => {
    //   setLoading(false);
    // });
  }, [url]);

  return { data, loading, error, setLoading };
}
