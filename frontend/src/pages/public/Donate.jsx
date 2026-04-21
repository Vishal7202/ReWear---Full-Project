// src/pages/Donate.jsx
import React, { useState } from 'react';
import { FaHandHoldingHeart, FaTruckPickup, FaGift } from 'react-icons/fa';

const Donate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    date: '',
    time: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send formData to backend (API call)
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gradient-to-br from-purple-100 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-10 text-gray-800 dark:text-gray-100">
        <h1 className="text-4xl font-extrabold text-purple-700 dark:text-purple-400 mb-6 text-center">
          Donate Clothes with Care <FaHandHoldingHeart className="inline-block ml-2" />
        </h1>

        <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300 text-center">
          Have clothes you don’t want to list or exchange? Donate them and bring warmth to someone’s life.
        </p>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3 mb-8">
          <div className="bg-purple-50 dark:bg-gray-800 p-5 rounded-xl text-center">
            <FaGift className="text-3xl mx-auto text-purple-600 dark:text-purple-300 mb-2" />
            <p>Donations go to verified NGOs and underprivileged users.</p>
          </div>
          <div className="bg-purple-50 dark:bg-gray-800 p-5 rounded-xl text-center">
            <FaTruckPickup className="text-3xl mx-auto text-purple-600 dark:text-purple-300 mb-2" />
            <p>Schedule a free pickup or drop at a nearby center.</p>
          </div>
          <div className="bg-purple-50 dark:bg-gray-800 p-5 rounded-xl text-center">
            <FaHandHoldingHeart className="text-3xl mx-auto text-purple-600 dark:text-purple-300 mb-2" />
            <p>Earn <strong>+50 Karma Points</strong> for each donation!</p>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md dark:bg-gray-800 dark:border-gray-600"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
            <textarea
              name="address"
              required
              placeholder="Pickup Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-md dark:bg-gray-800 dark:border-gray-600"
              rows={3}
            ></textarea>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md dark:bg-gray-800 dark:border-gray-600"
              />
              <input
                type="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-md dark:bg-gray-800 dark:border-gray-600"
              />
            </div>

            <div className="text-center pt-4">
              <button
                type="submit"
                className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
              >
                Confirm Pickup & Earn Karma
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center mt-10">
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">
              ✅ Donation Pickup Scheduled Successfully!
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mt-2">
              You've earned <strong>+50 Karma Points</strong>. Thank you for spreading kindness 💜
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donate;
