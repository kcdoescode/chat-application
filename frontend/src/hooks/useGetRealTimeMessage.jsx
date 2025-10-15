import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector(state => state.socket);
    const { messages } = useSelector(state => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            console.log("REAL-TIME MESSAGE RECEIVED:", newMessage); 
            
            const updatedMessages = Array.isArray(messages) ? [...messages, newMessage] : [newMessage];
            dispatch(setMessages(updatedMessages));
        };

        socket?.on("newMessage", handleNewMessage);

        return () => {
            socket?.off("newMessage", handleNewMessage);
        };
    }, [socket, messages, dispatch]);

};

export default useGetRealTimeMessage;

