import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="relative py-24 text-center overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.2),transparent)]"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Ready to ReWear?
        </h2>

        <p className="text-gray-400 text-lg mb-10">
          Join a smarter, AI-powered clothing exchange community and start making impact today.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">

          <Link to="/signup">
            <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:scale-105 transition duration-300">
              Get Started
            </button>
          </Link>

          <Link to="/browse">
            <button className="px-8 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition duration-300">
              Explore First
            </button>
          </Link>

        </div>

        {/* trust line */}
        <p className="mt-8 text-sm text-gray-500">
          No spam • Free to use • AI powered
        </p>

      </div>
    </section>
  );
};

export default CTA;