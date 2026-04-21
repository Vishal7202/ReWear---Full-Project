import API from "@/utils/axios";

export const getSmartMatches = async () => {
  const res = await API.get("/api/smartmatch");
  return res.data;
};