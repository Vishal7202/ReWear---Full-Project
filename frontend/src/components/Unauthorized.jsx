import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-100 via-red-200 to-red-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">🚫 Unauthorized Access</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
