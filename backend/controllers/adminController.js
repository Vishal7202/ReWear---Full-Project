const User = require("../models/User");
const Listing = require("../models/Listing");
const Request = require("../models/request");

// ===============================
// ✅ TEST ROUTE (IMPORTANT)
// ===============================
const getAdminTest = (req, res) => {
  res.json({
    success: true,
    message: "Admin working 🚀",
  });
};

// ===============================
// 🔥 REAL ANALYTICS
// ===============================
const getAnalytics = async (req, res) => {
  try {
    // 📊 TOTAL COUNTS
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const totalRequests = await Request.countDocuments();

    // 📈 USER GROWTH (month wise)
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

    // 🔄 REQUEST STATUS
    const requestStats = await Request.aggregate([
      {
        $group: {
          _id: "$status",
          value: { $sum: 1 },
        },
      },
    ]);

    // ✅ RESPONSE
    res.json({
      success: true,
      data: {
        totalUsers,
        totalListings,
        totalRequests,
        userGrowth,
        listingGrowth,
        requestStats,
      },
    });

  } catch (err) {
    console.error("Analytics Error:", err);
    res.status(500).json({
      success: false,
      message: "Analytics failed",
    });
  }
};

// ===============================
// EXPORTS (IMPORTANT)
// ===============================
module.exports = {
  getAdminTest,
  getAnalytics,
};