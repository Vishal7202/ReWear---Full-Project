const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');
const { getUserWishlist, removeFromWishlist } = require('../controllers/wishlistController');

router.get('/', protect, getUserWishlist);
router.delete('/:id', protect, removeFromWishlist);

module.exports = router;
