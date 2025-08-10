// src/components/FeatureSection.jsx
import React from "react";

const FeatureSection = () => {
  const features = [
    { icon: "👕", title: "Donate Clothes", desc: "Pass on unused clothes to those in need." },
    { icon: "🔁", title: "Exchange Items", desc: "Swap clothes with other users." },
    { icon: "✋", title: "Request Help", desc: "Request clothes for yourself or others." }
  ];

  return (
    <section id="features" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-3 text-center">
        {features.map((f, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
