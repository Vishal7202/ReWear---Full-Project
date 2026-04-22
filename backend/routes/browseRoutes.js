const express = require('express');
const router = express.Router();

const {
  getAllListings,
  getMyListings,
  createListing
} = require('../controllers/listingController');

const { protect } = require('../middleware/protect');

// Public
router.get('/', getAllListings);

// Protected
router.get('/my', protect, getMyListings);

// 🔥 CREATE LISTING
router.post('/', protect, createListing);

module.exports = router;