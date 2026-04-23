import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/utils/axios";
import clothImg from "@/assets/clothes/cloth.jpg";

const Listings = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("/api/listings");
        setItems(res.data || []);
        setFilteredItems(res.data || []);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // 🔍 FILTER
  useEffect(() => {
    let filtered = [...items];

    if (category) {
      filtered = filtered.filter(
        (item) =>
          item.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (size) {
      filtered = filtered.filter(
        (item) => item.size?.toLowerCase() === size.toLowerCase()
      );
    }

    setFilteredItems(filtered);
  }, [category, size, items]);

  return (
    <div className="min-h-screen pt-28 px-6 md:px-16 bg-gradient-to-b from-[#F8FAF8] via-white to-green-50 relative">

      {/* 🌿 BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent)] pointer-events-none"></div>

      {/* HEADER */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-900 relative z-10">
        Browse Listings
      </h2>

      {/* FILTERS */}
      <div className="flex flex-wrap justify-center gap-4 mb-8 relative z-10">

        {/* CATEGORY */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 rounded-xl border bg-white shadow-sm focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Categories</option>
          {[...new Set(items.map((i) => i.category))].map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* SIZE */}
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="px-4 py-2 rounded-xl border bg-white shadow-sm focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Sizes</option>
          {[...new Set(items.map((i) => i.size))].map((sz) => (
            <option key={sz}>{sz}</option>
          ))}
        </select>

      </div>

      {/* CONTENT */}
      <div className="relative z-10">

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-center text-gray-500">No listings found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 bg-white/40 backdrop-blur-sm p-4 rounded-2xl">

            {filteredItems.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
                className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-2 transition duration-300"
              >
                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={item.imageUrl || clothImg}
                    alt={item.title}
                    onError={(e) => (e.target.src = clothImg)}
                    className="h-44 w-full object-cover transition duration-300 hover:scale-110"
                  />
                </div>

                {/* INFO */}
                <div className="p-4">
                  <h3 className="text-sm font-semibold truncate text-gray-900">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.category} • {item.size}
                  </p>

                  <p
                    className={`text-xs mt-2 font-medium ${
                      item.status === "Available"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {item.status}
                  </p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${item._id}`);
                    }}
                    className="w-full mt-3 bg-green-600 text-white text-sm py-2 rounded-xl hover:bg-green-700 transition"
                  >
                    View Item
                  </button>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;