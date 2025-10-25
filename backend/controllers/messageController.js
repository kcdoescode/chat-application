import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id; 
    const receiverId = req.params.id;
    const { message } = req.body;

    // 🔹 1. Find or create conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    // 🔹 2. Create message
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    // 🔹 3. Push new message to conversation and save
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // 🔹 4. Send message to receiver via Socket.IO (real-time)
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // ✅ Sender gets message instantly via API response (no need to emit)
    return res.status(201).json({ newMessage });
  } catch (error) {
    console.error("❌ Error in sendMessage:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;

    // 🔹 5. Find conversation and populate messages
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    return res.status(200).json(conversation.messages);
  } catch (error) {
    console.error("❌ Error in getMessage:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
