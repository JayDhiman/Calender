<<<<<<< HEAD
import React, { useState } from "react";
import { useLoginMutation } from "../Api/userApi.js";
import { Link, useNavigate } from "react-router-dom";
import register from "../assets/register.png"; // Your image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginUser, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

console.log(loginUser, '---login----')

  const validateForm = () => {
    let isValid = true;

    // Email validation (basic check)
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Password validation (check if password is provided)
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
=======
import React, { useState, useRef,useEffect } from "react";
import { useLoginMutation } from "../Service/Auth/authApiHelpers.js"
import { useDispatch } from "react-redux"; // For dispatching actions
import {setCredentials} from "../Service/Auth/authService"
import { Link, useNavigate } from "react-router-dom";
import register from "../assets/register.png"; 




const Login = () => {
  
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For custom error message display
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Using the RTK Query hook for login
  const [login, { isLoading, isError, error: apiError }] = useLoginMutation();

  useEffect(() => {
    if (isError || errorMessage) {
      errRef.current.focus(); // Focus on error container when error occurs
    }
  }, [isError, errorMessage]);



  const validateForm = () => {
    return email && password; // Only validate email and password
>>>>>>> frontend
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    if (!validateForm()) return;

    try {
      const userData = await loginUser({ email, password }).unwrap();
      if (userData && userData.success) {
        document.cookie = `token=${userData.token}; path=/`;
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Column - Image */}
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-gradient-to-r from-indigo-800 via-purple-900 to-gray-900">
        <img
          src={register} // Your image
=======
  
    // Step 1: Validate the form
    if (!validateForm()) {
      setErrorMessage("Please enter  email and password.");
      return;
    }
  
    try {
    
  
      // Step 2: Call the login API via RTK Query
      const response = await login({ email, password }).unwrap();
  

  
      // Step 3: Check if the response contains success, user, and accessToken
      if (response.success && response.data && response.data.user ) {
        const { user } = response.data; // Destructure the response
  
        // Step 4: Dispatch setCredentials action to store user and accessToken in Redux
   
        dispatch(setCredentials({ user }));
        setEmail("");
        setPassword("");
  
       
       
        // Step 6: Navigate to the dashboard page
  
        navigate("/dashboard");
      } else {
        // Step 7: Handle unexpected response structure
        setErrorMessage('Invalid login response from the server.');
      }
    } catch (err) {
      // Step 8: Handle errors that occur during the login attempt
      console.error("Login failed:", err);
      setErrorMessage(err.message || "An error occurred while logging in.");
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-gradient-to-r from-indigo-800 via-purple-900 to-gray-900">
        <img
          src={register}
>>>>>>> frontend
          className="object-cover w-full h-full rounded-lg"
          alt="Register"
        />
      </div>

<<<<<<< HEAD
      {/* Right Column - Login Form */}
      <div className="w-full max-w-md p-8 m-auto bg-gray-900 rounded-lg shadow-lg">
        <div className="flex justify-center mx-auto ">
=======
      <div className="w-full max-w-md p-8 m-auto bg-gray-900 rounded-lg shadow-lg">
        <div className="flex justify-center mx-auto">
>>>>>>> frontend
          <Link to={"/"}>
            <img
              className="w-auto h-8"
              src="https://merakiui.com/images/logo.svg"
              alt="Logo"
            />
          </Link>
        </div>
        <p className="mt-4 text-xl font-semibold text-center text-gray-600 dark:text-gray-200">
          Welcome back!
        </p>

<<<<<<< HEAD
        {/* Email and Password Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Email Address
=======
        {/* Display error message if login fails */}
        {(isError || errorMessage) && (
          <div
            ref={errRef} // Focus on this element when error occurs
            className="bg-red-500 text-white p-2 rounded-lg mb-4"
            role="alert"
          >
            <p>{apiError?.data?.message || errorMessage || "An error occurred"}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6">
        
          <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Email
>>>>>>> frontend
            </label>
            <input
              className="block w-full px-4 py-2 text-gray-700 border rounded-lg bg-gray-600 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
<<<<<<< HEAD
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>
=======
          </div>

>>>>>>> frontend
          <div className="mt-4">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Password
            </label>
            <input
              className="block w-full px-4 py-2 text-gray-700 border rounded-lg bg-gray-600 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
<<<<<<< HEAD
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>

          {/* Submit Button */}
=======
          </div>

>>>>>>> frontend
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>

<<<<<<< HEAD
          {/* Divider */}
=======
>>>>>>> frontend
          <div className="flex items-center justify-between mt-6">
            <span className="w-1/5 border-b dark:border-gray-600"></span>
            <p className="text-xs text-gray-600 uppercase">or sign up</p>
            <span className="w-1/5 border-b dark:border-gray-600"></span>
          </div>

          <div className="w-full mx-auto text-center my-3 flex items-center justify-center gap-2">
            <h3 className="text-slate-200 font-thin text-sm">
              Don't have an account yet?
            </h3>
            <Link to={"/signup"}>
              <button className="text-sky-300 bg-opacity-40 ">Sign up</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Login;
=======
export default Login;
>>>>>>> frontend
