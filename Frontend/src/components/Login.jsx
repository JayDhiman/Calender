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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          className="object-cover w-full h-full rounded-lg"
          alt="Register"
        />
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full max-w-md p-8 m-auto bg-gray-900 rounded-lg shadow-lg">
        <div className="flex justify-center mx-auto ">
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

        {/* Email and Password Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Email Address
            </label>
            <input
              className="block w-full px-4 py-2 text-gray-700 border rounded-lg bg-gray-600 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
          </div>
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
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Divider */}
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

export default Login;
