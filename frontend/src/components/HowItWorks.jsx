import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8">
          How ReWear Works
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Join our community of conscious shoppers. Here’s how easy it is to give your clothes a new life,
          save money, and help the environment.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">1. Upload</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              List your gently used clothes with details like size, photos, and condition.
              It only takes a few minutes to make your item available for the community.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">2. Earn Points</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              When someone requests your item, you earn ReWear Points which you can redeem later.
              It’s our way of rewarding your contribution to sustainability.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">3. Redeem</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Use your points to request clothes uploaded by others and refresh your wardrobe
              without spending extra money. Sustainable fashion made easy!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
