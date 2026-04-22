const express = require("express");
const router = express.Router();

const {
  createSwapRequest,
  getMySwaps,
  respondSwap,
} = require("../controllers/swapController");

const { protect } = require("../middleware/protect");

// ✅ Create swap
router.post("/request", protect, createSwapRequest);

// ✅ Get my swaps
router.get("/my", protect, getMySwaps);

// ✅ Accept / Reject
router.patch("/:id/respond", protect, respondSwap);

module.exports = router;