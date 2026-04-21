const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    // 🔍 1. Authorization header (Bearer)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // 🔍 2. Cookie support (production)
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // ❌ No token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token missing',
      });
    }

    // 🔐 Verify JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Token expired or invalid',
      });
    }

    // 🔍 Get user
    const user = await User.findById(decoded.id).select('_id role');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    // ✅ Attach minimal user data
    req.user = {
      id: user._id.toString(),
      role: user.role,
    };

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

module.exports = { protect };