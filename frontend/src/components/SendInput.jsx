import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const BACKEND_URL = "https://chat-application-backend-t5qg.onrender.com";

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    const { messages } = useSelector(store => store.message);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!selectedUser || !message.trim()) return;

        try {
            const res = await axios.post(
                `${BACKEND_URL}/api/v1/message/send/${selectedUser._id}`, 
                { message: message },
                { withCredentials: true }
            );

            console.log("Message sent:", res.data);
            dispatch(setMessages([...messages, res.data.newMessage])); 

        } catch (error) {
            console.log("Error sending message:", error);
        }

        setMessage("");
    }

    return (
        <form onSubmit={onSubmitHandler} className="px-4 my-3">
            <div className="w-full relative flex items-center">
                {/* Glass Input */}
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Send a message..."
                    className="w-full p-3 pr-12 text-sm rounded-2xl 
                      backdrop-blur-md bg-white/10 border border-white/20 
                      text-white placeholder:text-blue-200
                      shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 
                      transition-all"
                />

                {/* Send Button */}
                <button
                    type="submit"
                    className="absolute right-2 p-2 rounded-xl 
                      bg-gradient-to-r from-blue-400 to-blue-600 
                      text-white shadow-md hover:shadow-lg 
                      transition-all duration-200 transform active:scale-95"
                >
                    ➤
                </button>
            </div>
        </form>
    )
}

export default SendInput;
