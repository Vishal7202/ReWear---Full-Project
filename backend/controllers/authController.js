const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔐 Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// 🟢 @route   POST /api/auth/register
// 🟢 @desc    Register new user
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
const role = 'user'; // 🔒 force user
    // 🔍 Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // 🔍 Check existing user
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      });
    }

    const user = await User.create({
  name,
  email,
  password, // 🔥 direct pass karo
  role,
});

    // 🔑 Token
    const token = generateToken(user);

    // 🍪 Optional: set cookie (production ready)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // ✅ Response
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    next(error);
  }
};

// 🔵 @route   POST /api/auth/login
// 🔵 @desc    Login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 🔍 Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // 🔍 Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // 🚨 BLOCK CHECK (PEHLE YAHI AAYEGA)
if (user.isBlocked) {
  return res.status(403).json({
    success: false,
    message: 'Your account has been blocked by admin',
  });
}

// 🔐 Compare password
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(401).json({
    success: false,
    message: 'Invalid credentials',
  });
}

// 🔥 UPDATE LAST LOGIN (ONLY SUCCESS LOGIN)
await User.findByIdAndUpdate(user._id, {
  lastLogin: new Date(),
});

// 🔑 Token
    const token = generateToken(user);

    // 🍪 Cookie
    res.cookie('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

    // ✅ Response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    next(error);
  }
};

// 🟡 @route   GET /api/auth/profile
// 🟡 @desc    Get logged-in user profile
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};