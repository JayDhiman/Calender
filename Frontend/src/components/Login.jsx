import React, { useState } from 'react';
import { useLoginMutation } from '../Api/userApi.js';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await loginUser({ email, password }).unwrap();
      if (userData && userData.success) {
        document.cookie = `token=${userData.token}; path=/`;
        navigate('/main');
      }
    } catch (err) {
      console.error('Login Error:', err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div 
        className="flex w-full max-w-full min-h-screen overflow-hidden bg-white rounded-lg shadow-lg  lg:flex-row flex-col lg:bg-none "
       
      >
        
        {/* Left Image Section */}
        <div 
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80')` }}
        ></div>
        
        {/* Right Form Section */}
        <div className="w-full p-8 lg:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-sm bg-slate-600 bg-opacity-60 rounded-lg p-6 shadow-md">
            <div className="flex justify-center mx-auto ">
              <img className="w-auto h-8" src="https://merakiui.com/images/logo.svg" alt="" />
            </div>
            <p className="mt-4 text-xl font-semibold text-center text-gray-600 dark:text-gray-200">Welcome back!</p>

            {/* Sign in with Google */}
        

            {/* Email and Password Form */}
            <div className="mt-6">
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
                <input 
                  className="block w-full px-4 py-2 text-gray-700  border rounded-lg bg-gray-600 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none" 
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                />
              </div>
              <div className="mt-4">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                <input 
                  className="block w-full px-4 py-2 text-gray-700  border rounded-lg bg-gray-600 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none" 
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button 
                onClick={handleSubmit}
                className="w-full px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              >
                Sign In
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-between mt-6">
              <span className="w-1/5 border-b dark:border-gray-600"></span>
              <p className="text-xs text-white uppercase">or sign up</p>
              <span className="w-1/5 border-b dark:border-gray-600"></span>
            </div>
            
            <div className="w-full mx-auto text-center">
              <button>signup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
