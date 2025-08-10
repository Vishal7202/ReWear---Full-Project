// File: client/src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "@/utils/axios";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("rewear_user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } catch {
        localStorage.removeItem("rewear_user");
        setLoading(false);
      }
    } else if (token) {
      // If only token exists, fetch profile from backend
      axios
        .get("/api/users/my-profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          localStorage.setItem("rewear_user", JSON.stringify(res.data));
          setUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("rewear_user");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p className="text-center">Checking authentication...</p>;
  }

  // If user not found → redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check
  const userRole = user.role?.toLowerCase() || "user";
  const isAllowed =
    allowedRoles.length === 0 || allowedRoles.includes(userRole);

  if (!isAllowed) {
    if (userRole === "admin") {
      const adminRedirects = {
        "/profile": "/admin-profile",
        "/my-listings": "/manage-listings",
        "/my-requests": "/manage-requests",
      };
      const target = adminRedirects[location.pathname];
      if (target) {
        return <Navigate to={target} replace />;
      }
    }
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
