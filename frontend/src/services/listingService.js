import API from "@/utils/axios";

export const getListings = async () => {
  const res = await API.get("/api/listings");
  return res.data;
};

export const createListing = async (data) => {
  const res = await API.post("/api/listings", data);
  return res.data;
};