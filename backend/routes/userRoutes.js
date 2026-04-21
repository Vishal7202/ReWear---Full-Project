const express = require('express');
const router = express.Router();

// ✅ middleware (single source of truth)
const { protect } = require('../middleware/protect');

// ✅ models (PascalCase as per Phase 1)
const User = require('../models/User');
const Item = require('../models/Item');
const Request = require('../models/Request');

// ===============================
// 🟢 MY PROFILE
// ===============================
router.get('/my-profile', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    next(error);
  }
});

// ===============================
// 🟢 MY LISTINGS
// ===============================
router.get('/my-listings', protect, async (req, res, next) => {
  try {
    const listings = await Item.find({
      user: req.user.id,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: listings.length,
      listings,
    });

  } catch (error) {
    next(error);
  }
});

// ===============================
// 🔴 DELETE LISTING
// ===============================
router.delete('/my-listings/:id', protect, async (req, res, next) => {
  try {
    const listing = await Item.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      });
    }

    await listing.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Listing deleted successfully',
    });

  } catch (error) {
    next(error);
  }
});

// ===============================
// 🟡 MY REQUESTS
// ===============================
router.get('/my-requests', protect, async (req, res, next) => {
  try {
    const requests = await Request.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;