import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/utils/axios";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [stats, setStats] = useState({
    donations: 0,
    requests: 0,
    matches: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("rewear_user");
    const storedToken = localStorage.getItem("token");

    if (!storedUser || !storedToken) {
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== "user") {
        navigate("/unauthorized");
      } else {
        setUser(parsedUser);
        fetchDashboardStats(parsedUser._id, storedToken);
      }
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  const fetchDashboardStats = async (userId, token) => {
    try {
      const res = await axios.get(`/api/dashboard/stats/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data || { donations: 0, requests: 0, matches: 0 });
    } catch (err) {
      console.error("❌ Dashboard stats error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 animate-fade-in">
          Welcome, {user.name} 👋
        </h1>

        {loading ? (
          <p className="text-gray-500 text-center">Loading your dashboard...</p>
        ) : (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard
                title="Your Donations"
                value={stats.donations}
                color="indigo"
              />
              <DashboardCard
                title="Items Requested"
                value={stats.requests}
                color="pink"
              />
              <DashboardCard
                title="Received Matches"
                value={stats.matches}
                color="green"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <ActionButton
                onClick={() => navigate("/upload")}
                color="indigo"
                label="Upload New Item"
              />
              <ActionButton
                onClick={() => navigate("/my-listings")}
                color="purple"
                label="View My Listings"
              />
              <ActionButton
                onClick={() => navigate("/my-requests")}
                color="pink"
                label="My Requests"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Recent Activity
              </h2>
              {stats.activities?.length ? (
                <ul className="space-y-3 text-gray-600 text-sm">
                  {stats.activities.map((act, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span>{act.icon}</span>
                      {act.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No recent activity found.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, color }) => (
  <div
    className={`bg-white rounded-2xl shadow p-6 border-t-4 border-${color}-500 transform hover:scale-105 transition`}
  >
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <p
      className={`text-3xl font-semibold text-${color}-600 animate-slide-up`}
    >
      {value}
    </p>
  </div>
);

const ActionButton = ({ onClick, color, label }) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 bg-${color}-600 text-white rounded-xl shadow hover:bg-${color}-700 transition`}
  >
    {label}
  </button>
);

export default UserDashboard;
