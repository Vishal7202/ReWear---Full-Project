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
    throw new Error(
      error?.response?.data?.message ||
      error?.message ||
      "Login failed"
    );
  }
};

// ✅ SIGNUP (FIXED)
export const signupUser = async (data) => {
  try {
    const res = await API.post("/api/auth/register", data); // ✅ FIXED

    return res.data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message ||
      error?.message ||
      "Signup failed"
    );
  }
};

// ✅ LOGOUT
export const logoutUser = async () => {
  try {
    await API.post("/api/auth/logout"); // optional (agar backend me hai)
  } catch (error) {
    console.warn("Logout API failed");
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("rewear_user");
  }
};