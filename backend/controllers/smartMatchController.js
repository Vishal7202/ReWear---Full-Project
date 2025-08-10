const mongoose = require('mongoose');

// SmartMatchItem Schema
const SmartMatchItemSchema = new mongoose.Schema({
  title: String,
  size: String,
  gender: String,
  category: String,
  image: String,
  userId: String,
});

const SmartMatchItem = mongoose.model('SmartMatchItem', SmartMatchItemSchema);

// MatchRequest Schema
const MatchRequestSchema = new mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'SmartMatchItem' },
  userId: String,
  title: String,
  size: String,
  gender: String,
  category: String,
  image: String,
  requestedAt: { type: Date, default: Date.now },
});

const MatchRequest = mongoose.model('MatchRequest', MatchRequestSchema);

// Fetch matches based on preferences
exports.getSmartMatches = async (req, res) => {
  try {
    const { preferredSize, preferredGender, preferredCategory, excludeUserId } = req.body;

    const matches = await SmartMatchItem.find({
      userId: { $ne: excludeUserId },
      size: preferredSize,
      gender: preferredGender,
      category: preferredCategory,
    }).lean();

    res.json(matches);
  } catch (error) {
    console.error('Error fetching smart matches:', error);
    res.status(500).json({ message: 'Server error fetching smart matches' });
  }
};

// Get user's requests
exports.getUserRequests = async (req, res) => {
  const userId = req.params.userId;
  try {
    const requests = await MatchRequest.find({ userId });
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user requests' });
  }
};

// Cancel request
exports.cancelRequest = async (req, res) => {
  const requestId = req.params.id;
  try {
    await MatchRequest.findByIdAndDelete(requestId);
    res.json({ message: `Request ${requestId} cancelled` });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling request' });
  }
};

// Request a match
exports.requestMatch = async (req, res) => {
  const { matchId, title, size, gender, category, image, userId } = req.body;

  try {
    const existingRequest = await MatchRequest.findOne({ matchId, userId });
    if (existingRequest) {
      return res.status(400).json({ message: 'Match already requested' });
    }

    const newRequest = new MatchRequest({
      matchId,
      userId,
      title,
      size,
      gender,
      category,
      image,
    });

    await newRequest.save();
    res.json({ message: 'Match request sent successfully' });
  } catch (error) {
    console.error('Error saving match request:', error);
    res.status(500).json({ message: 'Server error saving match request' });
  }
};
