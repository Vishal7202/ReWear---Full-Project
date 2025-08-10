import axios from '@/utils/axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/smartmatch',
  withCredentials: true,
});

export const generateSmartMatch = () => API.post('/generate');
export const getUserMatches = () => API.get('/my');
