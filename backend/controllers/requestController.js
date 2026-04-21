const {
  createRequestService,
  getUserRequestsService,
  getAllRequestsService,
} = require('../services/requestService');

// 🟢 CREATE REQUEST
exports.createRequest = async (req, res, next) => {
  try {
    const { clothingType, size } = req.body;

    // 🔍 Validation
    if (!clothingType || !size) {
      return res.status(400).json({
        success: false,
        message: 'Required fields missing',
      });
    }

    const request = await createRequestService(req.body, req.user.id);

    return res.status(201).json({
      success: true,
      message: 'Request created successfully',
      request,
    });

  } catch (error) {
    next(error);
  }
};

// 🟡 USER REQUESTS
exports.getUserRequests = async (req, res, next) => {
  try {
    const requests = await getUserRequestsService(req.user.id);

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });

  } catch (error) {
    next(error);
  }
};

// 🔴 ADMIN REQUESTS
exports.getAllRequests = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
      });
    }

    const requests = await getAllRequestsService();

    return res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });

  } catch (error) {
    next(error);
  }
};