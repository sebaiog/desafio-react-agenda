import { useState, useEffect } from "react";

// Funcion para rescatar la lista de usuarios
function useFetch(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Could not fetch data");
        }
        const data = await res.json();
        setData(data);
        setError(null);
      } catch (err) {
        //setError(err.message);
        console.error(err);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  const refetch = async () => {
    setIsPending(true);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Could not fetch data");
      }
      const data = await res.json();
      setData(data);
      setError(null);
    } catch (err) {
      //setError(err.message);
      console.error(err);
    } finally {
      setIsPending(false);
    }
  };

  return { data, isPending, error, refetch };
}

export default useFetch;
