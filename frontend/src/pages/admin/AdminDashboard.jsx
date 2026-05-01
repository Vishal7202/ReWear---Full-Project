import React, { useEffect, useState } from "react";
import API from "@/utils/axios";
import toast from "react-hot-toast";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { Trash2, UserX, Shield, Check, X } from "lucide-react";

const AdminDashboard = () => {
  const [tab, setTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  // common
  const [data, setData] = useState(null);

  // users
  const [users, setUsers] = useState([]);
  const [userPage, setUserPage] = useState(1);
  const [userSearch, setUserSearch] = useState("");

  // listings
  const [listings, setListings] = useState([]);
  const [listingStatus, setListingStatus] = useState("");

  // requests
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchAll();
  }, [tab, userPage, userSearch, listingStatus]);

  const fetchAll = async () => {
    try {
      setLoading(true);

      if (tab === "dashboard") {
        const res = await API.get("/api/admin/analytics");
        setData(res.data.data);
      }

      if (tab === "users") {
        const res = await API.get(
          `/api/admin/users?page=${userPage}&search=${userSearch}`
        );
        setUsers(res.data.data);
      }

      if (tab === "listings") {
        const res = await API.get(
          `/api/admin/listings?status=${listingStatus}`
        );
        setListings(res.data.data);
      }

      if (tab === "requests") {
        const res = await API.get("/api/admin/requests");
        setRequests(res.data.data);
      }

    } catch {
      toast.error("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  // ================= USERS =================
  const blockUser = async (id) => {
    await API.put(`/api/admin/users/${id}/block`);
    toast.success("Blocked");
    fetchAll();
  };

  const unblockUser = async (id) => {
    await API.put(`/api/admin/users/${id}/unblock`);
    toast.success("Unblocked");
    fetchAll();
  };

  const changeRole = async (id, role) => {
    await API.put(`/api/admin/users/${id}/role`, { role });
    toast.success("Role updated");
    fetchAll();
  };

  // ================= LISTINGS =================
  const approveListing = async (id) => {
    await API.put(`/api/admin/listings/${id}/approve`);
    toast.success("Approved");
    fetchAll();
  };

  const rejectListing = async (id) => {
    await API.put(`/api/admin/listings/${id}/reject`);
    toast.success("Rejected");
    fetchAll();
  };

  // ================= REQUEST =================
  const updateRequest = async (id, status) => {
    await API.put(`/api/admin/requests/${id}/status`, { status });
    toast.success("Updated");
    fetchAll();
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
  <div className="max-w-7xl mx-auto px-6 py-10">

    {/* 🔥 HEADER */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <p className="text-gray-500">Manage users, listings and requests</p>
    </div>

    {/* 🔥 NAV TABS */}
    <div className="flex flex-wrap gap-3 mb-8">
      {["dashboard", "users", "listings", "requests"].map(t => (
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            tab === t
              ? "bg-green-600 text-white shadow-md"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          {t.toUpperCase()}
        </button>
      ))}
    </div>

    {/* ================= DASHBOARD ================= */}
    {tab === "dashboard" && data && (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          <Stat title="Users" value={data.totalUsers} color="blue" />
          <Stat title="Listings" value={data.totalListings} color="green" />
          <Stat title="Requests" value={data.totalRequests} color="purple" />
          <Stat title="Active" value={data.activeUsers} color="green" />
          <Stat title="Blocked" value={data.blockedUsers} color="red" />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            User Growth Overview
          </h2>

          {data.userGrowth?.length === 0 ? (
            <p className="text-center text-gray-400">No data available</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.userGrowth}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Line dataKey="users" stroke="#16a34a" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </>
    )}

    {/* ================= USERS ================= */}
    {tab === "users" && (
      <div className="bg-white p-6 rounded-2xl shadow border">

        <div className="flex justify-between mb-5">
          <h2 className="font-semibold text-lg">Users</h2>

          <input
            placeholder="Search users..."
            className="border px-3 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setUserSearch(e.target.value)}
          />
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-t hover:bg-gray-50 transition">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>

                <td className="p-2">
                  <select
                    value={u.role}
                    onChange={(e) => changeRole(u._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td className="p-2">
                  {u.isBlocked ? (
                    <span className="text-red-500 font-medium">Blocked</span>
                  ) : (
                    <span className="text-green-600 font-medium">Active</span>
                  )}
                </td>

                <td className="p-2 flex gap-3 justify-center">
                  {u.isBlocked ? (
                    <button onClick={() => unblockUser(u._id)}>
                      <Shield size={16} className="text-green-600" />
                    </button>
                  ) : (
                    <button onClick={() => blockUser(u._id)}>
                      <UserX size={16} className="text-yellow-600" />
                    </button>
                  )}

                  <button onClick={() => handleDeleteUser(u._id)}>
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-5">
          <button
            onClick={() => setUserPage(p => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Prev
          </button>

          <button
            onClick={() => setUserPage(p => p + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    )}

    {/* ================= LISTINGS ================= */}
    {tab === "listings" && (
      <div className="bg-white p-6 rounded-2xl shadow border">

        <div className="flex justify-between mb-4">
          <h2 className="font-semibold text-lg">Listings</h2>

          <select
            onChange={(e) => setListingStatus(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
          </select>
        </div>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>Title</th><th>Owner</th><th>Status</th><th>Action</th>
            </tr>
          </thead>

          <tbody>
            {listings.map(l => (
              <tr key={l._id} className="border-t hover:bg-gray-50">
                <td>{l.title}</td>
                <td>{l.owner?.email}</td>

                <td>
                  <span className={`px-2 py-1 rounded text-xs ${
                    l.status === "approved"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}>
                    {l.status}
                  </span>
                </td>

                <td className="flex gap-3">
                  <button onClick={() => approveListing(l._id)}>
                    <Check size={16} className="text-green-500"/>
                  </button>
                  <button onClick={() => rejectListing(l._id)}>
                    <X size={16} className="text-red-500"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {/* ================= REQUESTS ================= */}
    {tab === "requests" && (
      <div className="bg-white p-6 rounded-2xl shadow border">

        <h2 className="font-semibold text-lg mb-4">Requests</h2>

        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>User</th><th>Status</th><th>Update</th>
            </tr>
          </thead>

          <tbody>
            {requests.map(r => (
              <tr key={r._id} className="border-t hover:bg-gray-50">
                <td>{r.user?.email}</td>

                <td>
                  <span className="text-gray-600">{r.status}</span>
                </td>

                <td>
                  <select
                    onChange={(e) => updateRequest(r._id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    <option>Change</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

  </div>
);
};

const Stat = ({ title, value }) => (
  <div className="bg-black text-white p-4 rounded text-center">
    <p>{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;