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
    <div className="bg-[#F8FAF8] min-h-screen pt-28 px-6 md:px-16">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Welcome, <span className="text-green-600">{user.name}</span> 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Track your activity and manage your items
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading dashboard...</p>
        ) : (
          <>
            {/* 📊 STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <DashboardCard title="Your Donations" value={stats.donations} />
              <DashboardCard title="Items Requested" value={stats.requests} />
              <DashboardCard title="Matches" value={stats.matches} />
            </div>

            {/* ⚡ ACTIONS */}
            <div className="flex flex-wrap gap-4 mb-10">
              <ActionButton onClick={() => navigate("/upload")} label="Upload Item" />
              <ActionButton onClick={() => navigate("/my-listings")} label="My Listings" />
              <ActionButton onClick={() => navigate("/my-requests")} label="My Requests" />
            </div>

            {/* 📜 ACTIVITY */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Recent Activity
              </h2>

              {stats.activities?.length ? (
                <ul className="space-y-2">
                  {stats.activities.map((act, i) => (
                    <li key={i} className="text-gray-600 text-sm">
                      • {act.text}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">No activity yet</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* 🟩 CARD */
const DashboardCard = ({ title, value }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-3xl font-bold text-green-600 mt-1">{value}</p>
  </div>
);

/* 🟢 BUTTON */
const ActionButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition hover:scale-105"
  >
    {label}
  </button>
);

export default UserDashboard;