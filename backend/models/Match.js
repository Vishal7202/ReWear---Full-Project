// models/match.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);
