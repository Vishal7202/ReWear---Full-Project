// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '@/assets/logo.png'; // Make sure path is correct

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* ReWear Brand Info */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img src={logo} alt="ReWear Logo" className="h-12 w-12 rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-white">ReWear</h2>
              <p className="text-sm text-indigo-300 -mt-1">Give Clothes a Second Life</p>
            </div>
          </div>
          <p className="text-sm text-gray-400">
            A community-driven clothing exchange platform. Share, swap, and support sustainable fashion.
          </p>
          <div className="flex mt-4 space-x-3">
            <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className="text-xl hover:text-blue-500" />
            </a>
            <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="text-xl hover:text-sky-400" />
            </a>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="text-xl hover:text-pink-500" />
            </a>
            <a href="https://linkedin.com/company/yourcompany" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="text-xl hover:text-blue-600" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
  <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
  <ul className="space-y-2 text-sm text-gray-400">
    <li><Link to="/" className="hover:text-white">Home</Link></li>
    <li><Link to="/smartmatch" className="hover:text-white">Smart Match</Link></li> {/* yeh sahi hai */}
    <li><Link to="/donate" className="hover:text-white">Donate</Link></li>
    <li><Link to="/my-listings" className="hover:text-white">My Listings</Link></li>
  </ul>
</div>


        {/* Help Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* App Downloads and Payment Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get Our App</h3>
          <div className="flex flex-col gap-3 mb-4">
            <a href="https://play.google.com/store/apps/details?id=yourapp" target="_blank" rel="noopener noreferrer">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="w-32"
              />
            </a>
            <a href="https://apps.apple.com/app/yourapp" target="_blank" rel="noopener noreferrer">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="w-32"
              />
            </a>
          </div>
          <h3 className="text-lg font-semibold mb-2">Payment Methods</h3>
          <div className="flex gap-2">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="w-10" />
            <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" className="w-10" />
            <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" className="w-10" />
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} ReWear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
