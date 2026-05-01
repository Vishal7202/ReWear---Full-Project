import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/utils/axios";
import clothImg from "@/assets/clothes/cloth.jpg";

const categories = [
  "All",
  "Winter",
  "Summer",
  "Casual",
  "Bottomwear",
  "Workwear",
  "Traditional",
  "Sportswear",
  "Formal",
];

const Browse = () => {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [allClothes, setAllClothes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ================= FETCH =================
  useEffect(() => {
    const fetchClothes = async () => {
      try {
        setLoading(true);
        setError(null);

// 🔥 HANDLE ALL POSSIBLE BACKEND FORMATS
const res = await axios.get("/api/listings");

// ✅ SINGLE CLEAN HANDLING
let finalData = [];

if (Array.isArray(res.data)) {
  finalData = res.data;
} else if (Array.isArray(res.data?.listings)) {
  finalData = res.data.listings;
} else if (Array.isArray(res.data?.data)) {
  finalData = res.data.data;
} else {
  console.warn("Unexpected API format:", res.data);
}

setAllClothes(finalData);

      } catch (err) {
        console.error("❌ Fetch error:", err);

        // axios interceptor already handles toast
        setError("Unable to load clothes");

      } finally {
        setLoading(false);
      }
    };

    fetchClothes();
  }, []);

  // ================= FILTER =================
  const filteredClothes = (allClothes || []).filter((item) => {
    if (!item) return false;

    const matchCategory =
  selectedCategory === "All" ||
  item.category?.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchSearch =
      item.title?.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen pt-28 px-6 md:px-16 bg-gradient-to-b from-[#F8FAF8] via-white to-green-50 relative">

      {/* BG */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent)] pointer-events-none"></div>

      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900 relative z-10">
        Browse Clothes
      </h1>

      {/* SEARCH */}
      <div className="max-w-md mx-auto mb-8 relative z-10">
        <div className="flex items-center bg-white border rounded-xl px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-green-500">
          <input
            type="text"
            placeholder="Search clothes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>
      </div>

      {/* CATEGORY */}
      <div className="flex flex-wrap gap-3 justify-center mb-8 relative z-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-green-600 text-white shadow"
                : "bg-white text-gray-700 border hover:bg-green-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="relative z-10">

        {/* LOADING */}
        {loading && (
          <div className="text-center text-gray-500 animate-pulse">
            Loading clothes...
          </div>
        )}

        {/* ERROR */}
        {error && !loading && (
          <div className="text-center text-red-500">{error}</div>
        )}

        {/* EMPTY */}
        {!loading && !error && filteredClothes.length === 0 && (
          <div className="text-center text-gray-500">
            No clothes found.
          </div>
        )}

        {/* DATA */}
        {!loading && !error && filteredClothes.length > 0 && (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 bg-white/40 backdrop-blur-sm p-4 rounded-2xl">

            {filteredClothes.map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
                className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-2 transition duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.imageUrl || clothImg}
                    alt={item.title || "cloth"}
                    onError={(e) => (e.target.src = clothImg)}
                    className="h-44 w-full object-cover transition duration-300 hover:scale-110"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-sm font-semibold truncate text-gray-900">
                    {item.title || "Untitled"}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.category || "-"} • {item.size || "-"}
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

export default Browse;