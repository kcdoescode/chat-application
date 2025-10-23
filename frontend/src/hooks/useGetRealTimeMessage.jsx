import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((state) => state.socket);
  const { messages } = useSelector((state) => state.message);
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      console.log("REAL-TIME MESSAGE RECEIVED:", newMessage);

      // ✅ Only add if message is from or to current user
      if (
        selectedUser &&
        (newMessage.senderId === selectedUser._id ||
          newMessage.receiverId === selectedUser._id)
      ) {
        dispatch(setMessages((prev) => [...prev, newMessage]));
      }
    };

    // ✅ Attach listener once
    socket.on("newMessage", handleNewMessage);

    // 🧹 Cleanup old listener
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser, dispatch]); 
};

export default useGetRealTimeMessage;
