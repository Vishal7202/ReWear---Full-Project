import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";

const Listings = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("/listings");
        setItems(res.data);
        setFilteredItems(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.response?.data?.message || "Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = [...items];

    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }
    if (size) {
      filtered = filtered.filter((item) => item.size === size);
    }

    setFilteredItems(filtered);
  }, [category, size, items]);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-purple-700">
        Browse Listings
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Categories</option>
          {[...new Set(items.map((item) => item.category))].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Size Filter */}
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">All Sizes</option>
          {[...new Set(items.map((item) => item.size))].map((sz) => (
            <option key={sz} value={sz}>
              {sz}
            </option>
          ))}
        </select>
      </div>

      {/* Listings */}
      {filteredItems.length === 0 ? (
        <p className="text-center text-gray-600">No listings found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-200 p-4"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">Category: {item.category}</p>
              <p className="text-sm text-gray-600">Size: {item.size}</p>
              <p
                className={`mt-2 text-sm font-medium ${
                  item.status === "Available" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listings;
