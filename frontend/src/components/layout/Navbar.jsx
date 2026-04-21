import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  Moon,
  Sun,
  Globe2,
  Bot,
  Heart,
  Flag,
  BarChart2,
  MessageCircle,
} from "lucide-react";

import logo from "@/assets/logo.png";// ✅ FIXED

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("rewear_theme") === "dark"
  );
  const [language, setLanguage] = useState(
    () => localStorage.getItem("rewear_lang") || "en"
  );
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("rewear_user"));
    if (storedUser) setUser(storedUser);

    const handleUserUpdate = () => {
      const updatedUser = JSON.parse(localStorage.getItem("rewear_user"));
      setUser(updatedUser);
    };

    window.addEventListener("userLogin", handleUserUpdate);
    return () => window.removeEventListener("userLogin", handleUserUpdate);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("rewear_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("rewear_lang", language);
  }, [language]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/browse", label: "Browse" },
    { path: "/upload", label: "Upload" },
    { path: "/community", label: "Community" },
    { path: "/smart-match", label: "Smart Match" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#020617]/80 border-b border-white/10 shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="h-10 rounded-full border border-white/20" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ReWear
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm text-gray-300">

          {navItems.map((item) => (
            <Link key={item.path} to={item.path}
              className="relative hover:text-cyan-400 transition">
              {item.label}
            </Link>
          ))}

          {/* Features */}
          <div className="relative">
            <button onClick={() => setFeaturesOpen(!featuresOpen)}
              className="flex items-center gap-1 hover:text-cyan-400">
              Features <ChevronDown size={16} />
            </button>

            {featuresOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-[#0F172A] border border-white/10 rounded-xl shadow-xl">
                <Link to="/wishlist" className="block px-4 py-2 hover:bg-white/10">
                  <Heart size={14} className="inline mr-1" /> Wishlist
                </Link>
                <Link to="/report" className="block px-4 py-2 hover:bg-white/10">
                  <Flag size={14} className="inline mr-1" /> Report
                </Link>
                <Link to="/chat" className="block px-4 py-2 hover:bg-white/10">
                  <MessageCircle size={14} className="inline mr-1" /> Chat
                </Link>
                {user?.role === "admin" && (
                  <Link to="/admin-analytics" className="block px-4 py-2 hover:bg-white/10">
                    <BarChart2 size={14} className="inline mr-1" /> Analytics
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button onClick={() => alert("AI Assistant 🤖 Coming Soon")}>
            <Bot size={18} />
          </button>

          {/* Auth */}
          {!user ? (
            <Link to="/login"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:scale-105 transition">
              Login
            </Link>
          ) : (
            <button onClick={handleLogout}
              className="text-red-400 hover:text-red-500">
              Logout
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#020617] px-6 py-6 space-y-4 text-gray-300">

          {navItems.map((item) => (
            <Link key={item.path} to={item.path}
              className="block text-lg"
              onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}

          <Link to="/login"
            className="block text-center bg-gradient-to-r from-cyan-500 to-blue-500 py-2 rounded-xl">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;