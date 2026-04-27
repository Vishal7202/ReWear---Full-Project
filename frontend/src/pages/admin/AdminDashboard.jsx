import React, { useEffect, useState } from "react";
import API from "@/utils/axios";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState([]);
  const [growth, setGrowth] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 🔥 FETCH
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const [analyticsRes, usersRes] = await Promise.all([
        API.get("/api/admin/analytics"),
        API.get("/api/admin/users"),
      ]);

      const analytics = analyticsRes.data.data;

      setData(analytics);
      setUsers(usersRes.data.data || []);

      // growth format
      const formatted = (analytics.userGrowth || []).map(i => ({
        month: `M${i._id}`,
        users: i.users,
      }));

      setGrowth(formatted);

    } catch (err) {
      console.error(err);
      toast.error("Dashboard load failed");
    } finally {
      setLoading(false);
    }
  };

  // DELETE USER
  const handleDeleteUser = async (id) => {
  if (!window.confirm("Delete user?")) return;

  try {
    await API.delete(`/api/admin/users/${id}`); // ✅ FIXED

    setUsers(prev => prev.filter(u => u._id !== id));

    toast.success("User deleted successfully");
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Delete failed");
  }
};

  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔥 LOADING UI
  if (loading) {
    return (
      <div className="p-10 text-center animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  if (!data) {
    return <p className="text-center mt-10">No Data Found</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Stat title="Users" value={data.totalUsers} color="blue" />
        <Stat title="Listings" value={data.totalListings} color="green" />
        <Stat title="Requests" value={data.totalRequests} color="purple" />
      </div>

      {/* 📈 CHART */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="font-semibold mb-4">User Growth</h2>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={growth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line dataKey="users" stroke="#3b82f6" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 👥 USERS */}
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between mb-4">
          <h2 className="font-semibold">Users</h2>

          <input
            type="text"
            placeholder="Search users..."
            className="border px-3 py-2 rounded"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredUsers.length === 0 ? (
          <p>No users found</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.map(u => (
                <tr key={u._id} className="border-t">
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(u._id)}>
                      <Trash2 size={16} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

const Stat = ({ title, value, color }) => {
  const map = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
  };

  return (
    <div className={`${map[color]} text-white p-6 rounded-xl text-center`}>
      <p>{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default AdminDashboard;