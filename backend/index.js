import express from "express";
import dotenv from "dotenv";
import { app, server, io } from "./socket/socket.js";  
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import messageRoute from "./routes/messageRoute.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;

// ✅ CORS setup for both local dev and live frontend
const allowedOrigins = [
  "http://localhost:3000",
  "https://chat-application-henna-five.vercel.app",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);

// Start server
server.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server is running on port ${PORT}`);
});
