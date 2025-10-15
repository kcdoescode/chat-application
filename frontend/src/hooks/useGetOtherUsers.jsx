import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(store => store.user);

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        if (!authUser) return;

        axios.defaults.withCredentials = true;
        const res = await axios.get('http://localhost:8080/api/v1/user/');

        // ✅ Filter out the logged-in user
        const otherUsers = res.data.filter(u => u._id !== authUser._id);

        // ✅ Store users in Redux
        dispatch(setOtherUsers(otherUsers));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchOtherUsers();
  }, [authUser, dispatch]);
};

export default useGetOtherUsers;
