import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import axios from '@/utils/axios';

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');
  const storedUser = JSON.parse(localStorage.getItem('rewear_user'));

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data || storedUser);
      } catch (err) {
        console.error('❌ Unauthorized or Failed to Fetch Profile:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('rewear_user');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rewear_user');
    navigate('/login');
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-white p-6">
      <div className="w-40 h-40 rounded-full bg-indigo-500 text-white flex items-center justify-center text-5xl font-bold mb-4 shadow-lg">
        {user.name?.charAt(0).toUpperCase()}
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
      <p className="text-lg text-gray-600 mb-4 text-center max-w-xl">
        {user.bio || 'Passionate user of ReWear platform. Updating profile soon!'}
      </p>

      <div className="grid gap-4 w-full max-w-md">
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-indigo-600">Email:</h2>
          <p>{user.email}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-indigo-600">Role:</h2>
          <p>{user.role}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <h2 className="font-semibold text-indigo-600">Joined On:</h2>
          <p>{new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default MyProfile;
