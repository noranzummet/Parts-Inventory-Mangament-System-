import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// --- Axios Global Configuration ---
// This ensures Axios sends the token in the header for all future requests
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 1. Define the shape of the credentials
interface LoginCredentials {
  username: string;
  password:  string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  // State for inputs
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: ''
  });

  // State for inline error messages
  const [message, setMessage] = useState<string>("");

  // --- Fixed: Added the missing handleChange function ---
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error message when user types
    if (message) setMessage("");
  };

  // Form Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      // 1. Send request to Laravel
      const response = await axios.post('/login', {
        username: credentials.username,
        password: credentials.password,
      });

      // 2. Check for 'access_token' (matching your AuthController)
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("username", credentials.username);

        toast.success("Login Successful!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      // 3. Handle Errors (Validation or Invalid Credentials)
      const errorMsg = error.response?.data?.message || "Invalid username or password";
      setMessage(errorMsg);
      toast.error(errorMsg);
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-white overflow-hidden">
      <div className="relative w-80 h-125 bg-white rounded-lg shadow-xl flex flex-col justify-center items-center p-8 overflow-hidden">
        
        {/* Animated gradient borders */}
        <div className="absolute -top-1/2 -left-1/2 w-95 h-105 bg-linear-to-br from-yellow-300 to-amber-500 animate-spin-slow"></div>
        <div className="absolute -top-1/2 -left-1/2 w-95 h-105 bg-linear-to-br from-yellow-300 to-amber-500 animate-spin-slow -delay-1500"></div>

        {/* Form box */}
        <form onSubmit={handleSubmit} className="relative z-10 w-full bg-gray-50 rounded-lg flex flex-col justify-center p-12 shadow-sm">
          <h2 className="text-3xl font-bold text-amber-700 text-center mb-10 tracking-wider drop-shadow-sm">
            Login
          </h2>

          {/* Username */}
          <div className="relative w-full mb-8">
            <input
              type="text"
              name="username"
              placeholder=" "
              value={credentials.username}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b-2 border-amber-500 text-gray-800 py-2 px-1 focus:outline-none focus:border-yellow-300 peer"
            />
            <span className="absolute left-0 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:translate-y-2 peer-focus:-translate-y-6 peer-focus:text-yellow-300">
              Username
            </span>
          </div>

          {/* Password */}
          <div className="relative w-full mb-8">
            <input
              type="password"
              name="password"
              placeholder=" "
              value={credentials.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b-2 border-amber-500 text-gray-800 py-2 px-1 focus:outline-none focus:border-yellow-300 peer"
            />
            <span className="absolute left-0 top-0 text-gray-500 text-sm transition-all peer-placeholder-shown:translate-y-2 peer-focus:-translate-y-6 peer-focus:text-amber-600">
              Password
            </span>
          </div>

          {/* Message */}
          {message && (
            <p className="mt-4 mb-4 text-center text-red-500 text-sm font-medium">{message}</p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-black font-bold rounded shadow-[0_0_20px_rgba(234, 179, 8, 0.6)] hover:bg-amber-300 hover:shadow-[0_0_30px_rgba(250,204,21,0.8)] transition-all duration-300 hover:-translate-y-1"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;