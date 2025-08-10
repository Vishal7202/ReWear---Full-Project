const Wishlist = require('../models/Wishlist');

// POST /api/wishlist
exports.addToWishlist = async (req, res) => {
  const userId = req.user.id; 
  const { itemId } = req.body;

  try {
    const existing = await Wishlist.findOne({ userId, itemId });
    if (existing) {
      return res.status(409).json({ message: 'Item already in wishlist' });
    }

    const wishlist = new Wishlist({ userId, itemId });
    await wishlist.save();
    res.status(201).json({ message: 'Item added to wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to wishlist' });
  }
};

// GET /api/wishlist
exports.getUserWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user.id }).populate('itemId');
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch wishlist' });
  }
};

// DELETE /api/wishlist/:id
exports.removeFromWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findOne({ _id: req.params.id, userId: req.user.id });

    if (!wishlistItem) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    await wishlistItem.deleteOne();

    res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove item from wishlist' });
  }
};
