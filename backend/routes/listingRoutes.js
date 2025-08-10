const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const {
  getMyListings,
  createListing,
  deleteListing,
  getAllListings
} = require('../controllers/listingController');

// GET all listings (public)
router.get('/', getAllListings);

// GET my listings (protected)
router.get('/my', protect, getMyListings);

// POST create listing
router.post('/', protect, createListing);

// DELETE listing by ID
router.delete('/:id', protect, deleteListing);

module.exports = router;
