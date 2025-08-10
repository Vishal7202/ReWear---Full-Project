const Item = require('../models/Item');

// @desc    Get all listings (public)
exports.getAllListings = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching all listings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get logged-in user's listings
exports.getMyListings = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user._id });
    res.json({ listings: items });
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new listing
exports.createListing = async (req, res) => {
  try {
    const { title, description, size, category, condition, imageUrl } = req.body;

    const newItem = await Item.create({
      title,
      description,
      size,
      category,
      condition,
      imageUrl,
      user: req.user._id,
    });

    res.status(201).json({ listing: newItem });
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete listing by ID
exports.deleteListing = async (req, res) => {
  try {
    const item = await Item.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({ message: 'Item not found or unauthorized' });
    }

    await item.remove();
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Error deleting listing:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
