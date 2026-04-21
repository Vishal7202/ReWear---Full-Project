import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "@/utils/axios";

import {
  CheckCircle,
  XCircle,
  Trash2,
  Mail,
  Users,
  MessageSquare,
  Box,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 AUTH CHECK
  useEffect(() => {
    const storedUser = localStorage.getItem("rewear_user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const parsed = JSON.parse(storedUser);

    if (parsed.role !== "admin") {
      navigate("/unauthorized");
      return;
    }

    fetchAll();
  }, [navigate]);

  // 🔄 FETCH ALL DATA
  const fetchAll = async () => {
    try {
      setLoading(true);

      const [usersRes, msgRes, listRes] = await Promise.all([
        API.get("/api/users"),
        API.get("/api/contact"),
        API.get("/api/listings"),
      ]);

      setUsers(usersRes.data || []);
      setMessages(msgRes.data || []);
      setListings(listRes.data || []);
    } catch (err) {
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
      toast.success("User deleted");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔍 FILTER
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center p-10 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold text-center mb-10">
        Admin Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <StatCard icon={<Users />} title="Users" value={users.length} color="blue" />
        <StatCard icon={<MessageSquare />} title="Messages" value={messages.length} color="green" />
        <StatCard icon={<Box />} title="Listings" value={listings.length} color="purple" />
      </div>

      {/* USERS */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Users</h2>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-3 py-1 rounded"
          />
        </div>

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
              <tr key={u._id}>
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
      </div>

      {/* MESSAGES */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 flex gap-2 items-center">
          <Mail /> Messages
        </h2>

        {messages.length === 0 ? (
          <p>No messages</p>
        ) : (
          messages.map((m) => (
            <div key={m._id} className="border p-3 mb-2 rounded">
              <p>{m.name} ({m.email})</p>
              <p className="text-sm text-gray-500">{m.subject}</p>
              <p>{m.message}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

// 🔥 FIXED STYLE (no dynamic Tailwind bug)
const StatCard = ({ icon, title, value, color }) => {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
  };

  return (
    <div className={`${colors[color]} text-white p-6 rounded-xl text-center`}>
      {icon}
      <p className="mt-2">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default AdminDashboard;