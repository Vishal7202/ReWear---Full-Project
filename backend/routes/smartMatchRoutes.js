const express = require('express');
const router = express.Router();

const {
  getSmartMatches,
  getUserRequests,
  cancelRequest,
  requestMatch
} = require('../controllers/smartMatchController');

const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, getSmartMatches);
router.post('/request', protect, requestMatch);
router.get('/myrequests/:userId', protect, getUserRequests);
router.delete('/cancel/:id', protect, cancelRequest);

module.exports = router;
