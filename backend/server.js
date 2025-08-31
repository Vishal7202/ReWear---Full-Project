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

dotenv.config();

// Connect to DB before starting server
connectDB().then(() => {
  const app = express();
  const server = http.createServer(app);

  // Socket.IO setup
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('send_message', (data) => {
      console.log('Received message:', data);
      socket.broadcast.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

  // Middlewares
  app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
  }));

  // Serve uploads
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // Routes
  app.use('/api/auth', require('./routes/authRoutes'));
  app.use('/api/users', require('./routes/userRoutes'));
  app.use('/api/contact', require('./routes/contactRoutes'));
  app.use('/api/smartmatch', require('./routes/smartMatchRoutes'));
  app.use('/api/listings', require('./routes/browseRoutes'));
  app.use('/api/upload', require('./routes/uploadRoutes'));
  app.use('/api/admin', require('./routes/adminRoutes'));
  app.use('/wishlist', require('./routes/wishlistRoutes'));

  // Root route
  app.get('/', (req, res) => {
    res.send('✅ ReWear API is running...');
  });

  // Global error handler
  app.use((err, req, res, next) => {
    console.error('❌ Global Error:', err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
  });

  // Start server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
   console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('❌ DB Connection failed:', err);
  process.exit(1);
});
