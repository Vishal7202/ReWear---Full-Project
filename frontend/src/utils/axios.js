import axios from 'axios';

// अगर VITE_API_URL undefined हो तो fallback localhost URL use करेगा
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://rewear-backend-cnoa.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
