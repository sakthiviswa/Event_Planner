'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const EventTicketingLanding = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate login delay (replace this with actual API call if needed)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // ✅ Navigate to home page
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 lg:p-10 bg-[#0C1B1F]">
      
      {/* Main Container Card */}
      <div className="flex flex-row w-full max-w-7xl bg-[#1A2B30] rounded-2xl shadow-2xl overflow-hidden min-h-[800px] border border-[#2D4147]">
        
        {/* Left Side Banner */}
        <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-gradient-to-br from-[#0F4C5C] to-[#164E63] text-white relative overflow-hidden">
          
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-30 h-30 bg-[#22D3EE] opacity-10 rounded-lg rotate-45"></div>
            <div className="absolute top-3/4 right-1/4 w-26 h-26 bg-[#06B6D4] opacity-5 rounded-full"></div>
            <div className="absolute top-1/4 left-3/4 w-25 h-25 bg-[#67E8F9] opacity-10 rounded-full"></div>
            <div className="absolute top-2/3 right-1/3 w-10 h-10 bg-[#22D3EE] opacity-5 rounded-full"></div>
          </div>

          <div className="text-center space-y-6 max-w-sm relative z-10 p-12">
            <h1 className="text-5xl text-left font-black mb-10 bg-gradient-to-r from-[#A5F3FC] to-[#22D3EE] bg-clip-text text-transparent drop-shadow-2xl">
              Welcome 
            </h1>
            <p className="text-lg font-light leading-relaxed text-[#A5F3FC] opacity-90">
              Sign In To Your Account
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="flex flex-col justify-center flex-1 p-8 lg:p-12 bg-[#1F2937]">
          <div className="max-w-md mx-auto w-full space-y-6">
            
            <div className="text-left mb-8">
              <h2 className="text-4xl font-bold text-[#F1F5F9] mb-2">Hello! Good Morning</h2>
              <p className="text-[#94A3B8] font-medium">Login Your Account</p>
            </div>

            <div className="space-y-6">
              {/* Email Input */}
              <div className="relative group">
                <label className="block text-[#E2E8F0] font-semibold mb-2 text-sm">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#374151] focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE] py-3 px-4 text-[#F1F5F9] bg-[#374151] rounded-lg transition-all duration-300 placeholder-[#9CA3AF]"
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <label className="block text-[#E2E8F0] font-semibold mb-2 text-sm">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[#374151] focus:outline-none focus:border-[#22D3EE] focus:ring-1 focus:ring-[#22D3EE] py-3 px-4 text-[#F1F5F9] bg-[#374151] rounded-lg transition-all duration-300 placeholder-[#9CA3AF]"
                />
              </div>

              {/* Options Row */}
              <div className="flex flex-row items-center justify-between text-sm">
                <label className="flex items-center text-[#CBD5E1] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 w-4 h-4 text-[#22D3EE] border-[#4B5563] bg-[#374151] rounded focus:ring-[#22D3EE] focus:ring-2"
                  />
                  Remember me
                </label>
                <a href="#" className="text-[#22D3EE] hover:text-[#06B6D4] hover:underline transition-colors duration-200">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#0891B2] to-[#22D3EE] text-white font-semibold py-3 px-6 rounded-lg hover:from-[#0E7490] hover:to-[#06B6D4] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70"
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
                <a href="#" className="text-[#22D3EE] hover:text-[#06B6D4] text-sm hover:underline transition-colors duration-200">
                  Create Account
                </a>
              </div>

              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="w-full bg-[#374151] border border-[#4B5563] text-[#F1F5F9] font-medium py-3 px-6 rounded-lg hover:bg-[#4B5563] hover:border-[#6B7280] transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
              >
                <Image
                  src="/login/google.svg"
                  alt="External Image"
                  width={30}
                  height={20}
                />

                
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventTicketingLanding;