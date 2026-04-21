import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "@/utils/axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await API.get(`/api/listings/${id}`);
        setItem(res.data.listing);
      } catch (err) {
        console.error("Error fetching item:", err);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="bg-[#F8FAF8] min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6 shadow grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-[400px] object-cover rounded-xl"
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-2xl font-bold">{item.title}</h1>

          <p className="text-gray-500 mt-2">
            {item.category} • {item.size} • {item.condition}
          </p>

          <p className="text-green-600 text-xl font-bold mt-4">
            ₹{item.price || 0}
          </p>

          <p className="text-gray-600 mt-4">
            {item.description || "No description provided"}
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-6">
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg">
              Request Swap
            </button>

            <button className="border px-6 py-2 rounded-lg">
              Add to Wishlist
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;