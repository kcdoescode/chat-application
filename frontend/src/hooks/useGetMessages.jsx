import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const BACKEND_URL = "https://chat-application-backend-t5qg.onrender.com";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser?._id) {
      // clear local messages when no chat selected
      dispatch(setMessages([]));
      return;
    }

    let cancelled = false;

    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/v1/message/${selectedUser._id}`,
          { withCredentials: true }
        );
        if (!cancelled) {
          // ensure to always set an array
          const payload = Array.isArray(res.data) ? res.data : [];
          dispatch(setMessages(payload));
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        if (!cancelled) dispatch(setMessages([]));
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchMessages();

    return () => {
      cancelled = true;
    };
    // when selectedUser changes, re-fetch history
  }, [selectedUser?._id, dispatch]);

  return { loading };
};

export default useGetMessages;
