const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/protect");
const isAdmin = require("../middleware/admin");
const adminController = require("../controllers/adminController");

// ===============================
// 📊 DASHBOARD
// ===============================
router.get("/", protect, isAdmin, adminController.getAdminTest);
router.get("/analytics", protect, isAdmin, adminController.getAnalytics);

// ===============================
// 👥 USER MANAGEMENT
// ===============================
router.get("/users", protect, isAdmin, adminController.getAllUsers);

// 🔥 NEW: Block / Unblock
router.put("/users/:id/block", protect, isAdmin, adminController.blockUser);
router.put("/users/:id/unblock", protect, isAdmin, adminController.unblockUser);

// 🔥 OPTIONAL: Update role
router.put("/users/:id/role", protect, isAdmin, adminController.updateUserRole);

// ❌ DELETE (keep but optional)
router.delete("/users/:id", protect, isAdmin, adminController.deleteUser);

// ===============================
// 📦 LISTINGS MANAGEMENT
// ===============================
router.get("/listings", protect, isAdmin, adminController.getAllListings);

router.put("/listings/:id/approve", protect, isAdmin, adminController.approveListing);
router.put("/listings/:id/reject", protect, isAdmin, adminController.rejectListing);
router.delete("/listings/:id", protect, isAdmin, adminController.deleteListing);

// ===============================
// 🔄 REQUEST MANAGEMENT
// ===============================
router.get("/requests", protect, isAdmin, adminController.getAllRequests);
router.put("/requests/:id/status", protect, isAdmin, adminController.updateRequestStatus);

module.exports = router;