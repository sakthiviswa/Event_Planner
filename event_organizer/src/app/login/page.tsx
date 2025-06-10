'use client';
import React from 'react';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 lg:p-10 bg-[#0F0F0F]">

      {/* Main Container Card */}
      <div className="flex flex-row w-full max-w-7xl bg-[#1A1A1A] rounded-2xl shadow-2xl border border-[#2A2A2A] overflow-hidden min-h-[800px]">

        {/* Left Side Banner */}
        <div className="hidden lg:flex flex-col items-center justify-center flex-1 bg-gradient-to-br from-[#0EA5E9] via-[#0891B2] to-[#164E63] text-white relative overflow-hidden">

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white opacity-5 rounded-2xl rotate-45 animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-white opacity-10 rounded-full animate-bounce delay-1000"></div>
            <div className="absolute top-1/4 left-3/4 w-20 h-20 bg-white opacity-5 rounded-full animate-ping delay-500"></div>
            <div className="absolute top-2/3 right-1/3 w-12 h-12 bg-white opacity-15 rounded-full animate-pulse delay-700"></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white opacity-5 rounded-lg rotate-12 animate-bounce delay-300"></div>
          </div>

          <div className="text-center space-y-6 max-w-sm relative z-10 p-12">
            <h1 className="text-6xl text-left font-black mb-10 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent drop-shadow-2xl">
              Welcome Back
            </h1>
            <p className="text-xl font-light leading-relaxed opacity-90 text-cyan-50">
              Sign in to access your dashboard and manage your account seamlessly
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="flex flex-col justify-center flex-1 p-8 lg:p-12 bg-[#111111]">
          <div className="max-w-md mx-auto w-full space-y-8">

            <div className="text-left mb-8">
              <h2 className="text-4xl font-bold text-white mb-3">Hello! Good Evening</h2>
              <p className="text-[#888888] font-medium text-lg">Access your account</p>
            </div>

            <div className="space-y-6">
              {/* Email Input */}
              <div className="relative group">
                <label className="block text-[#CCCCCC] font-semibold mb-3 text-sm">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-[#333333] focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 py-4 px-4 text-white bg-[#1A1A1A] rounded-xl transition-all duration-300 hover:border-[#444444] placeholder-[#666666]"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Input */}
              <div className="relative group">
                <label className="block text-[#CCCCCC] font-semibold mb-3 text-sm">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-[#333333] focus:outline-none focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 py-4 px-4 text-white bg-[#1A1A1A] rounded-xl transition-all duration-300 hover:border-[#444444] placeholder-[#666666]"
                  placeholder="Enter your password"
                />
              </div>

              {/* Options Row */}
              <div className="flex flex-row items-center justify-between text-sm pt-2">
                <label className="flex items-center text-[#AAAAAA] cursor-pointer hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-3 w-4 h-4 text-[#0EA5E9] bg-[#1A1A1A] border-[#333333] rounded focus:ring-[#0EA5E9] focus:ring-2"
                  />
                  Remember me
                </label>
                <a href="#" className="text-[#0EA5E9] hover:text-[#0891B2] hover:underline transition-colors duration-200 font-medium">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#0EA5E9] via-[#0891B2] to-[#0E7490] text-white font-semibold py-4 px-6 rounded-xl hover:from-[#0891B2] hover:via-[#0E7490] hover:to-[#164E63] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#0EA5E9]/25 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing you in...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#333333]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#111111] text-[#888888] font-medium">or continue with</span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full bg-[#1A1A1A] border border-[#333333] text-white font-medium py-4 px-6 rounded-xl hover:bg-[#222222] hover:border-[#444444] transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center space-x-3 group"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="group-hover:text-white transition-colors">Continue with Google</span>
            </button>

            {/* Create Account Link */}
            <div className="text-center pt-6">
              <p className="text-[#888888]">
                Don't have an account?{' '}
                <a href="#" className="text-[#0EA5E9] hover:text-[#0891B2] font-semibold hover:underline transition-colors duration-200">
                  Create Account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;