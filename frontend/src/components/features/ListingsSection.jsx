import { useEffect, useState } from "react";
import ProductCard from "../ui/ProductCard";
import API from "../../config/api";
import { Loader2 } from "lucide-react";

const ListingsSection = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);

      // ✅ IMPORTANT: correct endpoint
      const res = await API.get("/api/listings");

      // backend structure handle
      setItems(res.data?.listings || res.data || []);
    } catch (err) {
      console.error("Listings Error:", err);
      setError("Failed to load listings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">
          Latest Listings
        </h2>

        <button className="text-green-600 text-sm font-medium hover:underline">
          View all →
        </button>
      </div>

      {/* ⏳ LOADING */}
      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-green-600" size={32} />
        </div>
      )}

      {/* ❌ ERROR */}
      {!loading && error && (
        <p className="text-center text-red-500 py-6">
          {error}
        </p>
      )}

      {/* 📭 EMPTY */}
      {!loading && items.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No listings found 😕
        </p>
      )}

      {/* 🛍️ GRID */}
      {!loading && items.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {items.map((item) => (
            <ProductCard key={item._id} item={item} />
          ))}
        </div>
      )}

    </section>
  );
};

export default ListingsSection;