import React, { useState, useEffect } from 'react';
import { CheckCircle, Moon, Sun } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all fields!');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div
      className={`${
        darkMode
          ? 'bg-gray-900 text-gray-200'
          : 'bg-gradient-to-r from-purple-100 via-purple-50 to-white text-purple-900'
      } min-h-[70vh] flex flex-col items-center justify-center px-6 py-8 transition-colors duration-500 relative`}
    >
      {/* Dark Mode Toggle Button */}
      <button
        aria-label="Toggle Dark Mode"
        onClick={() => setDarkMode((prev) => !prev)}
        className="absolute top-6 right-6 p-2 rounded-full bg-purple-200 dark:bg-gray-700 text-purple-700 dark:text-gray-200 shadow-md hover:shadow-lg transition"
      >
        {darkMode ? <Sun size={22} /> : <Moon size={22} />}
      </button>

      <h1
        className={`${
          darkMode ? 'text-purple-300' : 'text-purple-800'
        } text-4xl font-extrabold mb-2 drop-shadow-md`}
      >
        Contact Us
      </h1>

      <p
        className={`mb-8 max-w-xl text-center text-base font-medium transition-colors duration-500 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        Have a question, feedback, or just want to say hello? Fill out the form below and
        we'll get back to you promptly!
      </p>

      {isSubmitted ? (
        <div
          className={`p-6 rounded-2xl shadow-lg flex flex-col items-center max-w-md animate-fade-in transition-colors duration-500 ${
            darkMode ? 'bg-green-900 text-green-400' : 'bg-green-50 text-green-900'
          }`}
        >
          <CheckCircle
            className={`w-12 h-12 mb-3 ${darkMode ? 'text-green-400' : 'text-green-700'}`}
          />
          <p className="text-lg font-semibold mb-2">Thank you! We have received your message.</p>
          <button
            className={`mt-4 font-semibold underline transition hover:text-purple-700 ${
              darkMode ? 'text-purple-300 hover:text-purple-400' : 'text-purple-700 hover:text-purple-900'
            }`}
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className={`w-full max-w-md p-8 rounded-3xl shadow-2xl space-y-5 transition-colors duration-500 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}
          autoComplete="off"
        >
          <div>
            <label
              className={`block font-semibold mb-1 tracking-wide ${
                darkMode ? 'text-purple-300' : 'text-purple-700'
              }`}
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className={`w-full rounded-xl px-4 py-2 shadow-sm border transition focus:outline-none focus:ring-4 focus:ring-purple-300 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-purple-600'
                  : 'bg-white border-purple-300 text-gray-900 placeholder-gray-600 focus:ring-purple-300'
              }`}
            />
          </div>

          <div>
            <label
              className={`block font-semibold mb-1 tracking-wide ${
                darkMode ? 'text-purple-300' : 'text-purple-700'
              }`}
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className={`w-full rounded-xl px-4 py-2 shadow-sm border transition focus:outline-none focus:ring-4 focus:ring-purple-300 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-purple-600'
                  : 'bg-white border-purple-300 text-gray-900 placeholder-gray-600 focus:ring-purple-300'
              }`}
            />
          </div>

          <div>
            <label
              className={`block font-semibold mb-1 tracking-wide ${
                darkMode ? 'text-purple-300' : 'text-purple-700'
              }`}
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Write your message here..."
              required
              className={`w-full rounded-xl px-4 py-2 shadow-sm border transition resize-none focus:outline-none focus:ring-4 focus:ring-purple-300 ${
                darkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400 focus:ring-purple-600'
                  : 'bg-white border-purple-300 text-gray-900 placeholder-gray-600 focus:ring-purple-300'
              }`}
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-2xl font-semibold shadow-lg transition-colors duration-300 ${
              loading
                ? 'bg-purple-500 cursor-not-allowed opacity-70 text-white'
                : darkMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-purple-700 hover:bg-purple-800 text-white'
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}

      <style>{`
        @keyframes fadeIn {
          0% {opacity: 0;}
          100% {opacity: 1;}
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Contact;
