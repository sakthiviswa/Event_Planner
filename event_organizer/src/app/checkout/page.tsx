'use client';
import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-8xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleBackToEvent}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Event Homepage</span>
            </button>
            <h1 className="text-lg font-medium text-gray-900">Checkout</h1>
            <div className="w-24"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Your Details</h2>
              
              <div className="space-y-4">
                {/* Name Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <div className="space-y-4">
                {/* Order Item */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm text-gray-600">1 x Sakthi</span>
                  </div>
                  <span className="text-sm font-medium">$0.00</span>
                </div>

                <hr className="border-gray-200" />

                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-medium">Free</span>
                </div>

                <hr className="border-gray-200" />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-medium text-gray-900">Free</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Order Button */}
        <div className="mt-8">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleCompleteOrder}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}