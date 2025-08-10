import React, { useEffect, useState } from 'react';
import axios from '@/utils/axios';
import {
  CheckCircle,
  XCircle,
  Trash2,
  Mail,
  Users,
  MessageSquare,
  Box
} from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token'); // ✅ Added token

  useEffect(() => {
    fetchUsers();
    fetchMessages();
    fetchListings();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` } // ✅ Added
      });
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/contact', {
        headers: { Authorization: `Bearer ${token}` } // ✅ Added
      });
      setMessages(res.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/listings', {
        headers: { Authorization: `Bearer ${token}` } // ✅ Added
      });
      setListings(res.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` } // ✅ Added
      });
      setMessage({ type: 'success', text: 'User deleted successfully' });
      fetchUsers();
    } catch (err) {
      setMessage({ type: 'error', text: 'Error deleting user' });
    }
    setTimeout(() => setMessage(null), 3000);
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>

      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading...</div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white flex flex-col items-center">
              <Users size={36} />
              <p className="text-xl font-semibold mt-3">Total Users</p>
              <p className="text-4xl font-bold">{users.length}</p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white flex flex-col items-center">
              <MessageSquare size={36} />
              <p className="text-xl font-semibold mt-3">Messages</p>
              <p className="text-4xl font-bold">{messages.length}</p>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white flex flex-col items-center">
              <Box size={36} />
              <p className="text-xl font-semibold mt-3">Listings</p>
              <p className="text-4xl font-bold">{listings.length}</p>
            </div>
          </div>

          {message && (
            <div
              className={`flex items-center gap-3 mb-6 p-4 rounded-md ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {message.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
              <span>{message.text}</span>
            </div>
          )}

          {/* Users Table */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Registered Users
              </h2>
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-3 sm:mt-0 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200">Name</th>
                    <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200">Email</th>
                    <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200">Role</th>
                    <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((u, index) => (
                      <tr
                        key={u._id}
                        className={`${
                          index % 2 === 0
                            ? 'bg-white dark:bg-gray-900'
                            : 'bg-gray-50 dark:bg-gray-800'
                        }`}
                      >
                        <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                          {u.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {u.email}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${
                              u.role === 'admin'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteUser(u._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 flex items-center gap-1"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-4 text-gray-500 dark:text-gray-400"
                      >
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Messages Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
              <Mail size={24} /> User Messages
            </h2>
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 italic">No messages found from users yet.</div>
            ) : (
              <ul className="space-y-4">
                {messages.map((msg) => (
                  <li
                    key={msg._id}
                    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-all dark:border-gray-700"
                  >
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      From: {msg.name} ({msg.email})
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Subject: {msg.subject}</p>
                    <p className="mt-1 text-gray-700 dark:text-gray-300">{msg.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
