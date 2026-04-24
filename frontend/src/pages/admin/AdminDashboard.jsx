import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "@/utils/axios";
import { Trash2 } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [listings, setListings] = useState([]);
  const [stats, setStats] = useState({});
  const [growth, setGrowth] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔐 AUTH + FETCH
  useEffect(() => {
    const storedUser = localStorage.getItem("rewear_user");

    if (!storedUser) return navigate("/login");

    const parsed = JSON.parse(storedUser);
    if (parsed.role !== "admin") return navigate("/unauthorized");

    fetchAll();
  }, []);

  // 🔄 FETCH DATA (FIXED + UPGRADED)
  const fetchAll = async () => {
    try {
      setLoading(true);

      const [usersRes, reqRes, listRes, analyticsRes] = await Promise.all([
        API.get("/api/admin/users"),
        API.get("/api/admin/requests"),
        API.get("/api/admin/listings"),
        API.get("/api/admin/analytics"),
      ]);

      setUsers(usersRes.data || []);
      setRequests(reqRes.data || []);
      setListings(listRes.data || []);

      setStats({
        users: analyticsRes.data.totalUsers || 0,
        listings: analyticsRes.data.totalListings || 0,
        requests: analyticsRes.data.totalRequests || 0,
      });

      // format growth data
      const formattedGrowth = (analyticsRes.data.userGrowth || []).map(i => ({
        month: `M${i._id}`,
        users: i.users,
      }));

      setGrowth(formattedGrowth);

    } catch (err) {
      console.log("ADMIN ERROR:", err.response?.data);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  // 🗑 DELETE USER
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/api/users/${id}`);
      setUsers(prev => prev.filter(u => u._id !== id));
      toast.success("User deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔍 FILTER
  const filteredUsers = users.filter(
    (u) =>
      u?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Admin Dashboard
      </h1>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <Stat title="Users" value={stats.users} color="blue" />
        <Stat title="Listings" value={stats.listings} color="green" />
        <Stat title="Requests" value={stats.requests} color="purple" />
      </div>

      {/* 📈 CHART */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="font-bold mb-4">User Growth</h2>

        {growth.length === 0 ? (
          <p>No data</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={growth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="users" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* 👥 USERS */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold">Users</h2>

          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>

        {filteredUsers.length === 0 ? (
          <p>No users</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u._id} className="border-t">
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 📦 RECENT REQUESTS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">Recent Requests</h2>

        {requests.length === 0 ? (
          <p>No requests</p>
        ) : (
          requests.slice(0, 5).map(r => (
            <div key={r._id} className="border p-3 mb-2 rounded">
              <p className="font-semibold">{r.user?.name}</p>
              <p className="text-sm">{r.title}</p>
              <p className="text-xs text-gray-500">{r.status}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

// 🔹 STAT CARD
const Stat = ({ title, value, color }) => {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
  };

  return (
    <div className={`${colors[color]} text-white p-6 rounded-xl text-center`}>
      <p>{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default AdminDashboard;