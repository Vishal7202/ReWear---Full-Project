const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Kids', 'Accessories', 'Others'], // Optional
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'XL', 'XXL'],
    required: true,
  },
  condition: {
    type: String,
    enum: ['New', 'Like New', 'Used'],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    // Optional regex for basic image URL validation
    match: [/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i, 'Invalid image URL'],
  },
  isAvailable: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false }, // Optional
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);
