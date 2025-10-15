import React, { useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user); 
    
    const isSentByMe = authUser?._id === message?.senderId;
    const chatClassName = isSentByMe ? 'chat-end' : 'chat-start'; 
    const bubbleColor = isSentByMe ? 'bg-blue-700' : 'bg-blue-500'; 
    
    const defaultPlaceholder = "https://img.daisyui.com/images/profile/demo/kenobee@192.webp";
    
    const profileImage = isSentByMe
        ? (authUser?.profilePhoto || defaultPlaceholder) 
        : (selectedUser?.profilePhoto || defaultPlaceholder); 

    const formattedTime = useMemo(() => {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    }, []); 

    useEffect(() => {
        setTimeout(() => {
            scroll.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [message]);

    return (
        <div ref={scroll} className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full ring ring-blue-400 ring-offset-2 ring-offset-white/20">
                    <img
                        alt="Profile"
                        src={profileImage}
                    />
                </div>
            </div>

            <div className={`chat-bubble text-white shadow-md rounded-2xl px-4 py-2 
                             max-w-xs sm:max-w-sm lg:max-w-md 
                             font-medium tracking-wide ${bubbleColor}`}>
                {message?.message}
            </div>

            <div className="chat-footer text-[11px] text-gray-400 mt-1 ml-2">
                {formattedTime}
            </div>
        </div>
    );
}

export default Message;
