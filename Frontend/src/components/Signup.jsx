import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../Service/Auth/authApiHelpers"; // Using RTK Query
 // Password strength meter library
 import register from "../assets/register.png"

 const Signup = () => {
  // State for form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Local error state

  const navigate = useNavigate();

  // RTK Query hook for user registration
  const [registerUser, { isLoading }] = useRegisterMutation();

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Password validation (min 6 characters)
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!fullName) {
      setError("Full name is required");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!username) {
      setError("Username is required");
      return;
    }
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      // Trigger register mutation via RTK Query
      const userData = await registerUser({ fullName, email, username, password }).unwrap();
      console.log("User Registered:", userData);

      // Navigate to login page after successful registration
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err?.message || "Signup failed, please try again later.");
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

      {/* Right Column - Signup Form */}
      <div className="w-full max-w-md p-8 m-auto bg-gray-900 rounded-lg shadow-lg">
        <div className="flex justify-center mx-auto">
          <Link to={"/"}>
            <img
              className="w-auto h-8"
              src="https://merakiui.com/images/logo.svg"
              alt="Logo"
            />
          </Link>
        </div>
        <p className="mt-4 text-xl font-semibold text-center text-gray-600 dark:text-gray-200">
          Create an account!
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Full Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 text-gray-700 border rounded-lg bg-gray-600 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Email Address
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 text-gray-700 border rounded-lg bg-gray-600 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Username
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 text-gray-700 border rounded-lg bg-gray-600 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                className="block w-full px-4 py-2 text-gray-700 border rounded-lg bg-gray-600 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className={`w-full px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>

        <div className="w-full mx-auto text-center my-3 flex items-center justify-center gap-2">
          <h3 className="text-slate-200 font-thin text-sm">
            Already have an account?
          </h3>
          <Link to={"/login"}>
            <button className="text-sky-300 bg-opacity-40 ">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;