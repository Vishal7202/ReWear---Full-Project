const express = require('express');
const router = express.Router();
const multer = require('multer');

// ===============================
// 📁 Storage config
// ===============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// ✅ File filter (important)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

// ✅ Upload config
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// ===============================
// 🔐 Middleware (fixed)
// ===============================
const { protect } = require('../middleware/protect');

// ===============================
// 📤 Controller
// ===============================
const { uploadCloth } = require('../controllers/uploadController');

// ===============================
// 🚀 Route
// ===============================
router.post('/', protect, upload.single('image'), uploadCloth);

module.exports = router;