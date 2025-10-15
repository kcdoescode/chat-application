import React, { useEffect, useRef } from 'react';
import Message from './Message'; 
import useGetMessages from '../hooks/useGetMessages'; 
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage'; 

const Messages = () => {
    useGetRealTimeMessage();
    const { loading } = useGetMessages(); 
    const { messages } = useSelector(store => store.message);
    const scrollRef = useRef(); // Used to automatically scroll to the newest message
    useEffect(() => {
        setTimeout(() => {
            scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100); 
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
            
            {/* 1. Loading State */}
            {loading && (
                <div className="flex justify-center items-center h-full">
                    <span className="loading loading-spinner text-blue-500 loading-lg"></span>
                </div>
            )}

            {/* 2. Message Rendering */}
            {!loading && messages && messages.length > 0 && (
                messages.map((message) => (
                    <Message key={message._id} message={message} ref={scrollRef} />
                ))
            )}

            {/* 3. Empty Conversation State */}
            {!loading && (!messages || messages.length === 0) && (
                <div className="flex justify-center items-center h-full">
                    <p className="text-white text-lg font-medium opacity-70">
                        Say hi to start the conversation! 👋
                    </p>
                </div>
            )}
            
            <div ref={scrollRef}></div> 
        </div>
    );
}

export default Messages;
