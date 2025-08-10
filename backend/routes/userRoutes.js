const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');
const User = require('../models/User');
const Item = require('../models/Item'); // ✅ Correct model
const Request = require('../models/requestModel');

// ✅ My Profile
router.get('/my-profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('My Profile Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ My Listings
router.get('/my-listings', protect, async (req, res) => {
  try {
    const listings = await Item.find({ user: req.user._id, isDeleted: false });
    res.json({ listings });
  } catch (error) {
    console.error('My Listings Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Delete Listing
router.delete('/my-listings/:id', protect, async (req, res) => {
  try {
    const listing = await Item.findOne({ _id: req.params.id, user: req.user._id });
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    await listing.deleteOne();
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Delete Listing Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ My Requests
// ✅ My Requests
router.get('/my-requests', protect, async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user._id })
      .sort({ createdAt: -1 }); // Latest first
    res.json({ requests });
  } catch (error) {
    console.error('My Requests Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
