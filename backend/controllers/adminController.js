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

    const activeUsers = await User.countDocuments({ isBlocked: false });
    const blockedUsers = await User.countDocuments({ isBlocked: true });

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
        activeUsers,
        blockedUsers,
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
// 👥 USERS (PAGINATION + SEARCH + FILTER)
// ===============================
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", role } = req.query;

    const query = {
      name: { $regex: search, $options: "i" },
    };

    if (role) query.role = role;

    const users = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      success: true,
      data: users,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// 🔥 BLOCK USER
const blockUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isBlocked: true });

    res.json({
      success: true,
      message: "User blocked",
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

// 🔥 UNBLOCK USER
const unblockUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isBlocked: false });

    res.json({
      success: true,
      message: "User unblocked",
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

// 🔥 UPDATE ROLE
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    await User.findByIdAndUpdate(req.params.id, { role });

    res.json({
      success: true,
      message: "Role updated",
    });
  } catch {
    res.status(500).json({ success: false });
  }
};

// ❌ DELETE USER
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
// 📦 LISTINGS (FILTER + PAGINATION)
// ===============================
const getAllListings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = {};
    if (status) query.status = status;

    const listings = await Listing.find(query)
      .populate("owner", "name email")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Listing.countDocuments(query);

    res.json({
      success: true,
      data: listings,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
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

    const allowed = ["pending", "approved", "rejected", "completed"];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

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
  blockUser,
  unblockUser,
  updateUserRole,
  deleteUser,
  getAllListings,
  approveListing,
  rejectListing,
  deleteListing,
  getAllRequests,
  updateRequestStatus,
};