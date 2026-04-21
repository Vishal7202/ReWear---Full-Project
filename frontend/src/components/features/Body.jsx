// src/components/Body.jsx
import React from "react";
import Hero from "./Hero";
import FeatureSection from "./FeatureSection";
import HowItWorks from "./HowItWorks";
import CTASection from "./CTASection";

const Body = () => {
  return (
    <main className="font-sans text-gray-800">
      <Hero />
      <FeatureSection />
      <HowItWorks />
      <CTASection />
    </main>
  );
};

export default Body;
