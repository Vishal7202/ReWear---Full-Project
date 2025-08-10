// src/pages/Wishlist.jsx
import React, { useEffect, useState } from 'react';
import axios from '@/utils/axios';

import { Link, useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('rewear_user'));
        if (!user || user.role !== 'user') {
          navigate('/unauthorized');
          return;
        }

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/wishlist`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setWishlist(res.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [navigate]);

  const removeFromWishlist = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem('rewear_user'));
      if (!user || user.role !== 'user') {
        navigate('/unauthorized');
        return;
      }

      await axios.delete(`${import.meta.env.VITE_API_URL}/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setWishlist((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Your Wishlist ❤️</h1>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow p-4 hover:shadow-lg transition"
            >
              <img
                src={item.image || '/placeholder.jpg'}
                alt={item.title}
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.description?.slice(0, 100)}...</p>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/listing/${item.listingId}`}
                  className="text-blue-500 hover:underline"
                >
                  View
                </Link>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
