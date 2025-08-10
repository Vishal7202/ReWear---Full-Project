// src/components/Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <section className="bg-indigo-600 text-white py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ReWear</h1>
      <p className="text-lg md:text-xl mb-6">Exchange, Donate or Request Clothes – Sustainably</p>
      <a href="#features" className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
        Get Started
      </a>
    </section>
  );
};

export default Hero;
