const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// CREATE post
router.post('/', async (req, res) => {
  try {
    const { user, message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message required' });
    }

    const newPost = new Post({
      user: user || 'Anonymous',
      message,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post' });
  }
});

module.exports = router;