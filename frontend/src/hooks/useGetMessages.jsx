import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const BACKEND_URL = "https://chat-application-backend-t5qg.onrender.com";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false); 
    
    // Get selectedUser from the store
    const { selectedUser } = useSelector(store => store.user); 
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selectedUser?._id) { 
            console.log("No user selected, skipping message fetch.");
            // Clear previous messages when a user is deselected
            dispatch(setMessages([])); 
            return; 
        }

        const fetchMessages = async () => {
            setLoading(true); 
            try {
                const res = await axios.get(`${BACKEND_URL}/api/v1/message/${selectedUser._id}`, {
                    withCredentials: true,
                });
                
                console.log("Fetched messages array:", res.data);
                
                dispatch(setMessages(res.data));
            } catch (error) {
                console.error("Error fetching messages:", error);
                dispatch(setMessages([])); 
            } finally {
                setLoading(false); // Stop loading regardless of success/fail
            }
        }

        fetchMessages();
        
        // Dependency array: Re-run when selectedUser changes
    }, [selectedUser?._id, dispatch]); 
    
    return { loading };
}

export default useGetMessages;
