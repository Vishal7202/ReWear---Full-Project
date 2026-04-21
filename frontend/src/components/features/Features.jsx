import React from "react";
import { Bot, ShieldCheck, Activity } from "lucide-react";

const Features = () => {
  return (
    <section className="py-20 px-6 md:px-16 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.12),transparent)]"></div>

      <div className="relative max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Why Use ReWear?
        </h2>

        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Our intelligent system makes donating and receiving clothes seamless,
          efficient, and community-driven.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <FeatureCard
            icon={<Bot size={28} />}
            title="Smart Match"
            desc="AI connects the right donor with the right seeker instantly."
          />

          <FeatureCard
            icon={<ShieldCheck size={28} />}
            title="Verified Community"
            desc="Secure and trusted users with verified profiles only."
          />

          <FeatureCard
            icon={<Activity size={28} />}
            title="Track Exchanges"
            desc="Monitor where your clothes go and track every exchange."
          />

        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div className="relative group">

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur opacity-20 group-hover:opacity-40 transition rounded-2xl"></div>

      {/* Card */}
      <div className="relative bg-[#0B1220] border border-white/10 p-6 rounded-2xl hover:-translate-y-2 transition duration-300">

        <div className="text-cyan-400 mb-4 flex justify-center">
          {icon}
        </div>

        <h3 className="font-semibold text-lg mb-2">
          {title}
        </h3>

        <p className="text-gray-400 text-sm">
          {desc}
        </p>

      </div>
    </div>
  );
};

export default Features;