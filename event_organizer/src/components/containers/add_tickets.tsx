import React, { useState, useMemo } from 'react';
import { Search, Plus, MoreHorizontal, Ticket, Trash2, Edit, Package } from 'lucide-react';
import CreateProduct from './CreateProduct';
// Ticket type
type TicketType = {
  id: string | number;
  title: string;
  description?: string;
  status: string;
  price: string | number;
  quantitySold: number;
  quantityAvailable?: number;
  category?: string;
};
interface AddTicketsProps {
  tickets: TicketType[];
  onDeleteTicket?: (ticketId: string | number) => void;
  onEditTicket?: (ticketId: string | number) => void;
  onCreateClick: () => void;
}


const Add_tickets: React.FC<AddTicketsProps> = ({
  tickets,
  onDeleteTicket,
  onEditTicket,
  onCreateClick
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<string | number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState<string | number | null>(null);

  // Filter tickets based on search term
  const filteredTickets = useMemo(() => {
    if (!searchTerm.trim()) return tickets;

    return tickets.filter(ticket =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ticket.description && ticket.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      ticket.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tickets, searchTerm]);

  const handleDeleteClick = (ticketId: string | number) => {
    setSelectedTicket(ticketId);
    setShowDeleteConfirm(true);
    setShowMoreOptions(null);
  };

  const handleEditClick = (ticketId: string | number) => {
    if (onEditTicket) {
      onEditTicket(ticketId);
    }
    setShowMoreOptions(null);
  };

  const confirmDelete = () => {
    if (selectedTicket && onDeleteTicket) {
      onDeleteTicket(selectedTicket);
    }
    setShowDeleteConfirm(false);
    setSelectedTicket(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSelectedTicket(null);
  };

  const toggleMoreOptions = (ticketId: string | number) => {
    setShowMoreOptions(showMoreOptions === ticketId ? null : ticketId);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowMoreOptions(null);
    };

    if (showMoreOptions) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showMoreOptions]);

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-100 mb-6">
            Tickets & Products
          </h1>

          {/* Search and Create Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search Products"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-100 placeholder-slate-400"
              />
            </div>

            <button
              onClick={onCreateClick}
              className="ml-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              Create
            </button>
          </div>

          {/* Search Results Info */}
          {searchTerm && (
            <div className="mb-4 text-sm text-slate-400">
              {filteredTickets.length === 0
                ? `No tickets found for "${searchTerm}"`
                : `Found ${filteredTickets.length} ticket${filteredTickets.length === 1 ? '' : 's'} for "${searchTerm}"`
              }
            </div>
          )}
        </div>

        {/* Tickets Section */}
        <div className="bg-slate-800 rounded-lg shadow-xl border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-lg font-medium text-slate-100">Tickets</h2>
          </div>


          {/* Table Header */}
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-slate-750 text-sm font-medium text-slate-300 uppercase tracking-wide">
            <div className="col-span-4">Title</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Price</div>
            <div className="col-span-3">Quantity Sold</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-700">
            {filteredTickets.length === 0 ? (
              < div className="px-6 py-8 text-center">
                <div className="text-slate-500 mb-2">
                  <Ticket className="w-12 h-12 mx-auto" />
                </div>

                {searchTerm ? (
                  <>
                    <p className="text-slate-400 text-sm">No tickets match your search</p>
                    <p className="text-slate-500 text-xs">Try adjusting your search terms</p>

                  </>
                ) : (
                  <>
                    <p className="text-slate-400 text-sm">No tickets created yet</p>
                    <p className="text-slate-500 text-xs">Click "Create" to add your first ticket</p>

                  </>
                )}
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <div key={ticket.id} className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-slate-750 transition-colors">
                  <div className="col-span-4">
                    <span className="text-sm text-slate-100">{ticket.title}</span>
                    {ticket.description && (
                      <p className="text-xs text-slate-400 mt-1">{ticket.description}</p>
                    )}
                    {ticket.category && (
                      <p className="text-xs text-teal-400 mt-1">{ticket.category}</p>
                    )}
                  </div>
                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ticket.status === 'ON SALE'
                        ? 'bg-emerald-800 text-emerald-200'
                        : ticket.status === 'Active'
                          ? 'bg-teal-800 text-teal-200'
                          : 'bg-slate-700 text-slate-300'

                      }`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm font-medium text-emerald-400">{ticket.price}</span>
                  </div>
                  <div className="col-span-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-300">{ticket.quantitySold}</span>
                      {ticket.quantityAvailable !== undefined && (
                        <span className="text-xs text-slate-500">of {ticket.quantityAvailable}</span>
                      )}

                    </div>
                  </div>
                  <div className="col-span-1 flex justify-end gap-1 relative">
                    <button
                      onClick={() => handleEditClick(ticket.id)}
                      className="p-1 hover:bg-slate-700 rounded transition-colors"
                      title="Edit ticket"
                    >
                      <Edit className="w-4 h-4 text-slate-400 hover:text-teal-400" />

                    </button>
                    <button
                      onClick={() => handleDeleteClick(ticket.id)}
                      className="p-1 hover:bg-red-900 rounded transition-colors"
                      title="Delete ticket"
                    >
                      <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMoreOptions(ticket.id);
                      }}
                      className="p-1 hover:bg-slate-700 rounded transition-colors"
                      title="More options"
                    >
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>

                    {/* More Options Dropdown */}
                    {showMoreOptions === ticket.id && (
                      <div className="absolute right-0 top-8 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-10 min-w-[120px]">
                        <div className="py-1">

                          <button
                            onClick={() => handleEditClick(ticket.id)}

                            className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-slate-700 flex items-center gap-2"                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(ticket.id)}
                            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-900 flex items-center gap-2"
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4 border border-slate-700">
              <h3 className="text-lg font-medium text-slate-100 mb-4">Delete Ticket</h3>
              <p className="text-slate-300 mb-6">
                Are you sure you want to delete this ticket? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-slate-300 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// Renamed to avoid conflict with AddTicketsProps for Add_tickets
interface AddTicketsContainerProps {
  onNavigate: (page: string) => void;
}
// Main App Component
const AddTicketsContainer: React.FC<AddTicketsContainerProps> = ({ onNavigate }) => {
  const [currentView, setCurrentView] = useState<'tickets' | 'create'>('tickets');
  const [tickets, setTickets] = useState<TicketType[]>([
    {
      id: 1,
      title: "General Admission",
      description: "Standard entry ticket",
      status: "Active",
      price: "$25.00",
      quantitySold: 150,
      quantityAvailable: 500,
      category: "Tickets"
    },
    {
      id: 2,
      title: "VIP Pass",
      description: "Premium access with perks",
      status: "Active",
      price: "$75.00",
      quantitySold: 45,
      quantityAvailable: 100,
      category: "Tickets"
    },
    {
      id: 3,
      title: "Student Discount",
      description: "Discounted tickets for students",
      status: "Active",
      price: "$15.00",
      quantitySold: 89,
      quantityAvailable: 200,
      category: "Tickets"
    }
  ]);

  const handleCreateClick = () => {
    setCurrentView('create');
  };

  const handleBackToTickets = () => {
    setCurrentView('tickets');
  };

  const handleProductCreated = (product: TicketType) => {
    setTickets(prevTickets => [...prevTickets, product]);
  };

  const handleDeleteTicket = (ticketId: string | number) => {
    setTickets(prevTickets =>
      prevTickets.filter(ticket => ticket.id !== ticketId)
    );
  };

  const handleEditTicket = (ticketId: string | number) => {
    console.log(`Edit ticket with ID: ${ticketId}`);
    // You can implement edit functionality here
  };

  if (currentView === 'create') {
    return (
      <CreateProduct
        onBack={handleBackToTickets}
        onProductCreated={handleProductCreated}
      />
    );
  }

  return (
    <Add_tickets
      tickets={tickets}
      onCreateClick={handleCreateClick}
      onDeleteTicket={handleDeleteTicket}
      onEditTicket={handleEditTicket}
    />
  );
};

export default AddTicketsContainer;