import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  useEffect(() => {
    let abortController = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (response.status !== 200) {
          setError(new Error(`API Error: status code ${response.status}`));
        } else {
          const json = await response.json();
          setData(json);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [url]);
  return { loading, error, data };
};
