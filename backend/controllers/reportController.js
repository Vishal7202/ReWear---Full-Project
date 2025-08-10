const Report = require('../models/Report');

// POST /api/report
exports.submitReport = async (req, res) => {
  const { userId, itemId, reason } = req.body;

  if (!userId || !itemId || !reason) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const report = new Report({ userId, itemId, reason });
    await report.save();
    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting report' });
  }
};
