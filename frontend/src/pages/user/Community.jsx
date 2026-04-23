import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import API from "@/utils/axios";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newStory, setNewStory] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  // 📥 FETCH POSTS
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/api/posts");
        setPosts(res.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 🚀 POST STORY
  const handlePost = async () => {
    if (!newStory.trim()) return;

    setPosting(true);

    try {
      const res = await API.post("/api/posts", {
        user: "You",
        message: newStory,
      });

      setPosts([res.data, ...posts]);
      setNewStory("");
    } catch (err) {
      console.error(err);
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="bg-[#F8FAF8] min-h-screen pt-28 px-6 md:px-16">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          ReWear Community
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Real stories from our users 🌱
        </p>
      </div>

      {/* POSTS */}
      <div className="max-w-3xl mx-auto space-y-5">

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-400">No posts yet</p>
        ) : (
          posts.map((post, index) => (
            <div
              key={post._id || index}
              className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition"
            >
              <p className="text-gray-700 italic">“{post.message}”</p>

              <div className="flex justify-between mt-3 text-xs text-gray-500">
                <span className="font-medium text-green-600">
                  {post.user || "Anonymous"}
                </span>
                <span>
                  {post.createdAt
                    ? new Date(post.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* POST BOX */}
      <div className="max-w-3xl mx-auto mt-10">

        <div className="bg-white p-6 rounded-2xl shadow-sm border">

          <h2 className="text-lg font-semibold mb-3 text-gray-900">
            Share Your Story
          </h2>

          <textarea
            rows="4"
            placeholder="Write your experience..."
            value={newStory}
            onChange={(e) => setNewStory(e.target.value)}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none text-sm"
          />

          <button
            onClick={handlePost}
            disabled={posting}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            <Send size={16} />
            {posting ? "Posting..." : "Post Story"}
          </button>

        </div>
      </div>

    </div>
  );
};

export default Community;