import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Heart, Search, User } from "lucide-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("rewear_user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/browse?search=${search}`);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/browse", label: "Browse" },
    { path: "/upload", label: "Sell" },
    { path: "/smartmatch", label: "Smart Match" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">

        {/* 🔥 LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} className="h-8 rounded-full" />
          <span className="text-lg font-bold text-green-600">ReWear</span>
        </Link>

        {/* 🔍 SEARCH BAR */}
        <div className="hidden md:flex items-center flex-1 max-w-md bg-gray-100 rounded-xl px-3 py-2">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search clothes..."
            className="bg-transparent outline-none px-2 text-sm w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>

        {/* 🧭 NAV ITEMS */}
        <div className="hidden md:flex items-center gap-6 text-gray-700">

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="hover:text-green-600 transition font-medium"
            >
              {item.label}
            </Link>
          ))}

          {/* ❤️ Wishlist */}
          <button
            onClick={() => navigate("/wishlist")}
            className="relative hover:text-green-600"
          >
            <Heart size={20} />
            {/* badge (optional future) */}
            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1 rounded-full">
              0
            </span>
          </button>

          {/* 👤 USER */}
          {user ? (
            <div className="flex items-center gap-3">

              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-semibold">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700"
            >
              Login
            </button>
          )}
        </div>

        {/* 📱 MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* 📱 MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 py-5 space-y-4 border-t">

          {/* SEARCH */}
          <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none px-2 w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700"
            >
              {item.label}
            </Link>
          ))}

          <Link to="/wishlist" className="block">
            Wishlist
          </Link>

          {user ? (
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="block bg-green-600 text-white p-2 rounded text-center"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;