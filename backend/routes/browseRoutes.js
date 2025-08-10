const express = require('express');
const router = express.Router();
const { getItems, getUserListings } = require('../controllers/browseController');
const { protect } = require('../middlewares/authMiddleware');

// Public route - सभी यूज़र्स देख सकते हैं
router.get('/', getItems);

// Protected route - सिर्फ लॉगिन किए हुए यूज़र के लिए
router.get('/my', protect, getUserListings);

module.exports = router;
