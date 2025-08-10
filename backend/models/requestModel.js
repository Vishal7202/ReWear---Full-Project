const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  clothingType: { type: String, required: true },
  size: { type: String, required: true },
  condition: { type: String },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'matched', 'fulfilled'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Request', requestSchema);
