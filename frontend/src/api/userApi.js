import axios from '@/utils/axios';


const BASE_URL = "http://localhost:5000/api"; // Adjust as per your backend

export const loginUser = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const signupUser = async (userData) => {
  try {
    const res = await axios.post(`${BASE_URL}/signup`, userData);
    return res.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
