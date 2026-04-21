import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getProfile } from "@/services/userService";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let isMounted = true; // ✅ memory leak fix

    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("rewear_user");

      if (!token) {
        if (isMounted) setLoading(false);
        return;
      }

      // ✅ Use cached user
      if (storedUser) {
        try {
          if (isMounted) setUser(JSON.parse(storedUser));
          setLoading(false);
          return;
        } catch {
          localStorage.removeItem("rewear_user");
        }
      }

      // 🔄 Fetch from backend
      try {
        const data = await getProfile();

        if (isMounted) {
          localStorage.setItem("rewear_user", JSON.stringify(data));
          setUser(data);
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("rewear_user");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initAuth();

    return () => {
      isMounted = false; // ✅ cleanup
    };
  }, []);

  // 🔄 Loading UI
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Checking authentication...
      </div>
    );
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const userRole = user?.role?.toLowerCase() || "user";

  // 🚫 Role not allowed
  if (allowedRoles.length && !allowedRoles.includes(userRole)) {
    if (userRole === "admin") {
      const redirectMap = {
        "/profile": "/admin/profile",
        "/my-listings": "/admin/listings",
        "/my-requests": "/admin/requests",
      };

      const target = redirectMap[location.pathname];
      if (target) {
        return <Navigate to={target} replace />;
      }
    }

    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;