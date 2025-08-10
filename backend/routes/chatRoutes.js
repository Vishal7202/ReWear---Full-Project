// backend/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const {
  createChat,
  getChats,
  sendMessage,
  getMessages
} = require('../controllers/chatController');
const protect = require('../middlewares/authMiddleware'); // rename isAuthenticated → protect

// Create or fetch chat
router.post('/', protect, createChat);
router.get('/', protect, getChats);

// Messages
router.post('/message', protect, sendMessage);
router.get('/message/:chatId', protect, getMessages);

module.exports = router;
