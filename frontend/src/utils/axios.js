import axios from "axios";
import toast from "react-hot-toast";

// ================= BASE =================
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ================= REQUEST =================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= REFRESH TOKEN =================
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

// ================= RESPONSE =================
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    const status = error?.response?.status;

    // ❌ avoid refresh loop
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // 🔄 TOKEN EXPIRED → REFRESH FLOW
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // ⏳ Already refreshing → queue request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
              };
              resolve(API(originalRequest));
            },
            reject: (err) => reject(err),
          });
        });
      }

      isRefreshing = true;

      try {
        // ✅ SAME INSTANCE USE (IMPORTANT FIX)
        const res = await API.post("/api/auth/refresh");
        const newToken = res.data?.token;

        if (!newToken) throw new Error("No token returned");

        // 💾 Save token
        localStorage.setItem("token", newToken);

        // 🔁 Resolve queued requests
        processQueue(null, newToken);

        // 🔁 Retry original request
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };

        return API(originalRequest);

      } catch (err) {
        processQueue(err, null);

        localStorage.removeItem("token");
        localStorage.removeItem("rewear_user");

        if (!window.location.pathname.includes("/login")) {
          toast.error("Session expired. Please login again.");
          window.location.href = "/login";
        }

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    // 🚫 Forbidden
    if (status === 403) {
      if (!window.location.pathname.includes("/unauthorized")) {
        toast.error("Access denied");
        window.location.href = "/unauthorized";
      }
    }

    // ⚠️ Server Error
    if (status >= 500) {
      toast.error("Server error. Try again later.");
    }

    // 🌐 Network Error
    if (!error.response) {
      toast.error("Network error. Check your connection.");
    }

    return Promise.reject(error);
  }
);

export default API;