'use client';
import React, { useState } from 'react';
import { Share2, Calendar, ChevronDown, Minus, Plus, MapPin, Clock, Users, Tag, Sparkles, ArrowRight } from 'lucide-react';

export default function EventTicketBookingPage() {
  const [selectedTicket, setSelectedTicket] = useState('Sakthi');
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [showTicketDropdown, setShowTicketDropdown] = useState(false);

  const tickets = [
    {
      id: 'sakthi',
      name: 'Sakthi',
      price: 'Free',
      originalPrice: null,
      available: true,
      description: 'General admission with basic amenities',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '$25.00',
      originalPrice: '$35.00',
      available: true,
      description: 'Premium seating with refreshments included',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'vip',
      name: 'VIP',
      price: '$50.00',
      originalPrice: '$75.00',
      available: false,
      description: 'VIP experience with exclusive perks',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const selectedTicketData = tickets.find(t => t.name === selectedTicket) || tickets[0];

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

  const handleTicketSelect = (ticketName: string) => {
    setSelectedTicket(ticketName);
    setShowTicketDropdown(false);
    setTicketQuantity(0);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Main Card */}
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-800/50 shadow-2xl shadow-cyan-500/10 overflow-hidden">
          {/* Header */}
          <div className="p-8 pb-6 bg-gradient-to-r from-gray-900/50 to-gray-800/50">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-cyan-400 font-medium">technoz events</span>
              </div>
              <button className="flex items-center gap-2 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors bg-cyan-500/10 px-4 py-2 rounded-full border border-cyan-500/20">
                <Share2 className="w-4 h-4" />
                Share Event
              </button>
            </div>

            <h1 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Summer Music Festival 2025
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-white font-medium">May 24-25, 2025</div>
                  <div className="text-gray-400">7:01 PM - 7:02 PM GMT+5:30</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <div className="text-white font-medium">Marina Beach</div>
                  <div className="text-gray-400">Chennai, Tamil Nadu</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Users className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <div className="text-white font-medium">1,250 Attendees</div>
                  <div className="text-gray-400">85% capacity</div>
                </div>
              </div>
            </div>
          </div>

          {/* Tickets Section */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-bold text-white">Select Your Tickets</h2>
            </div>

            {/* Ticket Selection Dropdown */}
            <div className="relative mb-6">
              <button
                onClick={() => setShowTicketDropdown(!showTicketDropdown)}
                className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-left hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${selectedTicketData.color}`}></div>
                    <div>
                      <div className="text-white font-semibold text-lg">{selectedTicketData.name}</div>
                      <div className="text-gray-400 text-sm">{selectedTicketData.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-white font-bold text-xl">{selectedTicketData.price}</div>
                      {selectedTicketData.originalPrice && (
                        <div className="text-gray-500 text-sm line-through">{selectedTicketData.originalPrice}</div>
                      )}
                    </div>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showTicketDropdown ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showTicketDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/90 backdrop-blur-xl border border-gray-700 rounded-2xl overflow-hidden z-20">
                  {tickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => handleTicketSelect(ticket.name)}
                      disabled={!ticket.available}
                      className={`w-full p-6 text-left hover:bg-gray-700/50 transition-colors border-b border-gray-700/50 last:border-b-0 ${!ticket.available ? 'opacity-50 cursor-not-allowed' : ''
                        } ${selectedTicket === ticket.name ? 'bg-cyan-500/10 border-cyan-500/30' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${ticket.color}`}></div>
                          <div>
                            <div className="text-white font-semibold">{ticket.name}</div>
                            <div className="text-gray-400 text-sm">{ticket.description}</div>
                            {!ticket.available && (
                              <div className="text-red-400 text-xs mt-1">Sold Out</div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-bold">{ticket.price}</div>
                          {ticket.originalPrice && (
                            <div className="text-gray-500 text-sm line-through">{ticket.originalPrice}</div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity Selection */}
            <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold mb-1">Quantity</div>
                  <div className="text-gray-400 text-sm">Select number of tickets</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={decrementQuantity}
                    disabled={ticketQuantity === 0}
                    className="w-12 h-12 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center hover:bg-gray-600 hover:border-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <Minus className="w-5 h-5 text-white" />
                  </button>
                  <span className="w-8 text-center font-bold text-xl text-white">{ticketQuantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/25"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {ticketQuantity > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Subtotal:</span>
                    <span className="text-white font-bold text-lg">
                      {selectedTicketData.price === 'Free' ? 'Free' :
                        `$${(parseFloat(selectedTicketData.price.replace('$', '')) * ticketQuantity).toFixed(2)}`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Promo Code Section */}
            <div className="mb-8">
              <button
                onClick={() => setShowPromoCode(!showPromoCode)}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                <Tag className="w-4 h-4" />
                Have a promo code?
              </button>

              {showPromoCode && (
                <div className="mt-4 bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 p-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium">
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={ticketQuantity === 0}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white py-4 px-6 rounded-2xl hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-2xl shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              Continue to Checkout
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gray-900/50 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Powered by <span className="font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">technoz!</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                Secure checkout enabled
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 