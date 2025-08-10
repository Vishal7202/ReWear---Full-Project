import axios from '@/utils/axios';

// Base URL from environment OR default to localhost
const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// ✅ Get all my listings (for logged-in user)
export const getMyListings = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${API}/listings/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ Delete a listing by ID
export const deleteListing = async (id) => {
  const token = localStorage.getItem('token');
  const res = await axios.delete(`${API}/listings/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ Create a new listing
export const createListing = async (listingData) => {
  const token = localStorage.getItem('token');
  const res = await axios.post(`${API}/listings`, listingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// ✅ Browse all listings (public route)
export const getAllListings = async () => {
  const res = await axios.get(`${API}/listings/browse`);
  return res.data;
};
