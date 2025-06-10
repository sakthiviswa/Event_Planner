'use client';
import React, { useState } from 'react';
import { ArrowLeft, User, Mail, CreditCard, Lock } from 'lucide-react';

export default function EventCheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCompleteOrder = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    alert('Order completed successfully!');
  };

  const handleBackToEvent = () => {
    alert('Returning to event homepage...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-8xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToEvent}
              className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-200 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span className="text-sm font-medium">Event Homepage</span>
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Checkout
            </h1>
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8">
              <div className="flex items-center gap-3 mb-8">
                <User className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-bold text-white">Your Details</h2>
              </div>

              <div className="space-y-6">
                {/* Name Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-300 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter your first name"
                        className="w-full px-4 py-4 bg-gray-800/70 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 hover:border-gray-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-300 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter your last name"
                        className="w-full px-4 py-4 bg-gray-800/70 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 hover:border-gray-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 bg-gray-800/70 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 hover:border-gray-500"
                    />
                  </div>
                </div>

                {/* Security Note */}
                <div className="flex items-center gap-3 p-4 bg-green-900/20 border border-green-700/30 rounded-xl">
                  <Lock className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-sm text-green-300">
                    Your information is encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Order Summary</h3>
              </div>

              <div className="space-y-6">
                {/* Order Item */}
                <div className="flex justify-between items-start p-4 bg-gray-800/50 rounded-xl">
                  <div className="flex-1">
                    <div className="text-white font-medium mb-1">Sakthi Event</div>
                    <div className="text-sm text-gray-400">Quantity: 1</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-cyan-400">FREE</div>
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-white font-medium">$0.00</span>
                </div>

                {/* Fees */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Processing Fee</span>
                  <span className="text-green-400 font-medium">Waived</span>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>

                {/* Total */}
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl border border-cyan-700/30">
                  <span className="text-xl font-bold text-white">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    FREE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Order Button */}
        <div className="mt-12">
          <div className="max-w-lg mx-auto">
            <button
              onClick={handleCompleteOrder}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-4 px-8 rounded-xl font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-200 hover:shadow-cyan-500/25"
            >
              Complete Order
            </button>
            <p className="text-center text-gray-400 text-sm mt-4">
              By completing your order, you agree to our terms and conditions
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-800/50 rounded-full border border-gray-700/50">
            <Lock className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">SSL Secured Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
}