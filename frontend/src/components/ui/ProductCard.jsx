import { Heart } from "lucide-react";
import { useState } from "react";

const ProductCard = ({ item }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative">

      {/* ❤️ Wishlist */}
      <button
        onClick={() => setLiked(!liked)}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:scale-110 transition"
      >
        <Heart
          size={18}
          className={liked ? "fill-red-500 text-red-500" : "text-gray-500"}
        />
      </button>

      {/* 🏷️ CONDITION BADGE */}
      {item.condition && (
        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow">
          {item.condition}
        </span>
      )}

      {/* 🖼 IMAGE */}
      <div className="overflow-hidden">
        <img
          src={
            item.imageUrl ||
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500"
          }
          alt={item.title}
          className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
        />
      </div>

      {/* 📦 INFO */}
      <div className="p-3">
        {/* TITLE */}
        <h3 className="font-semibold text-sm line-clamp-1">
          {item.title}
        </h3>

        {/* META */}
        <p className="text-gray-500 text-xs mt-1">
          {item.category} • {item.size}
        </p>

        {/* PRICE + MATCH */}
        <div className="flex justify-between items-center mt-2">

          {/* 💰 PRICE */}
          <p className="text-green-600 font-bold text-sm">
            ₹{item.price || 499}
          </p>

          {/* 🤖 MATCH BADGE */}
          {item.matchScore && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
              {item.matchScore}% Match
            </span>
          )}
        </div>
      </div>

      {/* 🟢 HOVER ACTION */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur p-3 translate-y-full group-hover:translate-y-0 transition duration-300">
        <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;