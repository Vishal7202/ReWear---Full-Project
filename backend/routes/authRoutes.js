const express = require('express');
const router = express.Router();

// Controllers
const {
  registerUser,
  loginUser,
  getProfile,
} = require('../controllers/authController');

// Middleware (single source of truth)
const { protect } = require('../middleware/protect');

// Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getProfile);

module.exports = router;