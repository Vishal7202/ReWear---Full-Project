// Browse.jsx
import React, { useState, useEffect } from 'react';
import axios from "@/utils/axios";

import clothImg from "@/assets/clothes/cloth.jpg"; // fallback image

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


  useEffect(() => {
    const fetchClothes = async () => {
      try {
      const res = await axios.get('/api/listings');

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
    const matchSearch = item.title?.toLowerCase()?.includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screenbg-gradient-to-br from-[#020617] via-[#0F172A] to-[#020617] text-whitepx-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
  Browse Clothes
</h1>

      {/* 🔍 Premium Search Input */}
<div className="max-w-md mx-auto mb-8 relative">

  {/* Glow Effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl rounded-xl"></div>

  <div className="relative flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 shadow-lg focus-within:ring-2 focus-within:ring-cyan-400 transition">

    {/* Icon */}
    <svg
      className="w-5 h-5 text-gray-400 mr-2"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.6-5.15a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>

    {/* Input */}
    <input
      type="text"
      placeholder="Search stylish clothes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full bg-transparent outline-none text-white placeholder-gray-400"
    />

  </div>
</div>
      {/* 🔘 Premium Category Buttons */}
<div className="flex flex-wrap gap-3 justify-center mb-8">
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setSelectedCategory(cat)}
      className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
        selectedCategory === cat
          ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 scale-105"
          : "bg-white/10 text-gray-300 border-white/20 hover:bg-white/20 hover:scale-105"
      }`}
    >
      {cat}
    </button>
  ))}
</div>

{/* 📦 Listings Grid */}
{loading ? (
  <p className="text-center text-gray-400 text-lg">Loading...</p>
) : filteredClothes.length === 0 ? (
  <p className="text-center text-gray-500 text-lg">No clothes found.</p>
) : (
  <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    {filteredClothes.map((item) => (
      <div
        key={item._id}
        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 hover:scale-105 transition duration-300"
      >
        {/* Image */}
        <img
          src={item.imageUrl || placeholderImage}
          alt={item.title}
          onError={(e) => {
            e.target.src = placeholderImage;
          }}
          className="h-44 w-full object-cover rounded-t-2xl"
        />

        {/* Content */}
        <div className="p-4">
          <h2 className="text-sm font-semibold truncate text-cyan-300">
            {item.title}
          </h2>

          <div className="mt-1 space-y-1">
            <p className="text-xs text-gray-400">Size: {item.size || "-"}</p>
            <p className="text-xs text-gray-400">
              Category: {item.category || "-"}
            </p>
            <p className="text-xs text-gray-400">
              Status: {item.status || "Available"}
            </p>
          </div>

          {/* Button */}
          <button
            onClick={() => handleRequest(item)}
            className="w-full mt-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm py-2 rounded-xl hover:scale-105 transition"
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
