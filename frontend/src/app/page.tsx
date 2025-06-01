'use client';

import { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import ChatInput from './components/ChatInput';
import MessageList from './components/MessageList';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';

type Message = {
  id: string;
  text: string;
  sender: string;
  avatar: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
};

type User = {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentUser, setCurrentUser] = useState<User>({
    id: '',
    name: '',
    avatar: '',
    status: 'online'
  });
  const [users, setUsers] = useState<User[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate random user for demo
    const userId = `user_${Math.floor(Math.random() * 10000)}`;
    const username = `User${Math.floor(Math.random() * 1000)}`;
    const avatar = `https://api.dicebear.com/7.x/pixel-art/svg?seed=${username}`;
    
    setCurrentUser({
      id: userId,
      name: username,
      avatar,
      status: 'online'
    });

    // Mock users list
    setUsers([
      {
        id: 'user_1',
        name: 'Alex Johnson',
        avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Alex',
        status: 'online'
      },
      {
        id: 'user_2',
        name: 'Sam Wilson',
        avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Sam',
        status: 'offline'
      },
      {
        id: 'user_3',
        name: 'Taylor Swift',
        avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Taylor',
        status: 'online'
      }
    ]);

    // Connect to Socket.IO server
    const newSocket = io('http://localhost:1999');
    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on('chatMessage', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Load initial messages (mock)
    setMessages([
      {
        id: '1',
        text: 'Hey there! Welcome to the chat!',
        sender: 'Alex Johnson',
        avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Alex',
        timestamp: new Date(Date.now() - 3600000),
        status: 'read'
      },
      {
        id: '2',
        text: 'How are you doing today?',
        sender: 'Alex Johnson',
        avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=Alex',
        timestamp: new Date(Date.now() - 1800000),
        status: 'read'
      },
      {
        id: '3',
        text: "I'm doing great! Just setting up this new chat app.",
        sender: currentUser.name || 'You',
        avatar: currentUser.avatar,
        timestamp: new Date(Date.now() - 900000),
        status: 'read'
      }
    ]);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (text.trim() && socket) {
      const message: Message = {
        id: Date.now().toString(),
        text,
        sender: currentUser.name,
        avatar: currentUser.avatar,
        timestamp: new Date(),
        status: 'sent'
      };
      socket.emit('chatMessage', message);
      // Optimistic update
      setMessages((prev) => [...prev, message]);
    }
  };

  return (
   <ProtectedRoute>
     <div className="flex bg-gray-50 h-screen overflow-hidden text-gray-800">
      {/* Sidebar */}
      <Sidebar 
        users={users} 
        currentUser={currentUser} 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Chat Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <Header 
          currentUser={currentUser}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Messages */}
        <div className="flex-1 bg-white p-4 overflow-y-auto">
          <div className="mx-auto max-w-3xl">
            <MessageList messages={messages} currentUser={currentUser} />
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="bg-white p-4 border-gray-200 border-t">
          <div className="mx-auto max-w-3xl">
            <ChatInput onSendMessage={sendMessage} />
          </div>
        </div>
      </div>
    </div>
   </ProtectedRoute>
  );
}