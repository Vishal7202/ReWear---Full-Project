import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Protected Route
import ProtectedRoute from "./components/auth/ProtectedRoute";

// PUBLIC PAGES
import Home from "./pages/public/Home";
import Browse from "./pages/public/Browse";
import Listings from "./pages/public/Listings";
import HowItWorks from "./pages/public/HowItWorks";
import FAQ from "./pages/public/FAQ";
import Contact from "./pages/public/Contact";
import Donate from "./pages/public/Donate";
import Terms from "./pages/public/Terms";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";
import ReturnPolicy from "./pages/public/ReturnPolicy";
import SmartMatch from "./pages/public/SmartMatch";

// AUTH
import Login from "./pages/auth/Login";

// USER
import UserDashboard from "./pages/user/UserDashboard";
import MyProfile from "./pages/user/MyProfile";
import MyListings from "./pages/user/MyListings";
import MyRequests from "./pages/user/MyRequests";
import Wishlist from "./pages/user/Wishlist";
import Upload from "./pages/user/Upload";
import Chat from "./pages/user/Chat";
import Community from "./pages/user/Community";
import Report from "./pages/user/Report";

// ADMIN
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import Analytics from "./pages/admin/Analytics";
import ManageListings from "./pages/admin/ManageListings";
import ManageRequests from "./pages/admin/ManageRequests";
import ProductDetails from "./pages/public/ProductDetails";

// COMMON
import NotFound from "@/components/common/NotFound";
import Unauthorized from "@/components/common/Unauthorized";

// 🔥 MAIN APP WRAPPER
function App() {
  useEffect(() => {
    console.log("API URL:", import.meta.env.VITE_API_URL);
  }, []);

  return (
    <Router>
      <MainApp />
    </Router>
  );
}

// 🔥 INSIDE ROUTER COMPONENT
function MainApp() {
  const location = useLocation();

  return (
    <>
      {/* ✅ Navbar hide on login */}
      {location.pathname !== "/login" && <Navbar />}

      <div className="min-h-screen pt-20 bg-gray-100 text-black">
        <Routes>

          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/listing/:id" element={<ProductDetails />} />

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* USER */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Upload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/smartmatch"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <SmartMatch />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <MyProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-listings"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <MyListings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-requests"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <MyRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Chat />
              </ProtectedRoute>
            }
          />

          <Route
            path="/donate"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Donate />
              </ProtectedRoute>
            }
          />

          {/* ADMIN */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Analytics />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/listings"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageListings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/requests"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageRequests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/report"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Report />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;