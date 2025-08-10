// routes/chatbotRoutes.js
const express = require('express');
const router = express.Router();
const { askBot } = require('../controllers/chatbotController');

// Public access - chatbot query
router.post('/ask', askBot);

module.exports = router;
