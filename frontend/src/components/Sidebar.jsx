import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (search) {
            const newFilteredUsers = otherUsers?.filter((user) =>
                user.fullName.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredUsers(newFilteredUsers);
        } else {
            setFilteredUsers(otherUsers);
        }
    }, [search, otherUsers]);

    const logoutHandler = async () => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.get('http://localhost:8080/api/v1/user/logout');
            dispatch(setAuthUser(null));
            dispatch(setSelectedUser(null));
            dispatch(setMessages(null));
            navigate('/login');
            toast.success(res.data.message || "Logged out successfully!");
        } catch (error) {
            console.error("Logout Error:", error);
            toast.error("Logout failed. Please check backend or API path.");
        }
    }

    return (
        <div
            className='
                flex flex-col
                h-full
                p-4
                border-r border-white/10
                bg-gradient-to-b from-[#0f1c3d]/60 to-[#0a1228]/70
                backdrop-blur-lg
                text-white
                transition-all duration-300
                shadow-[inset_0_0_12px_rgba(255,255,255,0.05)]
            '
        >
            {/* Search Bar */}
            <div className='flex items-center gap-2 mb-3'>
                <span className='p-2 rounded-full bg-sky-600/80 hover:bg-sky-500 transition-all duration-300 shadow-md'>
                    <FaSearch size='15px' />
                </span>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search users...'
                    className='
                        flex-1 
                        text-sm
                        rounded-full 
                        bg-white/10 
                        text-white 
                        placeholder-gray-300 
                        border-none
                        px-3 py-2
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-sky-500 
                        transition duration-200
                    '
                    type="text"
                />
            </div>

            <div className="divider my-2 border-white/10"></div>

            {/* Users List */}
            <div className='flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-sky-700/50 hover:scrollbar-thumb-sky-600/70'>
                <OtherUsers users={filteredUsers} />
            </div>

            {/* Logout Button */}
            <div className='mt-auto pt-4'>
                <button
                    onClick={logoutHandler}
                    className='
                        px-4 py-2 text-sm font-semibold
                        bg-gradient-to-r from-sky-600 to-blue-700
                        hover:from-sky-500 hover:to-blue-600
                        text-white
                        rounded-lg
                        shadow-lg shadow-blue-900/30
                        transition-all duration-300 ease-in-out
                        w-fit
                    '
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
