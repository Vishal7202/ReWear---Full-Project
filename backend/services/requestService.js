const Request = require('../models/Request');

// 🟢 Create request
const createRequestService = async (data, userId) => {
  return await Request.create({
    ...data,
    user: userId,
  });
};

// 🟡 Get user requests
const getUserRequestsService = async (userId) => {
  return await Request.find({
    user: userId,
    isDeleted: false,
  }).sort({ createdAt: -1 });
};

// 🔴 Get all requests (admin)
const getAllRequestsService = async () => {
  return await Request.find({ isDeleted: false })
    .populate('user', 'name email')
    .sort({ createdAt: -1 });
};

module.exports = {
  createRequestService,
  getUserRequestsService,
  getAllRequestsService,
};