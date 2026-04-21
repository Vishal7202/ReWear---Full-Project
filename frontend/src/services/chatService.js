import API from "@/utils/axios";

export const getMessages = async () => {
  const res = await API.get("/api/chat");
  return res.data;
};