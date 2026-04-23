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

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("rewear_user"));
    if (storedUser) {
      setUser(storedUser);
      fetchWishlistCount(storedUser._id);
    }
  }, []);

  const fetchWishlistCount = async (userId) => {
    try {
      const res = await API.get(`/api/wishlist/${userId}`);
      setWishlistCount(res.data.length || 0);
    } catch {
      setWishlistCount(0);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
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

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
  <img
    src={logo}
    className="h-16 md:h-20 object-contain drop-shadow-md"
  />
</Link>

          {/* SEARCH */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-6 bg-white rounded-xl px-3 py-2 shadow-sm border focus-within:ring-2 focus-within:ring-green-400">
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

          {/* NAV */}
          <div className="hidden md:flex items-center gap-6">

            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-medium transition group ${
                  location.pathname === item.path
                    ? "text-green-600"
                    : "text-gray-700"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-green-600 transition-all ${
                    location.pathname === item.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}

            {/* ❤️ Wishlist */}
            <button
              onClick={() => navigate("/wishlist")}
              className="relative hover:scale-110 transition"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-1 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* USER */}
            {user ? (
              <div className="flex items-center gap-3">

                <div className="w-9 h-9 bg-green-600 text-white rounded-full flex items-center justify-center font-semibold">
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
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Login
              </button>
            )}
          </div>

          {/* MOBILE MENU */}
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
      <div className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl transition-transform ${menuOpen ? "translate-x-0" : "translate-x-full"}`}>

        <div className="p-5 space-y-5">

          <div className="flex justify-between">
            <span className="font-bold">Menu</span>
            <X onClick={() => setMenuOpen(false)} />
          </div>

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-green-600"
            >
              {item.label}
            </Link>
          ))}

          <Link to="/wishlist">Wishlist ({wishlistCount})</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;