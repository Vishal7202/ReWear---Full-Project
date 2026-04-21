import React from "react";
import { UploadCloud, Coins, RefreshCw } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <UploadCloud size={30} />,
      title: "Upload",
      desc: "List your clothes with size, photos, and condition in just a few clicks.",
    },
    {
      icon: <Coins size={30} />,
      title: "Earn Points",
      desc: "Get rewarded when someone requests your item with ReWear points.",
    },
    {
      icon: <RefreshCw size={30} />,
      title: "Redeem",
      desc: "Use your points to request clothes and refresh your wardrobe sustainably.",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-16 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.12),transparent)]"></div>

      <div className="relative max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          How ReWear Works
        </h2>

        <p className="text-gray-400 mb-16 max-w-2xl mx-auto">
          A simple 3-step process to give your clothes a new life while helping others
          and saving money.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {steps.map((step, index) => (
            <div key={index} className="relative group">

              {/* Glow Layer */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur opacity-20 group-hover:opacity-40 transition rounded-2xl"></div>

              {/* Card */}
              <div className="relative bg-[#0B1220] border border-white/10 p-8 rounded-2xl hover:-translate-y-2 transition duration-300">

                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/20">
                  Step {index + 1}
                </div>

                {/* Icon */}
                <div className="text-cyan-400 mb-4 flex justify-center">
                  {step.icon}
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  {step.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;