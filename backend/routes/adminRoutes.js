const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/protect");

// ===============================
// ADMIN CHECK
// ===============================
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }
  next();
};

// ===============================
// CONTROLLER IMPORT (SAFE WAY)
// ===============================
const adminController = require("../controllers/adminController");

// ===============================
// ROUTES
// ===============================
router.get("/", protect, isAdmin, adminController.getAdminTest);
router.get("/analytics", protect, isAdmin, adminController.getAnalytics);

module.exports = router;