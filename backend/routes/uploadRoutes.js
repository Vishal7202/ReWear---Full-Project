const express = require('express');
const router = express.Router();
const multer = require('multer');

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // or your desired path
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }); // ✅ This is what gives us upload.single()

// Middleware
const { protect } = require('../middlewares/authMiddleware');

// Controller
const { uploadCloth } = require('../controllers/uploadController');

// Fix this line by using the actual `upload` defined above
router.post('/', protect, upload.single('image'), uploadCloth);

module.exports = router;
