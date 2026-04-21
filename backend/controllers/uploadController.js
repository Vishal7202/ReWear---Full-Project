const Item = require('../models/Item');

// @desc    Upload a clothing item
// @route   POST /api/upload
// @access  Private
exports.uploadCloth = async (req, res, next) => {
  try {
    const { title, category, size, condition } = req.body;

    // 🔍 Validation
    if (!title || !category || !size || !condition || !req.file) {
      return res.status(400).json({
        success: false,
        message: 'All fields including image are required',
      });
    }

    // 📸 Get image path from multer
    const imageUrl = `/uploads/${req.file.filename}`;

    const newItem = await Item.create({
      user: req.user.id,
      title,
      category,
      size,
      condition,
      imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: 'Item uploaded successfully',
      item: newItem,
    });

  } catch (error) {
    next(error);
  }
};