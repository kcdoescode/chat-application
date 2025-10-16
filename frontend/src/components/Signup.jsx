import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URL = "https://chat-application-backend-t5qg.onrender.com";


export default function Signup() {
    const [user, setUser] = useState({
        fullName: "",
        username: "",         
        password: "",
        confirmpassword: "",
        gender: "",
    });
    const navigate = useNavigate();

    // HANDLER 1: Handles all text inputs using the 'name' attribute
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser, 
            [name]: value 
        }));
    }

    // HANDLER 2: Handles the exclusive checkbox selection
    const handleCheckbox = (genderValue) => {
        setUser(prevUser => ({
            ...prevUser, 
            gender: prevUser.gender === genderValue ? "" : genderValue
        }));
    }

    // SUBMIT HANDLER WITH VALIDATION
    const onsubmitHandler = async (e) => {
        e.preventDefault();

        if (!user.fullName || !user.username || !user.password || !user.confirmpassword || !user.gender) {
            toast.error("Please fill in all fields.");
            return;
        }
        if (user.password.length < 6) {
             toast.error("Password must be at least 6 characters long.");
             return;
        }
        if (user.password !== user.confirmpassword) {
            toast.error("Passwords do not match!");
            return;
        }
        // --- END VALIDATION ---
        
        console.log("Signup Data submitted:", user);

        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/register`, user, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            });
            
            // Log the successful response data
            console.log("Registration Success Response:", res.data);

            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message || "Registration failed.");
            }
        } catch (error) {
            
            // Log the failed response data (400, 500 status codes)
            if (error.response) {
                console.error("Registration Failed Response Data:", error.response.data);
            }
            
            console.error("Axios Error:", error);
            const errorMessage = error.response?.data?.message || "Registration failed. Check server logs for 400 error details.";
            toast.error(errorMessage);
        }

        // Reset form fields after submission attempt
        setUser({
            fullName: "",
            username: "",
            password: "",
            confirmpassword: "",
            gender: "",
        });
    }

    return (
        <div className="min-w-96 mx-auto">
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
                <h1 className='text-3xl font-bold text-center text-gray-300'>SignUp</h1>
                <form onSubmit={onsubmitHandler} action="">
                    
                    {/* Full Name Input */}
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-300'>Full Name</span>
                        </label>
                        <input
                            name="fullName"
                            value={user.fullName}
                            onChange={handleInputChange}
                            className='w-full input input-bordered h-10'
                            type="text"
                            placeholder='Enter Your Full Name'
                        />
                    </div>

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
                            type="password"
                            placeholder='Enter Your Password'
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text text-gray-300'>Confirm Password</span>
                        </label>
                        <input
                            name="confirmpassword" 
                            value={user.confirmpassword}
                            onChange={handleInputChange}
                            className='w-full input input-bordered h-10'
                            type="password"
                            placeholder='Confirm Password'
                        />
                    </div>

                    {/* Gender Checkboxes */}
                    <div className='flex items-center my-4'>
                        <div className='flex items-center text-gray-300 mr-4'>
                            <p>Male</p>
                            <input
                                type="checkbox"
                                checked={user.gender === "male"}
                                onChange={() => handleCheckbox("male")}
                                className="checkbox checkbox-primary mx-2 outline outline-1 outline-offset-1 outline-blue-500" />
                        </div>
                        <div className='flex items-center text-gray-300'>
                            <p>Female</p>
                            <input
                                type="checkbox"
                                checked={user.gender === "female"}
                                onChange={() => handleCheckbox("female")}
                                className="checkbox checkbox-primary mx-2 outline outline-1 outline-offset-1 outline-blue-500" />
                        </div>
                    </div>

                    {/* Link and Button */}
                    <p className='text-center text-gray-300'>Already have an account?
                        <Link to="/login" className='ml-1 text-blue-500 hover:underline'>
                            Login
                        </Link>
                    </p>

                    <div>
                        <button type='submit' className="btn btn-block btn-sm sm:btn-sm md:btn-sm lg:btn-sm xl:btn-md mt-3">
                            SignUp
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
