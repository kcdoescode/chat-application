import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast'
import { useDispatch } from "react-redux"
import { setAuthUser } from '../redux/userSlice';

const BACKEND_URL = "https://chat-application-backend-t5qg.onrender.com";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    if (!user.username || !user.password) {
      toast.error("Please enter both username and password.");
      return;
    }

    try {
      const res = await axios.post(`${BACKEND_URL}/api/v1/user/login`, user, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      });

      console.log("Login Success Data:", res.data);

      if (res.data.username) {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }

        dispatch(setAuthUser(res.data));
        navigate("/");
        toast.success(`Welcome back, ${res.data.fullName || 'User'}!`);
      } else {
        toast.error("Login attempt succeeded but failed to receive user data.");
      }

    } catch (error) {
      if (error.response) {
        console.error("Login Failed Response Data (400/401 Status):", error.response.data);
      }

      const serverMessage = error.response?.data?.message;

      if (serverMessage) {
        toast.error(serverMessage);
      } else {
        toast.error("Login failed. Check server connection or network.");
      }
    }

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
