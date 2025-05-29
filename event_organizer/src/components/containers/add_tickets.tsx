'use client';
import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal } from 'lucide-react';

export default function TicketsProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tickets, setTickets] = useState([
    {
      id: 1,
      title: 'event hello',
      status: 'ON SALE',
      price: '$1.00',
      quantitySold: 0
    }
  ]);

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTicket = () => {
    const newTicket = {
      id: tickets.length + 1,
      title: `New Event ${tickets.length + 1}`,
      status: 'ON SALE',
      price: '$0.00',
      quantitySold: 0
    };
    setTickets([...tickets, newTicket]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Tickets & Products
          </h1>
          
          {/* Search and Create Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={handleCreateTicket}
              className="ml-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              Create
            </button>
          </div>
        </div>

        {/* Tickets Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Tickets</h2>
          </div>
          
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-sm font-medium text-gray-700 uppercase tracking-wide">
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-3">Quantity Sold</div>
            <div className="col-span-1"></div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredTickets.length > 0 ? (
              filteredTickets.map((ticket) => (
                <div key={ticket.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="col-span-4">
                    <span className="text-sm text-gray-900">{ticket.title}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {ticket.status}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-green-600">{ticket.price}</span>
                  </div>
                  <div className="col-span-3">
                    <span className="text-sm text-gray-600">{ticket.quantitySold}</span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <p className="text-gray-500">No tickets found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Empty state when no tickets */}
        {tickets.length === 0 && (
          <div className="text-center py-12">
            <div className="mb-4">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets yet</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first event ticket.</p>
            <button
              onClick={handleCreateTicket}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Create Your First Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
}