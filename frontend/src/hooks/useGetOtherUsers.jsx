import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';

const BACKEND_URL = "https://chat-application-backend-t5qg.onrender.com";

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    const { authUser } = useSelector(store => store.user);

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                // This check is good, keep it.
                if (!authUser) return;

                // --- THIS IS THE FIX ---
                // We will rely ONLY on the HttpOnly cookie that the browser sends automatically.
                // The manual localStorage and Authorization header logic has been removed.

                axios.defaults.withCredentials = true; // This is the only line you need for auth
                
                // The axios request no longer needs the manual headers object.
                const res = await axios.get(`${BACKEND_URL}/api/v1/user/`);

                // This logic is correct, keep it.
                const otherUsers = res.data.filter(u => u._id !== authUser._id);
                dispatch(setOtherUsers(otherUsers));

            } catch (error) {
                console.error("Error fetching users:", error);
                // The error you see in your console will be caught here.
            }
        };

        if (authUser) { // Added a check to only run if authUser exists
             fetchOtherUsers();
        }
    }, [authUser, dispatch]);
};

export default useGetOtherUsers;
