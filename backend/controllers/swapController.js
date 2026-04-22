const Swap = require("../models/Swap");
const Item = require("../models/Item");
const sendResponse = require("../utils/sendResponse");
const handleError = require("../utils/handleError");

// ✅ CREATE SWAP REQUEST
exports.createSwapRequest = async (req, res) => {
  try {
    const { itemRequested, itemOffered } = req.body;
    const requesterId = req.user._id;

    // 1. Check items exist
    const requestedItem = await Item.findById(itemRequested);
    const offeredItem = await Item.findById(itemOffered);

    if (!requestedItem || !offeredItem) {
      return sendResponse(res, 404, false, "Item not found");
    }

    // 2. Owner of requested item
    const ownerId = requestedItem.user;

    // 3. Prevent self swap
    if (ownerId.toString() === requesterId.toString()) {
      return sendResponse(res, 400, false, "You cannot swap your own item");
    }

    // 4. Prevent duplicate active swap
    const existing = await Swap.findOne({
      requester: requesterId,
      itemRequested,
      itemOffered,
      status: "pending",
    });

    if (existing) {
      return sendResponse(res, 400, false, "Swap request already exists");
    }

    // 5. Create swap
    const swap = await Swap.create({
      requester: requesterId,
      owner: ownerId,
      itemRequested,
      itemOffered,
    });

    return sendResponse(res, 201, true, "Swap request created", swap);
  } catch (error) {
    handleError(res, error);
  }
};

// ✅ GET MY SWAPS (sent + received)
exports.getMySwaps = async (req, res) => {
  try {
    const userId = req.user._id;

    const swaps = await Swap.find({
      $or: [{ requester: userId }, { owner: userId }],
    })
      .populate("itemRequested itemOffered")
      .populate("requester owner", "name email");

    return sendResponse(res, 200, true, "Swaps fetched", swaps);
  } catch (error) {
    handleError(res, error);
  }
};

// ✅ ACCEPT / REJECT
exports.respondSwap = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body; // accepted / rejected
    const userId = req.user._id;

    const swap = await Swap.findById(id);

    if (!swap) {
      return sendResponse(res, 404, false, "Swap not found");
    }

    // Only owner can respond
    if (swap.owner.toString() !== userId.toString()) {
      return sendResponse(res, 403, false, "Not authorized");
    }

    if (swap.status !== "pending") {
      return sendResponse(res, 400, false, "Already processed");
    }

    swap.status = action;
    await swap.save();

    return sendResponse(res, 200, true, `Swap ${action}`, swap);
  } catch (error) {
    handleError(res, error);
  }
};