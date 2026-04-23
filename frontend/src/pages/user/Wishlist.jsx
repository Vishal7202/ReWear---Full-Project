import React, { useEffect, useState } from "react";
import API from "@/utils/axios";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("rewear_user"));

        if (!user || user.role !== "user") {
          navigate("/unauthorized");
          return;
        }

        const res = await API.get(`/api/wishlist/${user._id}`);
        setWishlist(res.data || []);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [navigate]);

  const removeFromWishlist = async (id) => {
    try {
      await API.delete(`/api/wishlist/${id}`);
      setWishlist((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error removing:", error);
    }
  };

  return (
    <div className="bg-[#F8FAF8] min-h-screen pt-28 px-6 md:px-16">

      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        Your Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">
          No items in wishlist.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">

          {wishlist.map((w) => {
            const item = w.itemId;

            return (
              <div
                key={w._id}
                onClick={() => navigate(`/product/${item._id}`)}
                className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-44 w-full object-cover"
                />

                <div className="p-4">
                  <h2 className="text-sm font-semibold truncate text-gray-900">
                    {item.title}
                  </h2>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.category} • {item.size}
                  </p>

                  <div className="flex justify-between mt-3">

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${item._id}`);
                      }}
                      className="text-green-600 text-sm"
                    >
                      View
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(w._id);
                      }}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default Wishlist;