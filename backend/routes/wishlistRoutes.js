const express = require('express');
const router = express.Router();

// ✅ correct import
const { protect } = require('../middleware/protect');

const {
  getUserWishlist,
  removeFromWishlist,
} = require('../controllers/wishlistController');

// ===============================
// ❤️ WISHLIST ROUTES
// ===============================
router.get('/', protect, getUserWishlist);
router.delete('/:id', protect, removeFromWishlist);

module.exports = router;