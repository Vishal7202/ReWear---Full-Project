const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  clothingType: { 
    type: String, 
    required: true,
    trim: true,
    index: true
  },

  size: { 
    type: String, 
    required: true,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    index: true
  },

  condition: { 
    type: String,
    enum: ['New', 'Like New', 'Used'],
    default: 'Used'
  },

  description: { 
    type: String,
    trim: true,
    default: ''
  },

  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true
  },

  status: { 
    type: String, 
    enum: ['pending', 'matched', 'fulfilled'], 
    default: 'pending',
    index: true
  },

}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);