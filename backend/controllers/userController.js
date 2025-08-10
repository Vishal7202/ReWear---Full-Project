exports.getProfile = async (req, res) => {
  try {
    // Use req.user from token
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

exports.getMyListing = async (req, res) => {
  try {
    const listings = await Listing.find({ owner: req.user.id });
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};
