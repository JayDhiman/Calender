import React, { useState } from 'react';
import { useRegisterMutation } from '../Api/userApi'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Log the name, email, and password
    console.log('Signup Data:', { name, email, password });

    // Call the register mutation
    try {
      const userData = await registerUser({ name, email, password }).unwrap();
      console.log('User Registered:', userData);
        navigate('/login')
    } catch (err) {
      console.error('Signup Error:', error || err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-96 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 text-white bg-blue-600 rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Sign Up'}
        </button>
        {error && <p className="text-red-500 mt-2">{error.message}</p>}
      </form>
    </div>
  );
};

export default Signup;
