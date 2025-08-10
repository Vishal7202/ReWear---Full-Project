const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  title: String,
  clothingType: String,
  size: String,
  gender: String,
  status: {
    type: String,
    enum: ['pending', 'matched', 'fulfilled'],
    default: 'pending',
  },
  image: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('SmartMatch', matchSchema);
