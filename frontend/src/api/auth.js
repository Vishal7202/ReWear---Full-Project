import axios from '@/utils/axios';


const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // ✅ base URL to your backend
});

export const signupUser = (data) => API.post('/signup', data);  // ✅ Must match backend
export const loginUser = (data) => API.post('/login', data);
