// models/report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reportedItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'reviewed'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
