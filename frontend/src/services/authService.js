import API from "@/utils/axios";

// ✅ LOGIN
export const loginUser = async (data) => {
  try {
    const res = await API.post("/api/auth/login", data);

    if (!res.data?.token || !res.data?.user) {
      throw new Error("Invalid login response");
    }

    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Login failed";

    throw new Error(message);
  }
};

// ✅ SIGNUP (MISSING FIX)
export const signupUser = async (data) => {
  try {
    const res = await API.post("/api/auth/signup", data);
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Signup failed";

    throw new Error(message);
  }
};

// ✅ LOGOUT
export const logoutUser = async () => {
  try {
    await API.post("/api/auth/logout");
  } catch (error) {
    console.warn("Logout API failed:", error?.response?.data);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("rewear_user");
  }
};