import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:4000'; // Change if your server URL differs

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Bot', text: 'Welcome to the real-time chat!' },
  ]);
  const [input, setInput] = useState('');
  const socketRef = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
  socketRef.current = io(SOCKET_SERVER_URL);

  socketRef.current.on('connect', () => {
    console.log('Connected to socket server with id:', socketRef.current.id);
  });

  socketRef.current.on('receive_message', (message) => {
    setMessages((prev) => [...prev, message]);
  });

  socketRef.current.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });

  return () => {
    socketRef.current.disconnect();
  };
}, []);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const message = {
      id: Date.now(),
      sender: 'You',
      text: input.trim(),
    };

    // Add your own message locally
    setMessages((prev) => [...prev, message]);

    // Send message to server
    socketRef.current.emit('send_message', message);

    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md flex flex-col h-[600px]">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">Real-Time Chat</h1>

      <div className="flex-1 overflow-y-auto mb-4 border border-gray-300 rounded p-4 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-center text-gray-400">No messages yet. Say hi!</p>
        )}
        {messages.map(({ id, sender, text }) => (
          <div
            key={id}
            className={`mb-3 flex ${
              sender === 'You' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg whitespace-pre-wrap ${
                sender === 'You'
                  ? 'bg-indigo-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-800 rounded-bl-none'
              }`}
            >
              <span className="font-semibold block mb-1">{sender}</span>
              <span>{text}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center space-x-3">
        <textarea
          rows={1}
          className="flex-1 border border-gray-300 rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded disabled:bg-indigo-300"
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
