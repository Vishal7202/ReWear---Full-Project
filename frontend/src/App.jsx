import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Browse from './pages/Browse';
import Upload from './pages/Upload';
import SmartMatch from './pages/SmartMatch';
import Donate from './pages/Donate';

import Wishlist from './pages/Wishlist';
import MyProfile from './pages/MyProfile';
import MyListings from './pages/MyListings';
import MyRequests from './pages/MyRequests';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';
import Report from './pages/Report';
import Chat from './pages/Chat';
import Analytics from './pages/Analytics';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Listings from './pages/Listings';

// Admin pages
import AdminProfile from './pages/AdminProfile';
import ManageListings from './pages/ManageListings';
import ManageRequests from './pages/ManageRequests';

// Public pages
import Community from './pages/Community';
import Contact from './pages/Contact';
import HowItWorks from './pages/HowItWorks';

// Legal/info pages
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen pt-20 px-4">
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/community" element={<Community />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/donate" element={<Donate />} />


          {/* Unauthorized */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Dashboards */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
  path="/donate"
  element={
    <ProtectedRoute allowedRoles={['user']}>
      <Donate />
    </ProtectedRoute>
  }
/>

          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* User Protected Routes */}
          <Route
            path="/upload"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Upload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/smartmatch"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <SmartMatch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-listings"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <MyListings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-requests"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <MyRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <Chat />
              </ProtectedRoute>
            }
          />

          {/* Admin-only Routes */}
          <Route
            path="/report"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-profile"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-listings"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageListings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage-requests"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageRequests />
              </ProtectedRoute>
            }
          />

          {/* Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
