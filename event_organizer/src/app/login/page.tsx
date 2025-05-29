'use client';

import React from 'react';
import { useState } from 'react';


const login=() => {

    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };


  return (

    <div className="flex items-center justify-center min-h-screen p-4 lg:p-10 bg-[#F2FAFF]">
      
      {/* Main Container Card */}
      <div className="flex flex-row w-full max-w-7xl bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[800px]">
        
        {/* Left Side Banner */}
        <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-[#0098F5] text-white relative overflow-hidden">
          
           <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-30 h-30 bg-white opacity-10 rounded-lg rotate-45"></div>

           <div className="absolute top-3/4 right-1/4 w-26 h-26 bg-white opacity-5 rounded-full "></div>
            <div className="absolute top-1/4 left-3/4 w-25 h-25 bg-white opacity-10 rounded-full "></div>
            <div className="absolute top-2/3 right-1/3 w-10 h-10 bg-white opacity-5 rounded-full "></div>
           </div>
          {/*
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-16 h-16 bg-white bg-opacity-5 rounded-full animate-bounce delay-1000"></div>
            <div className="absolute top-1/2 left-3/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-ping delay-500"></div>
            <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-white bg-opacity-5 rounded-full animate-pulse delay-700"></div>
          </div>

          */}
          <div className="text-center space-y-6 max-w-sm relative z-10 p-12">
            <h1 className="text-5xl text-left font-black mb-10 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-2xl">
              Welcome 
            </h1>
            <p className="text-lg font-light leading-relaxed opacity-90">
              Sign In To Your Account
            </p>
           
          </div>
        </div>

        {/* Login Card */}
        <div className="flex flex-col justify-center flex-1 p-8 lg:p-12 bg-gray-50">
          <div className="max-w-md mx-auto w-full space-y-6">
            
            <div className="text-left mb-8">
              <h2 className="text-4xl font-bold text-gray-600 mb-2">Hello! Good Morning</h2>
              <p className="text-gray-300 font-medium">Login Your Account</p>
            </div>

            <div className="space-y-6">
              {/* Email Input */}
              <div className="relative group">
                <label className="block text-[#374151] font-semibold mb-2 text-sm">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-3 px-4 text-gray-800 bg-white rounded-lg transition-all duration-300"
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <label className="block text-[#374151] font-semibold mb-2 text-sm">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 py-3 px-4 text-gray-800 bg-white rounded-lg transition-all duration-300"
                />
              </div>

              {/* Options Row */}
              <div className="flex flex-row items-center justify-between text-sm">
                <label className="flex items-center text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                  />
                  Remember me
                </label>
                <a href="#" className="text-blue-500 hover:text-blue-700 hover:underline transition-colors duration-200">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Login'
                )}
              </button>

              {/* Create Account Link */}
              <div className="text-center">
                <a href="#" className="text-blue-500 hover:text-blue-700 text-sm hover:underline transition-colors duration-200">
                  Create Account
                </a>
              </div>

              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default login;