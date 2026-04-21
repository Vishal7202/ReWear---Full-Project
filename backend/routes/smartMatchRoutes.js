const express = require('express');
const router = express.Router();

const {
  getSmartMatches,
  getUserRequests,
  cancelRequest,
  requestMatch
} = require('../controllers/smartMatchController');

// ✅ correct middleware
const { protect } = require('../middleware/protect');

// ===============================
// 🧠 SMART MATCH ROUTES
// ===============================
router.post('/', protect, getSmartMatches);
router.post('/request', protect, requestMatch);
router.get('/myrequests/:userId', protect, getUserRequests);
router.delete('/cancel/:id', protect, cancelRequest);

module.exports = router;