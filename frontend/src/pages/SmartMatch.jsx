import React, { useEffect, useState } from 'react';
import clothImage from "../assets/Cloths/cloth.jpg";
 // Local fallback image
import axios from '@/utils/axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SmartMatch = () => {
  const [matches, setMatches] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [requestedItems, setRequestedItems] = useState([]);

  // Ab API_BASE use nahi karenge, axios ke baseURL se kaam chalayenge

  useEffect(() => {
    const fetchSmartMatches = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        toast.error('Please log in to view smart matches.');
        return;
      }

      const preferredSize = localStorage.getItem('preferredSize') || 'M';
      const preferredGender = localStorage.getItem('preferredGender') || 'Male';
      const preferredCategory = localStorage.getItem('preferredCategory') || 'T-Shirt';

      try {
        const res = await axios.post('/smartmatch', {
          preferredSize,
          preferredGender,
          preferredCategory,
          excludeUserId: userId,
        });
        setMatches(res.data);
      } catch (err) {
        console.error('❌ Error fetching smart matches:', err);
        toast.error('Failed to load smart matches.');
      }
    };

    fetchSmartMatches();
  }, []);

  const handleRequestMatch = async (item) => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      toast.error('Please login to request a match.');
      return;
    }

    if (requestedItems.includes(item._id)) {
      toast.info('You’ve already requested this match.');
      return;
    }

    try {
      setLoadingId(item._id);

      const res = await axios.post('/smartmatch/request', {
        matchId: item._id,
        title: item.title,
        size: item.size,
        gender: item.gender,
        category: item.category,
        image: item.image,
        userId,
      });

      if (res.data.message) {
        toast.success('✅ Match request sent!');
        setRequestedItems((prev) => [...prev, item._id]);
      } else {
        toast.warning('⚠️ Match already requested or failed.');
      }
    } catch (err) {
      console.error('❌ Failed to send match request:', err);
      toast.error('❌ Failed to send match request.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-r from-indigo-50 via-white to-indigo-100">
      <ToastContainer position="top-center" />
      <h1 className="text-3xl font-bold text-indigo-800 text-center mb-2 animate-fade-in">
        🎯 Smart Match Suggestions
      </h1>
      <p className="text-center text-gray-600 mb-8 animate-fade-in delay-100">
        Based on your preferences, we’ve matched the best items for you.
      </p>

      {matches.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {matches.map((item) => (
            <div
              key={item._id}
              className="bg-white/80 rounded-xl shadow-lg hover:shadow-xl transition backdrop-blur-md border border-indigo-100"
            >
              <img
                src={item.image ? `${import.meta.env.VITE_API_URL?.replace(/\/$/, '')}/${item.image}` : clothImage}
                alt={item.title}
                className="h-48 w-full object-cover rounded-t-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = clothImage;
                }}
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold truncate text-indigo-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600">Size: {item.size}</p>
                <p className="text-sm text-gray-600">Gender: {item.gender}</p>
                <p className="text-sm text-gray-600">Category: {item.category}</p>
                <button
                  onClick={() => handleRequestMatch(item)}
                  disabled={loadingId === item._id || requestedItems.includes(item._id)}
                  className={`mt-3 w-full text-white py-2 rounded text-sm transition ${
                    requestedItems.includes(item._id)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {requestedItems.includes(item._id)
                    ? '✔️ Requested'
                    : loadingId === item._id
                    ? 'Requesting...'
                    : 'Request Match'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-12 text-lg animate-pulse">
          Fetching smart matches for you...
        </p>
      )}
    </div>
  );
};

export default SmartMatch;
