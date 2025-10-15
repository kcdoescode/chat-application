import React from 'react'
import { useDispatch, useSelector } from 'react-redux';  
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch(); 
    const {selectedUser, onlineUsers} = useSelector(store => store.user);
    const isOnline = onlineUsers.includes(user._id);
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }

    
  return (
    <>
            <div onClick={()=>selectedUserHandler(user)} className= {` ${selectedUser?._id === user._id ? 'bg-white/30' : ''}
                group flex gap-3 items-center 
                hover:bg-white/10 
                rounded-lg p-3 cursor-pointer
                transition-all duration-300 ease-in-out
                hover:scale-[1.02] transform
            `}>
                <div className={`avatar ${isOnline ?'online': ''}`}>
                    {/* Add a subtle ring to the avatar on group hover */}
                    <div className='w-11 rounded-full group-hover:ring-2 group-hover:ring-sky-400 transition-all'>
                        <img src={user?.profilePhoto} alt="user-profile" />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <p className='font-bold text-gray-100'>{user?.fullName}</p>
                    <p className='text-sm text-gray-300'>{` ${isOnline ?'Online': 'Offline'}`}</p>
                </div>
            </div>

            <div className='divider my-0 py-0 h-1 opacity-20'></div>
        </>
  )
}

export default OtherUser