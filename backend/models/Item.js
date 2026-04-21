const mongoose = require('mongoose');

// 📦 Item Schema
const itemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },

    category: {
      type: String,
      required: true,
      enum: ['Men', 'Women', 'Kids', 'Accessories', 'Others'],
      index: true,
    },

    size: {
      type: String,
      required: true,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      index: true,
    },

    condition: {
      type: String,
      required: true,
      enum: ['New', 'Like New', 'Used'],
      index: true,
    },

    imageUrl: {
      type: String,
      required: true,
      match: [/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i, 'Invalid image URL'],
    },

    // 🧠 SmartMatch ready fields
    tags: {
      type: [String],
      default: [],
      index: true,
    },

    brand: {
      type: String,
      trim: true,
      default: '',
    },

    color: {
      type: String,
      trim: true,
      default: '',
      index: true,
    },

    // 📊 Status flags
    isAvailable: {
      type: Boolean,
      default: true,
      index: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    views: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// 🔍 Compound index (for fast filtering)
itemSchema.index({
  category: 1,
  size: 1,
  condition: 1,
  isAvailable: 1,
});

// 📦 Clean JSON response
itemSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('Item', itemSchema);