// backend/controllers/chatController.js

// Mock chat and message storage
const chats = [];     // array of { roomId, users: [user1, user2], createdAt }
const messages = [];  // array of { roomId, sender, message, timestamp }

// Create a new chat or return existing one
const createChat = (req, res) => {
  const { user1, user2 } = req.body;

  if (!user1 || !user2) {
    return res.status(400).json({ error: "Both user1 and user2 are required" });
  }

  // Check if chat already exists
  const existing = chats.find(
    chat => chat.users.includes(user1) && chat.users.includes(user2)
  );

  if (existing) {
    return res.status(200).json({ message: "Chat already exists", chat: existing });
  }

  const newChat = {
    roomId: `${user1}_${user2}_${Date.now()}`,
    users: [user1, user2],
    createdAt: Date.now()
  };

  chats.push(newChat);
  res.status(201).json({ message: "Chat created", chat: newChat });
};

// Get all chats for current user
const getChats = (req, res) => {
  const currentUser = req.user?.email || req.query.user;

  if (!currentUser) {
    return res.status(400).json({ error: "User is required" });
  }

  const userChats = chats.filter(chat => chat.users.includes(currentUser));
  res.status(200).json({ chats: userChats });
};

// Send message
const sendMessage = (req, res) => {
  const { roomId, sender, message } = req.body;

  if (!roomId || !sender || !message) {
    return res.status(400).json({ error: "roomId, sender and message are required" });
  }

  const newMsg = { roomId, sender, message, timestamp: Date.now() };
  messages.push(newMsg);
  res.status(200).json({ success: true, message: "Message sent", data: newMsg });
};

// Get messages for a chat room
const getMessages = (req, res) => {
  const { chatId } = req.params;
  const chatHistory = messages.filter(msg => msg.roomId === chatId);
  res.status(200).json({ data: chatHistory });
};

module.exports = {
  createChat,
  getChats,
  sendMessage,
  getMessages
};
