import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/browse?search=${search}`);
  };

  return (
    <section className="bg-white p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-12 shadow-sm">

      {/* LEFT */}
      <div className="max-w-xl">

        {/* 🔥 HEADING */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Good for Style. <br />
          Better for <span className="text-green-600">Planet.</span>
        </h1>

        {/* DESC */}
        <p className="text-gray-600 mt-4">
          Buy, sell and rewear quality pre-loved clothing.
          Reduce waste. Save money. Make impact.
        </p>

        {/* 🔍 SEARCH */}
        <div className="mt-6 flex gap-2">
          <input
            type="text"
            placeholder="Search clothes, brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-6 rounded-xl hover:bg-green-700 transition"
          >
            Search
          </button>
        </div>

        {/* 🏷 TAGS */}
        <div className="flex gap-2 mt-4 flex-wrap">
          {["Men", "Women", "Kids", "Under ₹500", "Trending"].map((tag) => (
            <span
              key={tag}
              onClick={() => navigate(`/browse?category=${tag}`)}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm cursor-pointer hover:bg-green-100 transition"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 🎯 CTA BUTTONS */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/browse")}
            className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
          >
            Explore
          </button>

          <button
            onClick={() => navigate("/upload")}
            className="border px-6 py-2 rounded-xl hover:bg-gray-100 transition"
          >
            Upload Item
          </button>
        </div>

        {/* 👥 TRUST */}
        <div className="flex items-center gap-4 mt-6">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/40?img=${i}`}
                className="w-8 h-8 rounded-full border"
                alt="user"
              />
            ))}
          </div>

          <p className="text-sm text-gray-600">
            <span className="font-bold">12,500+</span> Happy Rewearers
          </p>
        </div>

      </div>

      {/* RIGHT IMAGE */}
      <div className="relative">

        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=900"
          alt="clothes"
          className="w-[320px] md:w-[450px] rounded-2xl object-cover shadow-md"
        />

        {/* 🔥 FLOAT CARD */}
        <div className="absolute bottom-5 right-5 bg-white px-4 py-3 rounded-xl shadow-lg text-sm border">
          <p className="font-semibold text-gray-700">
            🌱 Sustainable Impact
          </p>
          <p className="text-green-600 font-bold">
            2,300+ kg Waste Saved
          </p>
        </div>

      </div>

    </section>
  );
};

export default Hero;