const User = require("../models/User");
const Listing = require("../models/Listing");
const Request = require("../models/Request");

// 🔥 REAL ANALYTICS
const getAnalytics = async (req, res) => {
  try {
    // 📊 TOTAL COUNTS
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const totalRequests = await Request.countDocuments();

    // 📈 USER GROWTH (last 6 months)
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 📦 LISTING GROWTH
    const listingGrowth = await Listing.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          listings: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 🔄 REQUEST STATUS DISTRIBUTION
    const requestStats = await Request.aggregate([
      {
        $group: {
          _id: "$status",
          value: { $sum: 1 },
        },
      },
    ]);

    // 🔥 RESPONSE
    res.json({
      totalUsers,
      totalListings,
      totalRequests,
      userGrowth,
      listingGrowth,
      requestStats,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Analytics failed" });
  }
};

module.exports = { getAnalytics };