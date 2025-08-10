const express = require('express');
const router = express.Router();

const { protect, isAdmin } = require('../middlewares/authMiddleware');
const { getAdminTest, getAnalytics } = require('../controllers/adminController');

// ✅ Make sure both `getAdminTest` and `getAnalytics` are properly imported
router.get('/', protect, isAdmin, getAdminTest);
router.get('/analytics', protect, isAdmin, getAnalytics);

module.exports = router;
