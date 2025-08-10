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

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("rewear_theme") === "dark"
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
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("rewear_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("rewear_theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("rewear_lang", language);
  }, [language]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        setFeaturesOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileOpen &&
        !e.target.closest(".profile-dropdown") &&
        !e.target.closest(".profile-button")
      ) {
        setProfileOpen(false);
      }
      if (
        featuresOpen &&
        !e.target.closest(".features-dropdown") &&
        !e.target.closest(".features-button")
      ) {
        setFeaturesOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [profileOpen, featuresOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleProfile = () => setProfileOpen((prev) => !prev);
  const toggleFeatures = () => setFeaturesOpen((prev) => !prev);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleLanguage = () => setLanguage((prev) => (prev === "en" ? "hi" : "en"));

  const handleLogout = () => {
    localStorage.removeItem("rewear_user");
    localStorage.removeItem("token");
    setUser(null);
    window.dispatchEvent(new Event("userLogin"));
    navigate("/login");
  };

  const handleChatbotClick = () => {
    alert("Hi! I'm ReWear Assistant 👕✨ How can I help you?");
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/browse", label: "Browse" },
    { path: "/upload", label: "Upload" },
    { path: "/community", label: "Community" },
    { path: "/smart-match", label: "Smart Match" },
    { path: "/contact", label: "Contact" },
    { path: "/how-it-works", label: "How It Works" },
  ];

  return (
    <nav className="bg-gradient-to-r from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-sm sticky top-0 z-50 font-sans backdrop-blur-md transition-colors">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
  <img src="/src/assets/logo.png" alt="ReWear Logo" className="h-10 w-auto object-contain" />
  <span className="text-xl font-bold text-indigo-700">ReWear</span>
</Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center text-[15px] font-medium text-gray-700 dark:text-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              {item.label}
            </Link>
          ))}

          {/* Features Dropdown */}
          <div className="relative">
            <button
              onClick={toggleFeatures}
              className="flex items-center space-x-1 hover:text-indigo-600 dark:hover:text-indigo-400 features-button"
              type="button"
              aria-haspopup="true"
              aria-expanded={featuresOpen}
            >
              <span>Features</span>
              <ChevronDown size={16} />
            </button>
            {featuresOpen && (
              <div
                className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg features-dropdown"
                role="menu"
              >
                <Link
                  to="/wishlist"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setFeaturesOpen(false)}
                >
                  <Heart className="inline mr-1" size={14} /> Wishlist
                </Link>
                <Link
                  to="/report"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setFeaturesOpen(false)}
                >
                  <Flag className="inline mr-1" size={14} /> Report
                </Link>
                <Link
                  to="/chat"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setFeaturesOpen(false)}
                >
                  <MessageCircle className="inline mr-1" size={14} /> Chat
                </Link>
                {user && user.role === "admin" && (
                  <Link
                    to="/admin-analytics"
                    className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setFeaturesOpen(false)}
                  >
                    <BarChart2 className="inline mr-1" size={14} /> Analytics
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
            title="Change Language"
            type="button"
          >
            <Globe2 size={18} />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
            title="Toggle Theme"
            type="button"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Chat Assistant */}
          <button
            onClick={handleChatbotClick}
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
            title="Chat Assistant"
            type="button"
          >
            <Bot size={20} />
          </button>

          {/* User Profile / Login */}
          {!user ? (
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-1.5 rounded hover:bg-indigo-700 transition"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 hover:text-indigo-700 focus:outline-none profile-button"
                type="button"
              >
                <img
                  src={user.avatar || "https://i.pravatar.cc/150?u=user"}
                  alt="Avatar"
                  className="w-9 h-9 rounded-full object-cover border-2 border-indigo-600"
                />
                <ChevronDown size={16} />
              </button>
              {profileOpen && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 border shadow-xl rounded-md overflow-hidden z-50 profile-dropdown"
                  role="menu"
                >
                  {user.role === "user" ? (
                    <>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/my-listings"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Listings
                      </Link>
                      <Link
                        to="/my-requests"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        My Requests
                      </Link>
                    </>
                  ) : user.role === "admin" ? (
                    <>
                      <Link
                        to="/manage-listings"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        Manage Listings
                      </Link>
                      <Link
                        to="/manage-users"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        Manage Users
                      </Link>
                      <Link
                        to="/admin-analytics"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileOpen(false)}
                      >
                        Analytics
                      </Link>
                    </>
                  ) : null}

                  <button
                    onClick={() => {
                      handleLogout();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 dark:text-gray-200"
          type="button"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t px-4 py-3 space-y-2 text-sm text-gray-700 dark:text-gray-100">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block hover:text-indigo-600 dark:hover:text-indigo-400"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          {/* Features in mobile */}
          <div className="border-t pt-2">
            <button
              onClick={() => setFeaturesOpen((prev) => !prev)}
              className="w-full flex justify-between items-center px-2 py-1 text-left hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Features
              <ChevronDown size={16} />
            </button>
            {featuresOpen && (
              <div className="pl-4 mt-1 space-y-1">
                <Link
                  to="/wishlist"
                  className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={() => {
                    setFeaturesOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Wishlist
                </Link>
                <Link
                  to="/report"
                  className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={() => {
                    setFeaturesOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Report
                </Link>
                <Link
                  to="/chat"
                  className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={() => {
                    setFeaturesOpen(false);
                    setMenuOpen(false);
                  }}
                >
                  Chat
                </Link>
                {user && user.role === "admin" && (
                  <Link
                    to="/admin-analytics"
                    className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    onClick={() => {
                      setFeaturesOpen(false);
                      setMenuOpen(false);
                    }}
                  >
                    Analytics
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Language toggle */}
          <button
            onClick={() => {
              toggleLanguage();
              setMenuOpen(false);
            }}
            className="block w-full text-left hover:text-indigo-600 dark:hover:text-indigo-400"
            type="button"
          >
            🌐 Change Language ({language === "en" ? "English" : "Hindi"})
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={() => {
              toggleDarkMode();
              setMenuOpen(false);
            }}
            className="block w-full text-left hover:text-indigo-600 dark:hover:text-indigo-400"
            type="button"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>

          {/* Chat assistant */}
          <button
            onClick={() => {
              handleChatbotClick();
              setMenuOpen(false);
            }}
            className="block w-full text-left hover:text-indigo-600 dark:hover:text-indigo-400"
            type="button"
          >
            🤖 Chat Assistant
          </button>

          {/* User links */}
          {!user ? (
            <Link
              to="/login"
              className="block bg-indigo-600 text-white px-4 py-1.5 rounded text-center hover:bg-indigo-700 transition"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          ) : user.role === "user" ? (
            <>
              <Link
                to="/profile"
                className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={() => setMenuOpen(false)}
              >
                My Profile
              </Link>
              <Link
                to="/my-listings"
                className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={() => setMenuOpen(false)}
              >
                My Listings
              </Link>
              <Link
                to="/my-requests"
                className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={() => setMenuOpen(false)}
              >
                My Requests
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-1 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                type="button"
              >
                Logout
              </button>
            </>
          ) : user.role === "admin" ? (
            <>
              <Link
                to="/manage-listings"
                className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={() => setMenuOpen(false)}
              >
                Manage Listings
              </Link>
              <Link
                to="/manage-users"
                className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={() => setMenuOpen(false)}
              >
                Manage Users
              </Link>
              <Link
                to="/admin-analytics"
                className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                onClick={() => setMenuOpen(false)}
              >
                Analytics
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-1 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                type="button"
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
