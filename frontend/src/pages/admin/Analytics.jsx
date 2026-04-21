// src/pages/Analytics.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';

const Analytics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Safe token decode
        let payload = null;
        try {
          payload = JSON.parse(atob(token.split('.')[1]));
        } catch (decodeErr) {
          console.error('Token decode failed:', decodeErr);
          navigate('/login');
          return;
        }

        if (payload?.role !== 'admin') {
          navigate('/unauthorized');
          return;
        }

        const res = await axios.get('/admin/analytics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (err) {
        console.error('Analytics error:', err);
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          navigate('/unauthorized');
        } else if (status === 404) {
          setError('Analytics data not found');
        } else {
          setError('Failed to load analytics');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Loading analytics...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  // Fallback dummy data
  const userGrowth = data?.userGrowth?.length ? data.userGrowth : [
    { month: 'Jan', users: 200 },
    { month: 'Feb', users: 400 },
    { month: 'Mar', users: 650 },
    { month: 'Apr', users: 900 },
  ];

  const revenueData = data?.revenueGrowth?.length ? data.revenueGrowth : [
    { month: 'Jan', revenue: 5000 },
    { month: 'Feb', revenue: 8000 },
    { month: 'Mar', revenue: 12000 },
    { month: 'Apr', revenue: 15000 },
  ];

  const userRoles = data?.userRoles?.length ? data.userRoles : [
    { name: 'Users', value: 60 },
    { name: 'Admins', value: 10 },
    { name: 'Moderators', value: 30 },
  ];

  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b'];

  const recentActivity = data?.recentActivity?.length ? data.recentActivity : [
    { id: 1, name: 'John Doe', action: 'Signed Up', time: '2 hours ago' },
    { id: 2, name: 'Jane Smith', action: 'Added Listing', time: '4 hours ago' },
    { id: 3, name: 'Mike Lee', action: 'Upgraded Plan', time: '1 day ago' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Analytics Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          { title: 'Total Users', value: data?.totalUsers ?? '-', color: 'text-blue-600' },
          { title: 'Active Listings', value: data?.activeListings ?? '-', color: 'text-green-600' },
          { title: 'Pending Requests', value: data?.pendingRequests ?? '-', color: 'text-orange-600' },
          { title: 'Monthly Revenue', value: `₹${data?.monthlyRevenue ?? '-'}`, color: 'text-purple-600' }
        ].map((stat, index) => (
          <div key={index} className="bg-white shadow-md rounded-xl p-4">
            <h2 className="text-xl font-semibold">{stat.title}</h2>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Line Chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">User Growth (Monthly)</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Growth</h2>
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">User Role Distribution</h2>
        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={userRoles} dataKey="value" nameKey="name" outerRadius={100} label>
                {userRoles.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Action</th>
                <th className="px-4 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.action}</td>
                  <td className="px-4 py-2">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
