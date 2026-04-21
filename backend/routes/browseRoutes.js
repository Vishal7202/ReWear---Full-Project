const express = require('express');
const router = express.Router();

// Controllers (aligned with listing system)
const {
  getAllListings,
  getMyListings,
} = require('../controllers/listingController');

// Middleware (single source of truth)
const { protect } = require('../middleware/protect');

// ===============================
// 🟢 PUBLIC: Get all listings
// ===============================
router.get('/', getAllListings);

// ===============================
// 🔐 PROTECTED: Get user's listings
// ===============================
router.get('/my', protect, getMyListings);

module.exports = router;