import API from "@/utils/axios";

// ✅ LOGIN
export const loginUser = async (data) => {
  try {
    const res = await API.post("/api/auth/login", data);

    // safety check
    if (!res.data?.token || !res.data?.user) {
      throw new Error("Invalid login response");
    }

    return res.data;
  } catch (error) {
    throw error?.response?.data || "Login failed";
  }
};

// ✅ LOGOUT
export const logoutUser = async () => {
  try {
    await API.post("/api/auth/logout");
  } catch (error) {
    // even if API fails → logout anyway (important)
    console.warn("Logout API failed:", error?.response?.data);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("rewear_user");
  }
};