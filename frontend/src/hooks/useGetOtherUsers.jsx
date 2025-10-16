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
        if (!authUser) return;

        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found, user not authenticated");
          return;
        }

        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BACKEND_URL}/api/v1/user/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const otherUsers = res.data.filter(u => u._id !== authUser._id);
        dispatch(setOtherUsers(otherUsers));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchOtherUsers();
  }, [authUser, dispatch]);
};

export default useGetOtherUsers;
