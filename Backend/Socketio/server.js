
import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// ✅ Shared user map
const users = {};

// ✅ Export helper
export const getReceiverSocketId = (receiverId) => users[receiverId];

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});



io.on("connection", (socket) => {
  console.log("NEW CLIENT CONNECTED:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Online Users:", users);
    io.emit("getOnlineUsers", Object.keys(users));
  }

  // Handle sending a message to a specific user (receiver)
  socket.on("sendMessage", (newMessage) => {
    const { senderId, receiverId, text, timestamp } = newMessage;
    console.log("Received message from senderId:", senderId);

    // Make sure senderId and receiverId are valid
    if (!senderId || !receiverId) {
      console.log("Sender or Receiver ID is missing");
      return;
    }

    // Get the receiver's socket ID from the users map
    const receiverSocketId = users[receiverId];
    if (receiverSocketId) {
      // Emit the message to the receiver
      io.to(receiverSocketId).emit("newMessage", { senderId, text, timestamp });
    } else {
      console.log(`Receiver ${receiverId} is not online`);
    }
  });

  socket.on("disconnect", () => {
    console.log("CLIENT DISCONNECTED:", socket.id);
    const disconnectedUserId = Object.keys(users).find(
      (id) => users[id] === socket.id
    );
    if (disconnectedUserId) {
      delete users[disconnectedUserId];
      io.emit("getOnlineUsers", Object.keys(users));
    }
  });
});


export { app, server };
