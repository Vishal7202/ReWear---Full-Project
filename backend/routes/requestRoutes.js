const express = require('express');
const router = express.Router();

const {
  createRequest,
  getAllRequests,
  getUserRequests,
} = require('../controllers/requestController');

// ✅ correct middleware
const { protect } = require('../middleware/protect');

// ✅ admin middleware (inline - clean & simple)
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied',
    });
  }
  next();
};

// ===============================
// 🟢 CREATE REQUEST
// ===============================
router.post('/', protect, createRequest);

// ===============================
// 🔴 ADMIN: GET ALL REQUESTS
// ===============================
router.get('/all', protect, isAdmin, getAllRequests);

// ===============================
// 🟡 USER: GET OWN REQUESTS
// ===============================
router.get('/my', protect, getUserRequests);

module.exports = router;