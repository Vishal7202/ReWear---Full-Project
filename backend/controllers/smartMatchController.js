const { getSmartMatchesService } = require('../services/smartMatchService');
const Request = require('../models/request');

// 🧠 GET SMART MATCHES
exports.getSmartMatches = async (req, res, next) => {
  try {
    const { clothingType, size, condition } = req.body;

    if (!clothingType || !size) {
      return res.status(400).json({
        success: false,
        message: 'clothingType and size are required',
      });
    }

    const items = await getSmartMatchesService({
      clothingType,
      size,
      condition,
    });

   // 🔥 scoring
const scored = items.map((item) => {
  let score = 0;

  // ✅ category match (case-insensitive + flexible)
  if (
    item.category &&
    clothingType &&
    item.category.toLowerCase().includes(clothingType.toLowerCase())
  ) {
    score += 50;
  }

  // ✅ size match
  if (
    item.size &&
    size &&
    item.size.toLowerCase() === size.toLowerCase()
  ) {
    score += 30;
  }

  // ✅ condition match (optional)
  if (
    condition &&
    item.condition &&
    item.condition.toLowerCase() === condition.toLowerCase()
  ) {
    score += 20;
  }

  return {
    ...item.toObject(),
    score,
  };
});

// 🔥 sort by best match
scored.sort((a, b) => b.score - a.score);

// ✅ response
return res.status(200).json({
  success: true,
  matches: scored,
});

  } catch (error) {
    next(error);
  }
};

// 🟡 USER REQUESTS
exports.getUserRequests = async (req, res, next) => {
  try {
    const requests = await Request.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      requests,
    });

  } catch (error) {
    next(error);
  }
};

// 🔴 CANCEL REQUEST
exports.cancelRequest = async (req, res, next) => {
  try {
    await Request.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: 'Request cancelled',
    });

  } catch (error) {
    next(error);
  }
};

// 🔵 REQUEST MATCH
exports.requestMatch = async (req, res, next) => {
  try {
    const { clothingType, size, condition } = req.body;

    const newRequest = await Request.create({
      user: req.user.id,
      clothingType,
      size,
      condition,
    });

    return res.status(201).json({
      success: true,
      message: 'Match request created',
      request: newRequest,
    });

  } catch (error) {
    next(error);
  }
};