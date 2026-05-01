import API from "../config/api";

export const getSmartMatches = async (data) => {
  const res = await API.post("/api/smartmatch", data);
  return res.data;
};