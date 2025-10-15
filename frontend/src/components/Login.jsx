import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast'
// Import Redux hooks and actions to manage global state
import { useDispatch } from "react-redux"
import { setAuthUser } from '../redux/userSlice';

export default function Login() {
  // Local state to manage form input fields
  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  // Hooks for navigation and dispatching Redux actions
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to handle changes in input fields (username and password)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  // Async function to handle form submission (API call)
  const onsubmitHandler = async (e) => {
    e.preventDefault();

    // Basic client-side validation check
    if (!user.username || !user.password) {
      toast.error("Please enter both username and password.");
      return;
    }

    try {
      // Send login request to the backend server
      const res = await axios.post('http://localhost:8080/api/v1/user/login', user, {
        headers: {
          "Content-Type": 'application/json'
        },
        // Crucial for sending cookies (like JWT/session tokens) back to the server
        withCredentials: true
      });

      // Log the successful response data (for debugging)
      console.log("Login Success Data:", res.data);

      //  Success Logic: Check if the user object was returned
      if (res.data.username) {
        // Dispatch the user data to the Redux store
        dispatch(setAuthUser(res.data));

        // Navigate the user to the home page
        navigate("/");
        toast.success(`Welcome back, ${res.data.fullName || 'User'}!`);
      } else {
        // Handle unexpected successful status without user data
        toast.error("Login attempt succeeded but failed to receive user data.");
      }

    } catch (error) {

      //  Error Handling: Log the server response details
      if (error.response) {
        console.error("Login Failed Response Data (400/401 Status):", error.response.data);
      }

      // Extract the user-friendly message from the server response
      const serverMessage = error.response?.data?.message;

      if (serverMessage) {
        toast.error(serverMessage);
      } else {
        // Generic network error fallback
        toast.error("Login failed. Check server connection or network.");
      }
    }

    // Empty fields after submission (regardless of success/failure)
    setUser({
      username: "",
      password: ""
    })
  }

  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center text-gray-300'>Login</h1>
        <form onSubmit={onsubmitHandler}>

          {/* UserName Input */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-300'>UserName</span>
            </label>
            <input
              name="username"
              value={user.username}
              onChange={handleInputChange}
              className='w-full input input-bordered h-10'
              type="text"
              placeholder='Enter Your UserName'
            />
          </div>

          {/* Password Input */}
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-300'>Password</span>
            </label>
            <input
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className='w-full input input-bordered h-10'
              type="password" placeholder='Enter Your Password' />
          </div>

          <p className='text-center text-gray-300 m-2'>Don't have an account?
            <Link to="/signup" className='ml-1 text-blue-500 hover:underline'>
              SignUp
            </Link>
          </p>

          <div>
            <button type="submit" className="btn btn-block btn-sm sm:btn-sm md:btn-sm lg:btn-sm xl:btn-md mt-2">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
