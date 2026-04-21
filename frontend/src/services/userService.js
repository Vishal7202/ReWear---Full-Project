import API from "@/utils/axios";

// ✅ Get Profile
export const getProfile = async () => {
  try {
    const res = await API.get("/api/users/my-profile");
    return res.data;
  } catch (error) {
    throw error?.response?.data || "Failed to fetch profile";
  }
};

// ✅ Update Profile
export const updateProfile = async (data) => {
  try {
    const res = await API.put("/api/users/update", data);
    return res.data;
  } catch (error) {
    throw error?.response?.data || "Failed to update profile";
  }
};

// ✅ Upload Profile Image (optional but real-world needed)
export const uploadProfileImage = async (formData) => {
  try {
    const res = await API.post("/api/users/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    throw error?.response?.data || "Image upload failed";
  }
};

// ✅ Delete Account (optional)
export const deleteAccount = async () => {
  try {
    const res = await API.delete("/api/users/delete");
    return res.data;
  } catch (error) {
    throw error?.response?.data || "Delete account failed";
  }
};