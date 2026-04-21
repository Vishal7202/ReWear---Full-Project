import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";
import clothImg from "@/assets/clothes/cloth.jpg";
import { Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const SmartMatch = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null);
  const [requestedItems, setRequestedItems] = useState([]);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("Please login first");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/smartmatch", {
        preferredSize: localStorage.getItem("preferredSize") || "M",
        preferredGender: localStorage.getItem("preferredGender") || "Male",
        preferredCategory: localStorage.getItem("preferredCategory") || "T-Shirt",
        excludeUserId: userId,
      });

      setMatches(res.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load matches");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestMatch = async (item) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("Login required");
      return;
    }

    if (requestedItems.includes(item._id)) return;

    try {
      setLoadingId(item._id);

      await axios.post("/smartmatch/request", {
        matchId: item._id,
        title: item.title,
        size: item.size,
        gender: item.gender,
        category: item.category,
        image: item.image,
        userId,
      });

      toast.success("Match request sent 🚀");
      setRequestedItems((prev) => [...prev, item._id]);
    } catch (err) {
      toast.error("Failed to send request");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] px-6 py-10">
      <ToastContainer position="top-center" />

      {/* 🔥 HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          🎯 Smart Match Suggestions
        </h1>
        <p className="text-gray-500 mt-2">
          AI-powered recommendations just for you
        </p>
      </div>

      {/* ⏳ LOADING */}
      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-green-600" size={32} />
        </div>
      )}

      {/* 🛍️ GRID */}
      {!loading && matches.length > 0 && (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {matches.map((item) => {
            const matchScore = Math.floor(Math.random() * 20) + 80; // demo AI %

            return (
              <div
                key={item._id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden border"
              >
                {/* IMAGE */}
                <div className="relative">
                  <img
                    src={item.image || clothImg}
                    className="h-48 w-full object-cover group-hover:scale-105 transition"
                    onError={(e) => (e.target.src = clothImg)}
                  />

                  {/* MATCH BADGE */}
                  <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                    {matchScore}% Match
                  </span>
                </div>

                {/* INFO */}
                <div className="p-3">
                  <h2 className="font-semibold text-sm truncate">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 text-xs mt-1">
                    {item.size} • {item.category}
                  </p>

                  {/* BUTTON */}
                  <button
                    onClick={() => handleRequestMatch(item)}
                    disabled={
                      loadingId === item._id ||
                      requestedItems.includes(item._id)
                    }
                    className={`mt-3 w-full py-2 rounded text-sm transition ${
                      requestedItems.includes(item._id)
                        ? "bg-gray-300 text-gray-600"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {requestedItems.includes(item._id)
                      ? "✔ Requested"
                      : loadingId === item._id
                      ? "Requesting..."
                      : "Request Match"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ❌ EMPTY */}
      {!loading && matches.length === 0 && (
        <p className="text-center text-gray-500">
          No matches found 😕
        </p>
      )}
    </div>
  );
};

export default SmartMatch;