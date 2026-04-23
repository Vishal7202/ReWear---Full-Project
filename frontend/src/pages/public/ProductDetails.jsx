import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await API.get(`/api/listings/${id}`);
        setItem(res.data.listing);
      } catch (err) {
        console.error("Error fetching item:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-28 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  if (!item) {
    return (
      <div className="pt-28 text-center text-red-500">
        Product not found
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAF8] min-h-screen pt-28 px-6 md:px-16">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

        {/* 🖼 IMAGE SECTION */}
        <div className="bg-white p-4 rounded-2xl shadow-sm">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>

        {/* 📦 DETAILS */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {item.title}
          </h1>

          {/* META */}
          <p className="text-gray-500 mt-2">
            {item.category} • {item.size} • {item.condition}
          </p>

          {/* PRICE */}
          <p className="text-green-600 text-2xl font-bold mt-4">
            ₹{item.price || 0}
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-600 mt-4 leading-relaxed">
            {item.description || "No description provided"}
          </p>

          {/* TAG BADGES */}
          <div className="flex gap-2 mt-4 flex-wrap">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
              Sustainable
            </span>
            <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
              Pre-loved
            </span>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">

            <button className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition hover:scale-105">
              Request Swap
            </button>

            <button className="border px-6 py-3 rounded-xl hover:bg-gray-100 transition">
              Add to Wishlist
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;