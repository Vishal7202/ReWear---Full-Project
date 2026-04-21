import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { ArrowUp } from "lucide-react";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[#020617] via-[#0F172A] to-[#020617] text-gray-300 px-6 py-16 overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.1),transparent)]"></div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* 🔥 BRAND */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img src={logo} className="h-12 w-12 rounded-full border border-white/20" />
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                ReWear
              </h2>
              <p className="text-sm text-gray-400 -mt-1">
                Give Clothes a Second Life
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            Smart AI-powered clothing exchange platform focused on sustainability and community.
          </p>

          {/* Social Links */}
          <div className="flex mt-4 space-x-4">
            <a href="#" target="_blank">
              <FaFacebook className="text-xl hover:text-cyan-400 transition" />
            </a>
            <a href="#">
              <FaTwitter className="text-xl hover:text-cyan-400 transition" />
            </a>
            <a href="#">
              <FaInstagram className="text-xl hover:text-pink-400 transition" />
            </a>
            <a href="#">
              <FaLinkedin className="text-xl hover:text-blue-400 transition" />
            </a>
          </div>
        </div>

        {/* 🔗 LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-cyan-400">Home</Link></li>
            <li><Link to="/browse" className="hover:text-cyan-400">Browse</Link></li>
            <li><Link to="/upload" className="hover:text-cyan-400">Upload</Link></li>
            <li><Link to="/ai" className="hover:text-cyan-400">AI Assistant</Link></li>
          </ul>
        </div>

        {/* 🛠 SUPPORT */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:text-cyan-400">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-cyan-400">Help Center</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-cyan-400">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-cyan-400">Terms</Link></li>
          </ul>
        </div>

        {/* 📩 NEWSLETTER */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-3 py-2 rounded-lg bg-[#0B1220] border border-white/10 text-sm"
            />
            <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-sm">
              Join
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            No spam. Only updates.
          </p>
        </div>
      </div>

      {/* 🔝 Scroll Top */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-white/10 pt-5">
        © {new Date().getFullYear()} ReWear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;