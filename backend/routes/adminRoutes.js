const express = require('express');
const router = express.Router();

// ✅ correct middleware
const { protect } = require('../middleware/protect');

// ✅ inline admin middleware (simple & reliable)
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied',
    });
  }
  next();
};

// Controllers
const {
  getAdminTest,
  getAnalytics,
} = require('../controllers/adminController');

// ===============================
// 🔴 ADMIN ROUTES
// ===============================
router.get('/', protect, isAdmin, getAdminTest);
router.get('/analytics', protect, isAdmin, getAnalytics);

module.exports = router;