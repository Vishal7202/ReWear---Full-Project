// src/pages/Home.jsx

import React from "react";
import { Shirt, HandHeart, Users, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white">

      {/* HERO */}
      <section className="py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent)]"></div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
          <img src={logo} className="w-20 mx-auto mb-6 rounded-full border border-white/20" />

          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ReWear
          </h1>

          <p className="mt-4 text-gray-400 text-lg">
            AI Powered Clothing Exchange Platform
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate("/browse")}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:scale-105 transition"
            >
              Explore
            </button>

            <button
              onClick={() => navigate("/upload")}
              className="px-8 py-3 border border-white/20 rounded-xl hover:bg-white/10"
            >
              Upload
            </button>
          </div>
        </motion.div>
      </section>

      {/* DIVIDER */}
      <div className="h-px bg-white/10 w-full"></div>

      {/* FEATURES */}
      <section className="py-24">
        <h2 className="text-3xl text-center mb-12 font-bold">Why ReWear?</h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
          <Feature icon={<Shirt />} title="Upload" desc="List clothes easily" />
          <Feature icon={<HandHeart />} title="Donate" desc="Help people" />
          <Feature icon={<Users />} title="Community" desc="Connect users" />
          <Feature icon={<Bot />} title="AI Match" desc="Smart suggestions" />
        </div>
      </section>

      {/* DIVIDER */}
      <div className="h-px bg-white/10 w-full"></div>

      {/* STATS */}
      <section className="py-24">
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto px-6 text-center">
          <Stat number="10K+" label="Users" />
          <Stat number="25K+" label="Clothes Shared" />
          <Stat number="500+" label="Communities" />
          <Stat number="AI Powered" label="Matching" />
        </div>
      </section>

      {/* AI CTA */}
      <section className="py-24 text-center bg-gradient-to-b from-[#020617] to-[#0B1220]">
        <h2 className="text-4xl text-cyan-400 font-bold mb-4">
          Smart AI Assistant
        </h2>

        <p className="text-gray-400 mb-6">
          Ask anything about clothing, sustainability or outfit ideas.
        </p>

        <button
          onClick={() => navigate("/chat")}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:scale-105"
        >
          Try AI Assistant
        </button>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Start?</h2>

        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl hover:scale-105"
        >
          Get Started
        </button>
      </section>

    </div>
  );
};

const Feature = ({ icon, title, desc }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur">
    <div className="text-cyan-400 mb-3">{icon}</div>
    <h3 className="font-semibold">{title}</h3>
    <p className="text-gray-400 text-sm">{desc}</p>
  </motion.div>
);

const Stat = ({ number, label }) => (
  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
    <h3 className="text-2xl text-cyan-400 font-bold">{number}</h3>
    <p className="text-gray-400">{label}</p>
  </div>
);

export default Home;