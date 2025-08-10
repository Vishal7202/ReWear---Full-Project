import React from 'react';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to ReWear?</h2>
        <p className="text-lg text-gray-700 mb-6">Join our community and start exchanging today!</p>
        <Link to="/signup">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition">
            Get Started
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CTA;
