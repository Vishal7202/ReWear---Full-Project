// src/pages/HowItWorks.jsx
import React from 'react';

const steps = [
  {
    title: '1. Upload Clothes',
    description: 'List clothes you no longer use. Add details like size, condition, and category.',
  },
  {
    title: '2. Earn Points',
    description: 'Every approved upload gives you ReWear points to redeem clothes from others.',
  },
  {
    title: '3. Browse & Request',
    description: 'Use your points to request clothes listed by other community members.',
  },
  {
    title: '4. Handover/Ship',
    description: 'Coordinate for pickup or drop-off via community or delivery partner.',
  },
  {
    title: '5. Close the Loop',
    description: 'Rate the experience and keep the exchange going!',
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-white to-purple-50">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-10">How ReWear Works</h1>
      <div className="max-w-4xl mx-auto space-y-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white border border-purple-100 rounded-lg shadow-sm p-6 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-purple-700 mb-2">{step.title}</h2>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
