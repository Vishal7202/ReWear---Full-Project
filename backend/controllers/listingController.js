const {
  getAllListingsService,
  getMyListingsService,
  createListingService,
  deleteListingService,
} = require('../services/listingService');

// 🟢 GET ALL LISTINGS
exports.getAllListings = async (req, res, next) => {
  try {
    const items = await getAllListingsService(req.query);

    return res.status(200).json({
      success: true,
      count: items.length,
      listings: items,
    });

  } catch (error) {
    next(error);
  }
};

// 🟢 GET MY LISTINGS
exports.getMyListings = async (req, res, next) => {
  try {
    const items = await getMyListingsService(req.user.id);

    return res.status(200).json({
      success: true,
      count: items.length,
      listings: items,
    });

  } catch (error) {
    next(error);
  }
};

// 🔵 CREATE LISTING
exports.createListing = async (req, res, next) => {
  try {
    const { title, size, category, condition, imageUrl } = req.body;

    if (!title || !size || !category || !condition || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
      });
    }

    const item = await createListingService(req.body, req.user.id);

    return res.status(201).json({
      success: true,
      message: 'Listing created successfully',
      listing: item,
    });

  } catch (error) {
    next(error);
  }
};

// 🔴 DELETE LISTING
exports.deleteListing = async (req, res, next) => {
  try {
    const item = await deleteListingService(req.params.id, req.user.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found or unauthorized',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Listing deleted successfully',
    });

  } catch (error) {
    next(error);
  }
};