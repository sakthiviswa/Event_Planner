'use client';
import React, { useState } from 'react';
import { Share2, Calendar, ChevronDown, Minus, Plus } from 'lucide-react';

export default function EventTicketBookingPage() {
  const [selectedTicket, setSelectedTicket] = useState('Sakthi');
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  const tickets = [
    { name: 'Sakthi', price: 'Free', available: true },
    { name: 'Premium', price: '$25.00', available: true },
    { name: 'VIP', price: '$50.00', available: false }
  ];

  const incrementQuantity = () => {
    setTicketQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setTicketQuantity(prev => Math.max(0, prev - 1));
  };

  const handleContinue = () => {
    if (ticketQuantity > 0) {
      alert(`Proceeding with ${ticketQuantity} ${selectedTicket} ticket(s)`);
    } else {
      alert('Please select at least one ticket');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-4 flex items-center justify-center">
      <div className="max-w-3xl ">
        {/* Main Card */}
        <div className="bg-white rounded-2xl p-5 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-blue-500 font-medium">user name</span>
              <button className="flex items-center gap-1 text-blue-500 text-sm font-medium">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
            
            <h1 className="text-xl font-semibold text-gray-900 mb-4">
              user name's event name
            </h1>
            
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <Calendar className="w-4 h-4" />
              <span>Sat, May 24, 2025 7:01 PM - Sun, May 25, 2025 7:02 PM GMT+5:30</span>
            </div>
          </div>

          {/* Tickets Section */}
          <div className="px-6 pb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Tickets</h2>
            
            {/* Ticket Selection */}
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-900">{selectedTicket}</span>
                  <button className="p-1">
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Free</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={decrementQuantity}
                    disabled={ticketQuantity === 0}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-6 text-center font-medium">{ticketQuantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-3 text-xs text-gray-500">nil</div>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              Continue
            </button>

            {/* Promo Code Link */}
            <div className="mt-4">
              <button
                onClick={() => setShowPromoCode(!showPromoCode)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Have a promo code?
              </button>
              
              {showPromoCode && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="mt-2 text-sm text-blue-500 hover:text-blue-600">
                    Apply Code
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-center text-xs text-gray-500">
              Event Ticketing by <span className="font-medium">House Party</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}