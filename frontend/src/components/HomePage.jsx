import React from 'react';
import Sidebar from '../components/Sidebar.jsx'; 
import MessageContainer from '../components/MessageContainer.jsx'; 
import { useSelector } from 'react-redux';

const HomePage = () => {
    const { selectedUser } = useSelector(store => store.user);
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

    return (
        <div
            className='flex h-screen w-screen items-center justify-center p-0 md:p-4 transition-all duration-500'
            style={{
                background: isDesktop
                    ? "url('/bg.png'), linear-gradient(135deg, #0b1228, #112b54)"
                    : "linear-gradient(135deg, #0b1228, #112b54)",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundBlendMode: 'overlay',
            }}
        >
            <main
                className='
                    flex
                    h-full w-full md:max-w-7xl
                    md:rounded-3xl
                    overflow-hidden
                    bg-[#0b1228]/70
                    backdrop-blur-2xl
                    border border-white/10
                    shadow-[0_8px_32px_0_rgba(15,25,60,0.75)]
                    transition-all duration-300 ease-in-out
                '
            >
                {/* Sidebar Section */}
                <div
                    className={`
                        w-full md:w-[35%] lg:w-[30%]
                        ${selectedUser ? 'hidden' : 'flex'} md:flex
                        flex-col
                        bg-gradient-to-b from-[#0f1c3d]/60 to-[#091025]/40
                        md:border-r md:border-white/10
                    `}
                >
                    <Sidebar />
                </div>

                {/* Message Container */}
                <div
                    className={`
                        w-full md:w-[65%] lg:w-[70%]
                        ${selectedUser ? 'flex' : 'hidden'} md:flex
                        flex-col
                        bg-gradient-to-b from-[#091025]/40 to-[#0f1c3d]/30
                    `}
                >
                    <MessageContainer />
                </div>
            </main>
        </div>
    );
}

export default HomePage;
