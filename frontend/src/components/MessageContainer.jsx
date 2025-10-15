import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice'; 
import { LuMessagesSquare } from "react-icons/lu";
import { IoArrowBack } from "react-icons/io5"; 

const MessageContainer = () => {
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const dispatch = useDispatch(); 

    const isOnline = selectedUser
        ? onlineUsers.includes(selectedUser._id)
        : false;
    const isUserSelected = !!selectedUser?._id;

    // This function will be called when the back button is clicked on mobile
    const handleBack = () => {
        dispatch(setSelectedUser(null)); // Clears the selected user, showing the sidebar
    };

    // Component to display when no user is selected
    const NoChatSelected = () => (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center md:min-w-[637px] h-full">
            <div className="p-8 rounded-3xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl transition-all hover:scale-[1.01] duration-300">
                <LuMessagesSquare className="text-blue-400 text-6xl mx-auto mb-4 drop-shadow-lg" />
                <h1 className="text-3xl font-extrabold text-white mb-2 drop-shadow-md">
                    Welcome to Chat App!
                </h1>
                <p className="text-blue-200 text-lg font-medium">
                    Select a user on the sidebar to start a conversation.
                </p>
            </div>
        </div>
    );

    // Component to display the active chat window
    const ChatWindow = () => (
        <div className="md:min-w-[637px] flex flex-col h-full">
            <div className="group flex gap-3 items-center p-4 rounded-2xl 
                            backdrop-blur-md bg-white/10 border border-white/20 
                            shadow-lg">

                {/* BACK BUTTON: Visible only on mobile (hidden on medium screens and up) */}
                <button onClick={handleBack} className='md:hidden text-white hover:text-blue-300 transition-colors mr-2'>
                    <IoArrowBack size={24} />
                </button>

                {/* Avatar */}
                <div className={`avatar ${isOnline ? 'online' : 'offline'}`}>
                    <div className="w-12 rounded-full ring ring-blue-400 ring-offset-2 ring-offset-white/20">
                        <img
                            src={selectedUser?.profilePhoto}
                            alt="user-profile"
                        />
                    </div>
                </div>

                {/* User Info */}
                <div className="flex flex-col flex-1">
                    <p className="font-semibold text-white text-lg tracking-wide">
                        {selectedUser?.fullName}
                    </p>
                    {/* Dynamic Online/Offline Status */}
                    <p className={`text-sm ${isOnline ? 'text-white' : 'text-gray-400'}`}>
                        {isOnline ? 'Online' : 'Offline'}
                    </p>
                </div>

                {/* Status dot */}
                {isOnline && (
                    <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_2px_rgba(34,197,94,0.7)]"></div>
                )}
            </div>

            {/* Messages area with custom scrollbar */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-2 space-y-2">
                <Messages />
            </div>

            {/* Input */}
            <SendInput />
        </div>
    );

    return (
        <>{isUserSelected ? <ChatWindow /> : <NoChatSelected />}</>
    );
}

export default MessageContainer;