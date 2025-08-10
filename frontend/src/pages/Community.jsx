// src/pages/Community.jsx
import React, { useState } from 'react';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      user: 'Riya Verma',
      message: 'Just exchanged my first item! Super easy and fun!',
      date: 'July 20, 2025',
    },
    {
      user: 'Aarav Mehta',
      message: 'Thanks ReWear! Donated 4 jackets to NGO through the app.',
      date: 'July 19, 2025',
    },
    {
      user: 'Sneha',
      message: 'Loved the UI and sustainability mission 💚',
      date: 'July 18, 2025',
    },
  ]);

  const [newStory, setNewStory] = useState('');
  const [message, setMessage] = useState('');

  const handlePost = () => {
    if (!newStory.trim()) {
      setMessage('Please write something before posting.');
      return;
    }

    const today = new Date().toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const newPost = {
      user: 'You',
      message: newStory,
      date: today,
    };

    setPosts([newPost, ...posts]);
    setNewStory('');
    setMessage('✅ Story shared successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen max-w-xl mx-auto px-6 py-8 bg-white dark:bg-gray-900 transition-colors duration-500">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">ReWear Community</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        Hear from others, share your stories, and stay connected with the mission.
      </p>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 border-l-4 border-indigo-600 dark:border-indigo-400 p-5 rounded shadow-sm transition duration-300 hover:shadow-md"
          >
            <p className="text-gray-800 dark:text-gray-200 italic">“{post.message}”</p>
            <p className="text-sm mt-3 text-indigo-700 dark:text-indigo-400 font-semibold">
              – {post.user}, {post.date}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Share Your Story</h2>
        <textarea
          rows="4"
          placeholder="Write your experience..."
          value={newStory}
          onChange={(e) => setNewStory(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded px-4 py-3 resize-none
                     bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        />
        <button
          onClick={handlePost}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          Post
        </button>

        {message && (
          <p className="mt-4 text-green-600 dark:text-green-400 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Community;
