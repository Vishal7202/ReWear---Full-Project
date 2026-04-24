// src/pages/admin/Analytics.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axios';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend
} from 'recharts';
import toast from 'react-hot-toast';

const Analytics = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('rewear_user'));

        if (!user) return navigate('/login');
        if (user.role !== 'admin') return navigate('/unauthorized');

        // ✅ FIXED API
        const res = await axios.get('/api/admin/analytics');

        setData(res.data);

      } catch (err) {
        console.error(err);
        toast.error("Analytics load failed");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading analytics...</div>;
  }

  // ✅ SAFE DATA
  const userGrowth = data?.userGrowth || [];
  const revenueData = data?.revenueGrowth || [];
  const userRoles = data?.userRoles || [];
  const recentActivity = data?.recentActivity || [];

  const COLORS = ['#3b82f6', '#22c55e', '#f59e0b'];

  return (
    <div className="max-w-7xl mx-auto p-6 text-black">

      <h1 className="text-3xl font-bold mb-6 text-white">
        Admin Analytics Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Stat title="Users" value={data?.totalUsers || 0} />
        <Stat title="Listings" value={data?.activeListings || 0} />
        <Stat title="Requests" value={data?.pendingRequests || 0} />
        <Stat title="Revenue" value={`₹${data?.monthlyRevenue || 0}`} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        <Card title="User Growth">
          <LineChart width={400} height={250} data={userGrowth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line dataKey="users" stroke="#3b82f6" />
          </LineChart>
        </Card>

        <Card title="Revenue">
          <BarChart width={400} height={250} data={revenueData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#22c55e" />
          </BarChart>
        </Card>

      </div>

      {/* PIE */}
      <Card title="User Roles">
        <PieChart width={400} height={250}>
          <Pie data={userRoles} dataKey="value">
            {userRoles.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Card>

      {/* TABLE */}
      <Card title="Recent Activity">
        {recentActivity.length === 0 ? (
          <p>No activity</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th>User</th>
                <th>Action</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item) => (
                <tr key={item.id} className="border-t">
                  <td>{item.name}</td>
                  <td>{item.action}</td>
                  <td>{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

    </div>
  );
};

// 🔥 SMALL COMPONENTS

const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow mb-6">
    <h2 className="font-bold mb-4">{title}</h2>
    {children}
  </div>
);

const Stat = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow text-center">
    <p>{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Analytics;