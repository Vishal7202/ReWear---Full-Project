// src/pages/public/Home.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Hero from "../../components/features/Hero";
import Stats from "../../components/features/Stats";
import ListingsSection from "../../components/features/ListingsSection";
import Categories from "../../components/features/Categories";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-[#F8FAF8] min-h-screen text-black space-y-12 p-6">

      {/* 🟢 HERO */}
      <Hero />

      {/* 📊 STATS */}
      <Stats />

      {/* 🆕 CATEGORIES */}
      <Categories />

      {/* 🧩 FEATURES */}
      <section className="grid md:grid-cols-4 gap-6 bg-white p-6 rounded-2xl shadow-sm">
        <Feature title="Sustainable Choice" desc="Help reduce textile waste" />
        <Feature title="Quality Assured" desc="All items checked for quality" />
        <Feature title="Affordable Style" desc="Premium looks, less price" />
        <Feature title="Community Driven" desc="Join like-minded users" />
      </section>

      {/* 🧠 SMART MATCH */}
      <section className="bg-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">

        {/* LEFT */}
        <div>
          <h2 className="text-2xl font-bold">
            Find Your Perfect Match 🤖
          </h2>

          <p className="text-gray-500 mt-2">
            AI powered clothing recommendation system
          </p>

          <div className="flex gap-4 mt-4">
            
            {/* 🔥 UPDATED BUTTON */}
            <button
              onClick={() => {
                setLoading(true);
                setTimeout(() => navigate("/smartmatch"), 400);
              }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition hover:scale-105"
            >
              {loading ? (
                <>
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Loading...
                </>
              ) : (
                "Try Smart Match"
              )}
            </button>

            <button className="border px-5 py-2 rounded-lg hover:bg-gray-100 transition">
              Choose Preferences
            </button>
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="flex gap-4">
          {[1, 2, 3].map((i) => (
            <img
              key={i}
              src={`https://source.unsplash.com/200x200/?clothing&sig=${i}`}
              className="w-24 h-24 object-cover rounded-xl hover:scale-105 transition"
              alt="preview"
            />
          ))}
        </div>
      </section>

      {/* 🛍️ LISTINGS */}
      <ListingsSection />

      {/* 🟩 CTA */}
      <section className="bg-green-700 text-white p-10 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6">

        <div>
          <h2 className="text-2xl font-bold">
            Start Selling in 30 Seconds
          </h2>
          <p className="text-sm mt-2">
            Upload your clothes and earn instantly
          </p>
        </div>

        <button
          onClick={() => navigate("/upload")}
          className="bg-white text-green-700 px-6 py-2 rounded-lg hover:scale-105 transition"
        >
          Sell Now
        </button>
      </section>

    </div>
  );
};

const Feature = ({ title, desc }) => (
  <div className="text-center hover:scale-105 transition">
    <h3 className="font-semibold">{title}</h3>
    <p className="text-gray-500 text-sm mt-1">{desc}</p>
  </div>
);

export default Home;