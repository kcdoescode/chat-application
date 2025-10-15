import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';

const OtherUsers = ({ users }) => {
    useGetOtherUsers();
    
    if (!users || users.length === 0) {
        return (
            <div className='flex-1 overflow-y-auto text-center text-gray-200 p-4'>
                No users found, if you are not logged-in, please click logout, and then login or sign up first.
            </div>
        );
    }

    return (
        <div
            className="
                flex-1 flex-col 
                overflow-y-auto 
                overflow-x-hidden
                custom-scrollbar
                p-2 space-y-1 
                w-full
                max-h-[90vh] 
                md:max-h-full
            "
        >
            {users.map((user) => {
                return (
                    <OtherUser key={user._id} user={user} />
                )
            })}
        </div>
    );
};

export default OtherUsers;
