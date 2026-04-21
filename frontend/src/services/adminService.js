import API from "@/utils/axios";

export const getAllUsers = async () => {
  const res = await API.get("/api/admin/users");
  return res.data;
};

export const deleteListing = async (id) => {
  const res = await API.delete(`/api/admin/listings/${id}`);
  return res.data;
};