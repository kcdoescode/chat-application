import { Server } from "socket.io"; 
import http from "http";
import express from "express";

const app = express();  

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:['http://localhost:3000'],
        methods:['GET','POST'],
        // --- THIS IS THE CRITICAL FIX ---
        // This line tells Socket.io to accept cookies from the browser.
        credentials: true
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]; // Renamed for clarity
};

const userSocketMap = {}; // Maps userId to socketId

io.on('connection', (socket) => {
    console.log('New user connected', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined" && userId) { // More robust check
        userSocketMap[userId] = socket.id; 
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    // --- SUBTLE BUG FIX in disconnect logic ---
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        // Find the userId associated with the disconnected socket
        const disconnectedUserId = Object.keys(userSocketMap).find(key => userSocketMap[key] === socket.id);
        if (disconnectedUserId) {
            delete userSocketMap[disconnectedUserId]; // Remove the correct user
            io.emit('getOnlineUsers', Object.keys(userSocketMap));
        }
    });
});

export { app, io, server };

