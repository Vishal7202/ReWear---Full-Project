import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import axios from "../utils/axios";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newStory, setNewStory] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ FETCH POSTS FROM BACKEND
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ✅ CREATE POST (REAL)
  const handlePost = async () => {
    if (!newStory.trim()) {
      setMessage("Please write something before posting.");
      return;
    }

    try {
      const res = await axios.post("/posts", {
        user: "You",
        message: newStory,
      });

      setPosts([res.data, ...posts]);
      setNewStory("");
      setMessage("✅ Story shared successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to post");
    }

    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-12">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          ReWear Community
        </h1>
        <p className="text-gray-400 mt-2">
          Real stories from real users 🌱
        </p>
      </div>

      {/* POSTS */}
      <div className="max-w-3xl mx-auto space-y-6">

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet</p>
        ) : (
          posts.map((post, index) => (
            <motion.div
              key={post._id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white/5 backdrop-blur border border-white/10 p-5 rounded-2xl hover:scale-[1.02] transition"
            >
              <p className="text-gray-200 italic">“{post.message}”</p>

              <div className="flex justify-between items-center mt-4 text-sm">
                <span className="text-cyan-400 font-semibold">
                  {post.user || "Anonymous"}
                </span>
                <span className="text-gray-500">
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>
            </motion.div>
          ))
        )}

      </div>

      {/* POST BOX */}
      <div className="max-w-3xl mx-auto mt-12">

        <div className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl">

          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-cyan-400">
            <Sparkles size={18} />
            Share Your Story
          </h2>

          <textarea
            rows="4"
            placeholder="Write your experience..."
            value={newStory}
            onChange={(e) => setNewStory(e.target.value)}
            className="w-full p-4 rounded-xl bg-transparent border border-white/10 focus:ring-2 focus:ring-cyan-500 outline-none text-gray-200 placeholder-gray-500"
          />

          <button
            onClick={handlePost}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:scale-105 transition"
          >
            <Send size={16} />
            Post Story
          </button>

          {message && (
            <p className="mt-4 text-green-400 text-sm font-medium">
              {message}
            </p>
          )}
        </div>

      </div>

    </div>
  );
};

export default Community;