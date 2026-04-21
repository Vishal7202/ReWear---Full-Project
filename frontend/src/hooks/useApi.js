import { useState } from "react";
import toast from "react-hot-toast";

export const useApi = (apiFunc) => {
  const [loading, setLoading] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    try {
      const data = await apiFunc(...args);
      return data;
    } catch (err) {
      const msg = err?.message || "Something went wrong";
      toast.error(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading };
};