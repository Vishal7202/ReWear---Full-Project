const Item = require('../models/Item');

const getSmartMatchesService = async ({ clothingType, size, condition }) => {
  let query = {
    isDeleted: false,
    isAvailable: true,
  };

  if (clothingType) query.category = clothingType;
  if (size) query.size = size;
  if (condition) query.condition = condition;

  const items = await Item.find(query);

  // 🔥 scoring system
  const scored = items.map((item) => {
    let score = 0;

    if (item.category === clothingType) score += 50;
    if (item.size === size) score += 30;
    if (condition && item.condition === condition) score += 20;

    return {
      ...item.toObject(),
      score,
    };
  });

  // 🔽 sort by score
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, 10); // top 10
};

module.exports = { getSmartMatchesService };