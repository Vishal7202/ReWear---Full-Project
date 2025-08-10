const express = require('express');
const router = express.Router();
const protect = require('../middlewares/protect');

router.get('/', protect, (req, res) => {
  res.json({ reports: [] });
});

module.exports = router;
