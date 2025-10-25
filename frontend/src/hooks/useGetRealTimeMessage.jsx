import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((state) => state.socket);
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket || !socket.connected) return;

    const handleNewMessage = (newMessage) => {
      console.log("🔥 REAL-TIME MESSAGE:", newMessage);

      if (
        selectedUser &&
        (newMessage.senderId === selectedUser._id ||
          newMessage.receiverId === selectedUser._id)
      ) {
        dispatch(addMessage(newMessage));
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser, dispatch]);
};

export default useGetRealTimeMessage;
