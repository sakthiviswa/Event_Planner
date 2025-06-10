import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Repeat, Edit, Trash2, Eye, Plus, TrendingUp, Search, Filter } from 'lucide-react';



interface DashboardProps {
  onNavigate?: (page: string) => void;
}

const EventDashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  // Sample event data - in a real app, this would come from your state management or API
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Tech Innovation Summit 2025',
      type: 'Virtual Event',
      venue: 'Convention Center Dubai',
      repeat: 'Does not repeat',
      startDate: '2025-07-15',
      duration: '8 hours',
      startTime: '09:00',
      endTime: '17:00',
      status: 'upcoming',
      attendees: 250,
      revenue: 75000,
      cost: 25000
    },
    {
      id: 2,
      name: 'AI & Machine Learning Workshop',
      type: 'Online Event',
      venue: 'World Trade Center Abu Dhabi',
      repeat: 'Weekly',
      startDate: '2025-06-20',
      duration: '4 hours',
      startTime: '14:00',
      endTime: '18:00',
      status: 'ongoing',
      attendees: 85,
      revenue: 25500,
      cost: 8500
    },
    {
      id: 3,
      name: 'Digital Marketing Bootcamp',
      type: 'Virtual Event',
      venue: 'Jumeirah Beach Hotel',
      repeat: 'Monthly',
      startDate: '2025-08-10',
      duration: '6 hours',
      startTime: '10:00',
      endTime: '16:00',
      status: 'upcoming',
      attendees: 120,
      revenue: 36000,
      cost: 12000
    },
    {
      id: 4,
      name: 'Blockchain & Web3 Conference',
      type: 'Hybrid Event',
      venue: 'Emirates Palace Abu Dhabi',
      repeat: 'Quarterly',
      startDate: '2025-09-05',
      duration: '12 hours',
      startTime: '08:00',
      endTime: '20:00',
      status: 'completed',
      attendees: 400,
      revenue: 120000,
      cost: 35000
    }
  ]);

  // Sample profit data for charts
  const monthlyProfitData = [
    { month: 'Jan', profit: 15000, revenue: 45000, cost: 30000 },
    { month: 'Feb', profit: 22000, revenue: 52000, cost: 30000 },
    { month: 'Mar', profit: 18000, revenue: 48000, cost: 30000 },
    { month: 'Apr', profit: 35000, revenue: 75000, cost: 40000 },
    { month: 'May', profit: 42000, revenue: 82000, cost: 40000 },
    { month: 'Jun', profit: 28000, revenue: 68000, cost: 40000 }
  ];

  const eventProfitData = events.map(event => ({
    name: event.name.length > 15 ? event.name.substring(0, 15) + '...' : event.name,
    profit: event.revenue - event.cost,
    revenue: event.revenue,
    cost: event.cost
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30';
      case 'ongoing':
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      case 'completed':
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const totalEvents = events.length;
  const upcomingEvents = events.filter(event => event.status === 'upcoming').length;
  const totalAttendees = events.reduce((sum, event) => sum + event.attendees, 0);
  const totalProfit = events.reduce((sum, event) => sum + (event.revenue - event.cost), 0);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
          <p className="text-gray-300 text-sm mb-2">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.name}: $${entry.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                Event Dashboard
              </h1>
              <p className="text-gray-400 text-lg">Manage and monitor your events with style</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
                  />
                </div>
                <button className="bg-gray-800/50 border border-gray-700 hover:border-gray-600 text-gray-300 p-2 rounded-lg transition-all duration-200">
                  <Filter className="w-5 h-5" />
                </button>
              </div>

             
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Total Events</p>
                <p className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">{totalEvents}</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-3 rounded-xl border border-cyan-500/30">
                <Calendar className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Upcoming Events</p>
                <p className="text-3xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">{upcomingEvents}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 p-3 rounded-xl border border-emerald-500/30">
                <Clock className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Total Attendees</p>
                <p className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">{totalAttendees}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-3 rounded-xl border border-purple-500/30">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Total Profit</p>
                <p className="text-3xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300">${totalProfit.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-3 rounded-xl border border-emerald-500/30">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

       

        {/* Events List */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/50">
          <div className="p-6 border-b border-gray-700/50">
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
              Your Events
            </h2>
          </div>

          <div className="divide-y divide-gray-700/50">
            {events.map((event) => (
              <div key={event.id} className="p-6 hover:bg-gray-700/30 transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">{event.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 text-sm text-gray-300 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <span>{formatDate(event.startDate)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-400" />
                        <span className="truncate">{event.venue}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-400" />
                        <span>{event.attendees} attendees</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">${(event.revenue - event.cost).toLocaleString()} profit</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="font-medium text-gray-300">Type:</span>
                        <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">{event.type}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-400">
                        <Repeat className="w-4 h-4" />
                        <span>{event.repeat}</span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="font-medium text-gray-300">Duration:</span>
                        <span>{event.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-6">
                    <button className="p-3 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-all duration-200 border border-transparent hover:border-cyan-500/30">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-3 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all duration-200 border border-transparent hover:border-emerald-500/30">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-3 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-200 border border-transparent hover:border-red-500/30">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;