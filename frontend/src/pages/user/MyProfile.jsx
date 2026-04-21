import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getProfile } from "@/services/userService";
import { logoutUser } from "@/services/authService";

const MyProfile = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProfile(); // ✅ service use
        setUser(data);

        // cache update
        localStorage.setItem("rewear_user", JSON.stringify(data));
      } catch (err) {
        console.error("Profile fetch failed:", err);

        toast.error("Session expired, please login again");

        await logoutUser();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async () => {
    await logoutUser();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="text-center p-6 text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-white p-6">

      {/* Avatar */}
      <div className="w-40 h-40 rounded-full bg-indigo-500 text-white flex items-center justify-center text-5xl font-bold mb-4 shadow-lg">
        {user.name?.charAt(0).toUpperCase()}
      </div>

      {/* Name */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {user.name}
      </h1>

      {/* Bio */}
      <p className="text-lg text-gray-600 mb-4 text-center max-w-xl">
        {user.bio || "Welcome to ReWear 👕"}
      </p>

      {/* Info Cards */}
      <div className="grid gap-4 w-full max-w-md">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-indigo-600">Email:</h2>
          <p>{user.email}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-indigo-600">Role:</h2>
          <p className="capitalize">{user.role}</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-indigo-600">Joined On:</h2>
          <p>
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default MyProfile;