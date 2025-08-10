// Dummy DB (replace with real DB logic like MongoDB model if needed)
const requestsDB = [];

// ✅ Create a new request
const createRequest = (req, res) => {
  const { itemName, description } = req.body;

  if (!itemName || !description) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newRequest = {
    id: requestsDB.length + 1,
    user: req.user.id,
    itemName,
    description,
    createdAt: new Date(),
  };

  requestsDB.push(newRequest);
  res.status(201).json(newRequest);
};

// ✅ Get all requests (admin only)
const getAllRequests = (req, res) => {
  res.status(200).json(requestsDB);
};

// ✅ Get requests created by logged-in user
const getUserRequests = (req, res) => {
  const userRequests = requestsDB.filter(reqObj => reqObj.user === req.user.id);
  res.status(200).json(userRequests);
};

module.exports = {
  createRequest,
  getAllRequests,
  getUserRequests,
};
