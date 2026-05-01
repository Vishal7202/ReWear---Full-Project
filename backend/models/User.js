const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
      index: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      index: true,
    },

    avatar: {
      type: String,
      default: '',
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    // 🔥 NEW (IMPORTANT)
    isBlocked: {
      type: Boolean,
      default: false,
      index: true,
    },

    // 🔥 NEW (tracking)
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 Hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔐 Compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 📦 Clean response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);