import React from "react";

import Hero from "../components/features/Hero";
import HowItWorks from "../components/features/HowItWorks";
import Community from "./Community";
import Contact from "./Contact";

const LandingPage = () => {
  return (
    <div className="bg-[#F8FAF8]">

      {/* HERO */}
      <section id="home">
        <Hero />
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* COMMUNITY */}
      <section id="community" className="px-6 md:px-16 py-20">
        <Community />
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 md:px-16 py-20">
        <Contact />
      </section>

    </div>
  );
};

export default LandingPage;