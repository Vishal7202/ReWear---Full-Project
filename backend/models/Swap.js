const mongoose = require("mongoose");

const swapSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    itemRequested: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },

    itemOffered: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Swap", swapSchema);