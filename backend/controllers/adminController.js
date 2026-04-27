const User = require("../models/User");
const Listing = require("../models/Listing");
const Request = require("../models/request");

// ===============================
// ✅ TEST ROUTE
// ===============================
const getAdminTest = (req, res) => {
  res.json({
    success: true,
    message: "Admin working 🚀",
  });
};

// ===============================
// 📊 ANALYTICS
// ===============================
const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const totalRequests = await Request.countDocuments();

    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          users: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const listingGrowth = await Listing.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          listings: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const requestStats = await Request.aggregate([
      {
        $group: {
          _id: "$status",
          value: { $sum: 1 },
        },
      },
    ]);

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
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Analytics failed",
    });
  }
};

// ===============================
// 👥 USERS
// ===============================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "User deleted",
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

// ===============================
// 📦 LISTINGS
// ===============================
const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate("owner", "name email");

    res.json({
      success: true,
      data: listings,
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

const approveListing = async (req, res) => {
  try {
    await Listing.findByIdAndUpdate(req.params.id, { status: "approved" });

    res.json({
      success: true,
      message: "Listing approved",
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

const rejectListing = async (req, res) => {
  try {
    await Listing.findByIdAndUpdate(req.params.id, { status: "rejected" });

    res.json({
      success: true,
      message: "Listing rejected",
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

const deleteListing = async (req, res) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Listing deleted",
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

// ===============================
// 🔄 REQUESTS
// ===============================
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate("user", "name email");

    res.json({
      success: true,
      data: requests,
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    await Request.findByIdAndUpdate(req.params.id, { status });

    res.json({
      success: true,
      message: "Request updated",
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

// ===============================
module.exports = {
  getAdminTest,
  getAnalytics,
  getAllUsers,
  deleteUser,
  getAllListings,
  approveListing,
  rejectListing,
  deleteListing,
  getAllRequests,
  updateRequestStatus,
};