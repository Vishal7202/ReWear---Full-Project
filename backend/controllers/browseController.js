const Item = require('../models/Item');

// @desc    Get all items (Browse page)
// @route   GET /api/listings
// @access  Public
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();

    const transformed = items.map((item) => ({
      _id: item._id,
      title: item.title,
      category: item.category,
      size: item.size,
      imageUrl: item.imageUrl,
      status: item.isAvailable ? 'Available' : 'Unavailable',
    }));

    res.status(200).json(transformed);
  } catch (error) {
    console.error('❌ Failed to fetch items:', error.message);
    res.status(500).json({ message: 'Failed to fetch items' });
  }
};

// @desc    Get logged-in user's listings
// @route   GET /api/listings/my
// @access  Private
exports.getUserListings = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user._id });

    res.status(200).json({ listings: items });
  } catch (error) {
    console.error('❌ Failed to fetch user listings:', error.message);
    res.status(500).json({ message: 'Failed to fetch user listings' });
  }
};
