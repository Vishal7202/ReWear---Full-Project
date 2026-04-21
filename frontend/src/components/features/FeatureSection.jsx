import React from "react";
import { Shirt, Repeat, HandHelping } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <Shirt size={30} />,
      title: "Donate Clothes",
      desc: "Pass on unused clothes to those in need.",
    },
    {
      icon: <Repeat size={30} />,
      title: "Exchange Items",
      desc: "Swap clothes with other users easily.",
    },
    {
      icon: <HandHelping size={30} />,
      title: "Request Help",
      desc: "Request clothes for yourself or others.",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 px-6 md:px-16 relative overflow-hidden"
    >
      {/* 🌌 Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent)]"></div>

      <div className="relative max-w-6xl mx-auto text-center">

        {/* 🔥 Heading */}
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Core Features
        </h2>

        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Everything you need to donate, exchange and request clothes in a smart,
          sustainable way.
        </p>

        {/* 📦 Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <div key={i} className="relative group">

              {/* Glow Layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur opacity-20 group-hover:opacity-40 transition rounded-2xl"></div>

              {/* Card */}
              <div className="relative bg-[#0B1220] border border-white/10 p-6 rounded-2xl hover:-translate-y-2 transition duration-300">

                <div className="text-cyan-400 mb-4 flex justify-center">
                  {f.icon}
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  {f.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {f.desc}
                </p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;