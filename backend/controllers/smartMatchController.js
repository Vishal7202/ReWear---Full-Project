const { getSmartMatchesService } = require('../services/smartMatchService');
const Request = require('../models/Request');

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

      if (item.category === clothingType) score += 50;
      if (item.size === size) score += 30;
      if (condition && item.condition === condition) score += 20;

      return { ...item.toObject(), score };
    });

    scored.sort((a, b) => b.score - a.score);

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