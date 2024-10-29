import React, { useState } from 'react';
// import { LOGO } from '../util/config';
// import { UserService } from '../services/userService'; // Import UserService
import { useNavigate } from 'react-router-dom'; // Assuming you use React Router for navigation

// const userService = new UserService(); 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const credentials = { email, password };
//       const response = await userService.loginUser(credentials);
     
//       navigate('/home');
//     } catch (error) {
//       setError(error.message); 
//     }
//   };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
        {/* Logo and Name */}
        <div className="flex flex-col items-center">
          {/* <img className="w-20 h-20" src={LOGO.logo} alt="Logo" /> */}
          <h1 className="mt-2 text-3xl font-semibold text-indigo-600">BMS</h1>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition ease-in-out duration-150"
              placeholder="••••••••"
            />
          </div>

          {/* Display error message if login fails */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Forgot password and Sign Up links */}
          <div className="flex justify-between text-sm">
            <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
            <a href="/register" className="text-indigo-600 hover:text-indigo-500">
              Sign Up
            </a>
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
