import API from "@/utils/axios";

// ✅ FIXED
export const getListings = async () => {
  const res = await API.get("/api/listings");
  return res.data.listings; // ⭐ direct array return
};

export const createListing = async (data) => {
  const res = await API.post("/api/listings", data);
  return res.data;
};