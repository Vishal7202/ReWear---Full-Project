const Feedback = require('../models/Feedback');

// POST /api/feedback
exports.submitFeedback = async (req, res) => {
  const { userId, comment, rating } = req.body;

  if (!userId || !comment || !rating) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const feedback = new Feedback({ userId, comment, rating });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while submitting feedback' });
  }
};
