// Browse.jsx
import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

import placeholderImage from '../assets/cloths/cloth.jpg'; // fallback image

const categories = [
  'All',
  'Winter',
  'Summer',
  'Casual',
  'Bottomwear',
  'Workwear',
  'Traditional',
  'Sportswear',
  'Formal',
];

const Browse = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [allClothes, setAllClothes] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchClothes = async () => {
      try {
      const res = await axios.get('/listings');

        setAllClothes(res.data || []);
      } catch (err) {
        console.error('Failed to fetch listings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchClothes();
  }, []);

  const handleRequest = (item) => {
    alert(`You requested: ${item.title}`);
    console.log('Requesting:', item);
  };

  const filteredClothes = allClothes.filter((item) => {
    const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchSearch = item.title?.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <h1 className="text-3xl font-bold text-indigo-700 text-center mb-4">
        Browse Clothes
      </h1>

      {/* Search Input */}
      <div className="max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1 rounded-full border text-sm font-medium transition ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-indigo-100 border-indigo-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : filteredClothes.length === 0 ? (
        <p className="text-center text-gray-500">No clothes found.</p>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredClothes.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100"
            >
              <img
  src={item.imageUrl || placeholderImage}
  alt={item.title}
  onError={(e) => { e.target.src = placeholderImage }}
  className="h-40 w-full object-cover"
/>

              <div className="p-3">
                <h2 className="text-sm font-semibold truncate text-indigo-800">{item.title}</h2>
                <p className="text-xs text-gray-500">Size: {item.size || '-'}</p>
                <p className="text-xs text-gray-500">Category: {item.category || '-'}</p>
                <p className="text-xs text-gray-500">Status: {item.status || 'Available'}</p>
                <button
                  onClick={() => handleRequest(item)}
                  className="w-full mt-2 bg-indigo-600 text-white text-sm py-1.5 rounded hover:bg-indigo-700 transition"
                >
                  Request Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Browse;
