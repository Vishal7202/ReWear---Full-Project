import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '@/utils/axios';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'signup') setIsSignup(true);
  }, [location.search]);

  const handleChange = (e) => {
    setError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
     if (isSignup) {
  const dataToSend = {
    ...formData,
    photo: `https://api.dicebear.com/7.x/initials/svg?seed=${formData.name}`,
  };

  await axios.post('/auth/signup', dataToSend); // Removed import.meta.env.VITE_API_URL

  alert('Account created successfully. You can now log in.');
  setFormData({ name: '', email: '', password: '', role: 'user' });
  setIsSignup(false);
} else {
  const res = await axios.post('/auth/login', { // Removed import.meta.env.VITE_API_URL
    email: formData.email,
    password: formData.password,
  });

  const { token, user } = res.data;

  localStorage.setItem('rewear_user', JSON.stringify(user));
  localStorage.setItem('token', token);

  window.dispatchEvent(new Event('userLogin'));

  const role = user.role?.toLowerCase();
  if (role === "admin") {
    navigate("/admin-dashboard");
  } else if (role === "user") {
    navigate("/user-dashboard");
  } else {
    navigate("/");
  }
}

    } catch (err) {
      let msg = 'Something went wrong.';
      if (err.response && err.response.data && err.response.data.message) {
        msg = err.response.data.message;
      }

      const lowerMsg = msg.toLowerCase();
      if (lowerMsg.includes('password')) {
        setError('Incorrect password. Please try again.');
      } else if (lowerMsg.includes('email')) {
        setError('Email not registered. Please sign up.');
      } else if (lowerMsg.includes('already exists')) {
        setError('This email is already in use. Try logging in.');
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdfcfb] via-[#e2d1c3] to-[#f5e6ca] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500 px-4">
      <div className="backdrop-blur-lg bg-white/30 dark:bg-white/10 border border-white/40 shadow-2xl rounded-3xl p-8 w-full max-w-md transition-transform duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center text-purple-800 dark:text-white mb-6 drop-shadow-md">
          {isSignup ? 'Create Your Account' : 'Welcome Back'}
        </h2>

        {error && (
          <div className="text-red-500 text-sm text-center mb-4 font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 dark:text-white shadow-sm"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 dark:text-white shadow-sm"
          />

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 dark:text-white shadow-sm"
            />
            {isSignup && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 ml-1">
                Must be at least 6 characters, include a number and a letter.
              </p>
            )}
          </div>

          {isSignup && (
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-800 dark:text-white shadow-sm"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}

          {!isSignup && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm font-medium text-purple-700 dark:text-purple-300 hover:underline transition duration-200"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-lg font-semibold transition-all"
          >
            {loading ? 'Please wait...' : isSignup ? 'Sign Up' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
            }}
            className="text-purple-700 dark:text-purple-300 font-semibold hover:underline"
          >
            {isSignup ? 'Login here' : 'Sign up here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
