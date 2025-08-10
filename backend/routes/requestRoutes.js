const express = require('express');
const router = express.Router();

const {
  createRequest,
  getAllRequests,
  getUserRequests,
} = require('../controllers/requestController');

const { protect, isAdmin } = require('../middlewares/authMiddleware');

// ✅ Create request — user must be logged in
router.post('/', protect, createRequest);

// ✅ Get all requests — only admin
router.get('/all', protect, isAdmin, getAllRequests);

// ✅ Get own requests — any logged-in user
router.get('/my', protect, getUserRequests);

module.exports = router;
