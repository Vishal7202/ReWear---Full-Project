import React from "react";
import { UploadCloud, Coins, RefreshCw } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <UploadCloud size={32} />,
      title: "Upload",
      desc: "List your clothes with size, photos, and condition in just a few clicks.",
    },
    {
      icon: <Coins size={32} />,
      title: "Earn Points",
      desc: "Get rewarded when someone requests your item with ReWear points.",
    },
    {
      icon: <RefreshCw size={32} />,
      title: "Redeem",
      desc: "Use your points to request clothes and refresh your wardrobe sustainably.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-16 bg-[#F8FAFC]">

      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How <span className="text-green-600">ReWear</span> Works
        </h2>

        <p className="text-gray-600 mb-14 max-w-2xl mx-auto">
          A simple 3-step process to give your clothes a new life while helping others
          and saving money.
        </p>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >

              {/* Step Number */}
              <div className="mb-4 inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
                Step {index + 1}
              </div>

              {/* Icon */}
              <div className="text-green-600 mb-4 flex justify-center">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {step.title}
              </h3>

              <p className="text-gray-500 text-sm leading-relaxed">
                {step.desc}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;