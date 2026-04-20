const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user: String,
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);