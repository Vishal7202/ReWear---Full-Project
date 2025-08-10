import React from 'react';

const Features = () => {
  return (
    <section className="py-12 bg-white text-center">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Use ReWear?</h2>
        <p className="text-gray-600 mb-8">Our key features make donating and receiving clothes easy, fun, and community-driven.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-purple-600 mb-2">Smart Match</h3>
            <p className="text-gray-700">AI helps connect the right donor to the right seeker.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-purple-600 mb-2">Verified Community</h3>
            <p className="text-gray-700">Only real people with verified profiles exchange.</p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h3 className="font-semibold text-lg text-purple-600 mb-2">Track Exchanges</h3>
            <p className="text-gray-700">Know where your clothes go and help others better.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
