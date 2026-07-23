import { useState } from "react";
import api from "../api";

const useAxiosDelete = () => {
  const [delete_data, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteRequest = async (url) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.delete(url);
      setDeleteData(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteRequest, delete_data, loading, error };
};

export default useAxiosDelete;
