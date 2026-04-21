import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { ArrowUp } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 px-6 py-14 border-t">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* 🔥 BRAND */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img src={logo} className="h-10 w-10 rounded-full" />
            <div>
              <h2 className="text-xl font-bold text-green-600">
                ReWear
              </h2>
              <p className="text-sm text-gray-500">
                Give Clothes a Second Life
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Sustainable clothing exchange platform helping reduce waste and build community.
          </p>

          {/* Social */}
          <div className="flex mt-4 space-x-4">
            <FaFacebook className="text-lg hover:text-green-600 cursor-pointer" />
            <FaTwitter className="text-lg hover:text-green-600 cursor-pointer" />
            <FaInstagram className="text-lg hover:text-green-600 cursor-pointer" />
            <FaLinkedin className="text-lg hover:text-green-600 cursor-pointer" />
          </div>
        </div>

        {/* 🔗 LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-green-600">Home</Link></li>
            <li><Link to="/browse" className="hover:text-green-600">Browse</Link></li>
            <li><Link to="/upload" className="hover:text-green-600">Sell</Link></li>
            <li><Link to="/smartmatch" className="hover:text-green-600">Smart Match</Link></li>
          </ul>
        </div>

        {/* 🛠 SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-green-600">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-green-600">Help Center</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-green-600">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-green-600">Terms</Link></li>
          </ul>
        </div>

        {/* 📩 NEWSLETTER */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
              Join
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            No spam. Only updates.
          </p>
        </div>
      </div>

      {/* 🔝 Scroll Top */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-3 rounded-full bg-green-100 hover:bg-green-200 transition"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-400 mt-8 border-t pt-5">
        © {new Date().getFullYear()} ReWear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;