const getAdminTest = (req, res) => {
  res.status(200).json({ message: 'Admin route working!' });
};

const getAnalytics = (req, res) => {
  // You can later connect this with actual DB stats
  res.status(200).json({
    users: 50,
    items: 120,
    matches: 30,
  });
};

module.exports = { getAdminTest, getAnalytics };
