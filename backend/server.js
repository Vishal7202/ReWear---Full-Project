const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const swapRoutes = require("./routes/swapRoutes");

dotenv.config();

// 🔥 Allowed Origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://rewear-full-project.vercel.app'
];

connectDB().then(() => {
  const app = express();

  // ✅ Render fix
  app.set("trust proxy", 1);

  const server = http.createServer(app);

  // 🔌 Socket.IO
  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('🔌 Socket connected:', socket.id);

    socket.on('send_message', (data) => {
      socket.broadcast.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected:', socket.id);
    });
  });

  // ✅ FINAL CORS (CLEAN + CORRECT)
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  }));

  // 🧱 Middlewares
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan('dev'));

  app.use(helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  }));

  app.use(rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
  }));

  // 📁 Static
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // 🔗 Routes
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/users', require('./routes/userRoutes'));
  app.use('/api/contact', require('./routes/contactRoutes'));
  app.use('/api/smartmatch', require('./routes/smartMatchRoutes'));
  app.use('/api/listings', require('./routes/browseRoutes'));
  app.use('/api/upload', require('./routes/uploadRoutes'));
  app.use('/api/admin', require('./routes/adminRoutes'));
  app.use('/wishlist', require('./routes/wishlistRoutes'));
  app.use('/api/posts', require('./routes/postRoutes'));
  app.use('/api/swap', swapRoutes);

  // 🏠 Root
  app.get('/', (req, res) => {
    res.send('✅ ReWear API is running...');
  });

  // ❌ Error handler
  app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({ message: err.message || 'Something went wrong!' });
  });

  // 🚀 Start server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

}).catch((err) => {
  console.error('❌ DB Connection failed:', err);
  process.exit(1);
});