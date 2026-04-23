import React, { useState } from "react";
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
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return alert("Enter email");
    alert("Subscribed successfully 🎉");
    setEmail("");
  };

  return (
    <footer className="bg-white text-gray-700 px-6 py-14 border-t">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* 🔥 BRAND */}
        <div>
          <img
  src={logo}
  className="h-14 md:h-16 object-contain drop-shadow-sm mb-4"
/>

          <p className="text-sm text-gray-500">
            Sustainable clothing exchange platform helping reduce waste and build community.
          </p>

          {/* 🌐 SOCIAL */}
          <div className="flex mt-4 space-x-4">
            <a href="#" target="_blank">
              <FaFacebook className="hover:text-green-600 transition" />
            </a>
            <a href="#" target="_blank">
              <FaTwitter className="hover:text-green-600 transition" />
            </a>
            <a href="#" target="_blank">
              <FaInstagram className="hover:text-green-600 transition" />
            </a>
            <a href="#" target="_blank">
              <FaLinkedin className="hover:text-green-600 transition" />
            </a>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSubscribe}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
            >
              Join
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-2">
            No spam. Only updates.
          </p>
        </div>
      </div>

      {/* 🔝 SCROLL TOP */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-3 rounded-full bg-green-100 hover:bg-green-200 transition shadow-sm"
        >
          <ArrowUp size={18} />
        </button>
      </div>

      {/* 🔚 BOTTOM */}
      <div className="text-center text-sm text-gray-400 mt-8 border-t pt-5">
        © {new Date().getFullYear()} ReWear. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;