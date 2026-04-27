import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Heart, Search } from "lucide-react";
import API from "@/utils/axios";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 USER SYNC (FIXED)
  useEffect(() => {
    const loadUser = () => {
      const storedUser = JSON.parse(localStorage.getItem("rewear_user"));
      setUser(storedUser || null);

      if (storedUser?._id) {
        fetchWishlistCount(storedUser._id);
      }
    };

    loadUser();
    window.addEventListener("focus", loadUser);

    return () => window.removeEventListener("focus", loadUser);
  }, []);

  const fetchWishlistCount = async (userId) => {
    try {
      const res = await API.get(`/api/wishlist/${userId}`);
      setWishlistCount(res.data.length || 0);
    } catch {
      setWishlistCount(0);
    }
  };

  // 🔥 LOGOUT FIX
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rewear_user");
    setUser(null);
    navigate("/"); // ✅ HOME redirect
  };

  const handleSearch = () => {
    if (!search.trim()) return;
    navigate(`/browse?search=${search}`);
    setMenuOpen(false);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/browse", label: "Browse" },
    { path: "/upload", label: "Sell" },
    { path: "/smartmatch", label: "Smart Match" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/80 border-b shadow-sm">

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-14 md:h-18 object-contain" />
          </Link>

          {/* SEARCH */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6 bg-white rounded-xl px-3 py-2 border focus-within:ring-2 focus-within:ring-green-400">
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

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-6">

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium ${
                  location.pathname === item.path
                    ? "text-green-600"
                    : "text-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* 🔥 ADMIN */}
            {user?.role === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                className="text-blue-600 font-semibold"
              >
                Admin
              </button>
            )}

            {/* ❤️ Wishlist */}
            {user && (
              <button
                onClick={() => navigate("/wishlist")}
                className="relative"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>
            )}

            {/* USER */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-green-600 text-white rounded-full flex items-center justify-center">
                  {user.name?.charAt(0)?.toUpperCase()}
                </div>

                <button
                  onClick={handleLogout}
                  className="text-red-500 text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Login
              </button>
            )}
          </div>

          {/* MOBILE MENU BTN */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* MOBILE PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 space-y-4">

          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Menu</span>
            <X onClick={() => setMenuOpen(false)} />
          </div>

          {/* NAV ITEMS */}
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="block py-2 border-b text-gray-700 hover:text-green-600"
            >
              {item.label}
            </Link>
          ))}

          {/* ADMIN */}
          {user?.role === "admin" && (
            <button
              onClick={() => {
                navigate("/admin");
                setMenuOpen(false);
              }}
              className="block py-2 border-b text-blue-600"
            >
              Admin Panel
            </button>
          )}

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            onClick={() => setMenuOpen(false)}
            className="block py-2 border-b"
          >
            Wishlist ({wishlistCount})
          </Link>

          {/* LOGIN / LOGOUT */}
          {user ? (
            <button
              onClick={handleLogout}
              className="block py-2 text-red-500"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
              className="block py-2 text-green-600"
            >
              Login
            </button>
          )}

        </div>
      </div>
    </>
  );
};

export default Navbar;