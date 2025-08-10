const Item = require('../models/Item');

// @desc    Upload a clothing item
// @route   POST /api/listings
// @access  Private
exports.uploadCloth = async (req, res) => {
  try {
    // Debugging: Check incoming data
    console.log('Incoming Body:', req.body);

    const { title, category, size, condition, imageUrl } = req.body;

    if (!title || !category || !size || !condition || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newItem = new Item({
      user: req.user?.id, // ensure auth middleware is setting this
      title,
      category,
      size,
      condition,
      imageUrl,
    });

    await newItem.save();

    res.status(201).json({
      message: 'Item uploaded successfully',
      item: newItem,
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res
      .status(500)
      .json({ message: 'Failed to upload item', error: err.message });
  }
};
