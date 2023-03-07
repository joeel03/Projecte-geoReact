import { useState } from 'react';
import { useEffect } from 'react';

export function useFetch(initialUrl, initialOptions) {
  const [url, setUrl] = useState(initialUrl);  
  const [options, setOptions] = useState(initialOptions);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);


  useEffect(() => {
    //setLoading(true);
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

  // if (options.method=="DELETE"){
  //   setRefresh(!refresh)
  // }

  const reRender = () => {

      setRefresh(!refresh)
  }
  

  return { data, error, loading, reRender, setUrl, setOptions };
}