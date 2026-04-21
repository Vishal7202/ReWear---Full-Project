const Item = require('../models/Item');

// 🟢 Get all listings
const getAllListingsService = async (queryParams) => {
  const { category, size, condition, search } = queryParams;

  let query = {
    isDeleted: false,
    isAvailable: true,
  };

  if (category) query.category = category;
  if (size) query.size = size;
  if (condition) query.condition = condition;

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const items = await Item.find(query)
    .sort({ createdAt: -1 })
    .populate('user', 'name');

  return items;
};

// 🟢 Get my listings
const getMyListingsService = async (userId) => {
  return await Item.find({
    user: userId,
    isDeleted: false,
  }).sort({ createdAt: -1 });
};

// 🔵 Create listing
const createListingService = async (data, userId) => {
  return await Item.create({
    ...data,
    user: userId,
  });
};

// 🔴 Delete listing
const deleteListingService = async (id, userId) => {
  const item = await Item.findOne({
    _id: id,
    user: userId,
    isDeleted: false,
  });

  if (!item) return null;

  item.isDeleted = true;
  item.isAvailable = false;

  await item.save();
  return item;
};

module.exports = {
  getAllListingsService,
  getMyListingsService,
  createListingService,
  deleteListingService,
};