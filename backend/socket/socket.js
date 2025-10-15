import { Server } from "socket.io"; 
import http from "http";
import express from "express";

const app = express();  

const server = http.createServer(app);  // Create an HTTP server
const io = new Server(server, {
    cors:{
        origin:['http://localhost:3000'],
        methods:['GET','POST'],
    },
});

// Function to get the socket ID of a user by their user ID
export const getReceiverSocketId = (receiverId) => {
    return useSocketMap[receiverId];
};

const useSocketMap = {}; // Object to map user IDs to socket IDs for showing online status

io.on('connection',(socket)=>{
    console.log('New user connected', socket.id); // Listen for new connections

    const userId = socket.handshake.query.userId; // Get user ID from query parameters
    if (userId !== undefined) {
        useSocketMap[userId] = socket.id; 
    }

      io.emit('getOnlineUsers', Object.keys(useSocketMap)); // Emit the list of online users to all connected clients

    socket.on('disconnect',()=>{
        console.log('User disconnected', socket.id); // Listen for disconnections
        delete useSocketMap[userId]; // Remove user from the map on disconnect
        io.emit('getOnlineUsers', Object.keys(useSocketMap)); // Update the list of online users
    })
})

export {app, io, server};  // Export the app, io, and server objects