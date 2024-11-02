import React, { useState } from "react";
import { useRegisterMutation } from "../Api/userApi"; // Adjust the import path as needed
import { useNavigate, Link } from "react-router-dom";
import register from "../assets/register.png"; // Your image

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log the name, email, and password
    console.log("Signup Data:", { name, email, password });

    // Call the register mutation
    try {
      const userData = await registerUser({ name, email, password }).unwrap();
      console.log("User Registered:", userData);
      navigate("/login");
    } catch (err) {
      console.error("Signup Error:", error || err);
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
          </Link>{" "}
        </div>
        <p className="mt-4 text-xl font-semibold text-center text-gray-600 dark:text-gray-200">
          Create an account!
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 text-gray-700 border rounded-lg bg-gray-600 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 text-gray-700 border rounded-lg bg-gray-600 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:ring focus:ring-blue-300 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
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

          {error && <p className="text-red-500 mt-2">{error.message}</p>}
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
