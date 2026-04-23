// src/pages/HowItWorks.jsx
import React from "react";
import { UploadCloud, Coins, Search, Truck, RefreshCw } from "lucide-react";

const steps = [
  {
    icon: <UploadCloud size={28} />,
    title: "Upload Clothes",
    description: "List clothes you no longer use with size, condition, and details.",
  },
  {
    icon: <Coins size={28} />,
    title: "Earn Points",
    description: "Get ReWear points for every approved listing.",
  },
  {
    icon: <Search size={28} />,
    title: "Browse & Request",
    description: "Use points to request clothes from others.",
  },
  {
    icon: <Truck size={28} />,
    title: "Handover / Ship",
    description: "Coordinate delivery or meet locally.",
  },
  {
    icon: <RefreshCw size={28} />,
    title: "Close the Loop",
    description: "Rate the exchange and keep the cycle going.",
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-[#F8FAF8] min-h-screen pt-28 px-6 md:px-16">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            How <span className="text-green-600">ReWear</span> Works
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            A simple process to reuse clothes and reduce waste.
          </p>
        </div>

        {/* STEPS */}
        <div className="space-y-8 relative">

          {/* Vertical line */}
          <div className="hidden md:block absolute left-6 top-0 bottom-0 w-[2px] bg-green-100"></div>

          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 items-start">

              {/* ICON + DOT */}
              <div className="relative z-10">
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-full shadow-sm">
                  {step.icon}
                </div>
              </div>

              {/* CARD */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition w-full">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {index + 1}. {step.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default HowItWorks;