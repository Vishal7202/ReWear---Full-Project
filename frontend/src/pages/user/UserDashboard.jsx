import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "@/utils/axios";

const UserDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    donations: 0,
    requests: 0,
    matches: 0,
    activities: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("rewear_user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    if (parsedUser.role !== "user") {
      navigate("/unauthorized");
      return;
    }

    setUser(parsedUser);
    fetchStats(parsedUser._id);
  }, [navigate]);

  const fetchStats = async (userId) => {
    try {
      const res = await API.get(`/api/dashboard/stats/${userId}`);
      setStats(res.data || {});
    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome, {user.name} 👋
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading dashboard...</p>
        ) : (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard title="Your Donations" value={stats.donations} color="indigo" />
              <DashboardCard title="Items Requested" value={stats.requests} color="pink" />
              <DashboardCard title="Matches" value={stats.matches} color="green" />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mb-10">
              <ActionButton onClick={() => navigate("/upload")} label="Upload Item" />
              <ActionButton onClick={() => navigate("/my-listings")} label="My Listings" />
              <ActionButton onClick={() => navigate("/my-requests")} label="My Requests" />
            </div>

            {/* Activity */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

              {stats.activities?.length ? (
                <ul className="space-y-2">
                  {stats.activities.map((act, i) => (
                    <li key={i} className="text-gray-600 text-sm">
                      {act.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No activity yet</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ✅ FIXED Tailwind (no dynamic classes)
const DashboardCard = ({ title, value, color }) => {
  const styles = {
    indigo: "border-indigo-500 text-indigo-600",
    pink: "border-pink-500 text-pink-600",
    green: "border-green-500 text-green-600",
  };

  return (
    <div className={`bg-white rounded-2xl shadow p-6 border-t-4 ${styles[color]}`}>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

const ActionButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
  >
    {label}
  </button>
);

export default UserDashboard;