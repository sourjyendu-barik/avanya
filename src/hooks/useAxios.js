import { useState, useEffect } from "react";
import api from "../api";

const useAxios = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) {
      return;
    }

    setLoading(true);
    setError(null);

    api
      .get(url)
      .then((res) => setData(res.data))
      .catch((er) => setError(er))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};

export default useAxios;
