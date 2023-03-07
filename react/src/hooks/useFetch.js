import { useState } from 'react';
import { useEffect } from 'react';

export function useFetch(initialUrl, initialOptions = {}) {

  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError(undefined);

    async function fetchData() {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setData(json);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    }
    fetchData();
  }, [url, options,refresh]);

  const reRender = () => {
      setRefresh(!refresh)
    }
    
  return { data, error, loading, setUrl, setOptions, reRender };
}