import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Repeat, Edit, Trash2, Eye, Plus, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const EventDashboard = () => {
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
    name: event.name.length > 20 ? event.name.substring(0, 20) + '...' : event.name,
    profit: event.revenue - event.cost,
    revenue: event.revenue,
    cost: event.cost
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Dashboard</h1>
              <p className="text-gray-600">Manage and monitor your events</p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-lg">
              <Plus className="w-5 h-5" />
              Create New Event
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Events</p>
                <p className="text-3xl font-bold text-gray-900">{totalEvents}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Upcoming Events</p>
                <p className="text-3xl font-bold text-gray-900">{upcomingEvents}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Attendees</p>
                <p className="text-3xl font-bold text-gray-900">{totalAttendees}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Profit</p>
                <p className="text-3xl font-bold text-green-600">${totalProfit.toLocaleString()}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Profit Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Profit Trend */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Profit Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyProfitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`${value.toLocaleString()}`, name === 'profit' ? 'Profit' : name === 'revenue' ? 'Revenue' : 'Cost']}
                />
                <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 5 }} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Event-wise Profit Comparison */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Profit Comparison</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eventProfitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [`${value.toLocaleString()}`, name === 'profit' ? 'Profit' : name === 'revenue' ? 'Revenue' : 'Cost']}
                />
                <Bar dataKey="profit" fill="#10b981" />
                <Bar dataKey="revenue" fill="#3b82f6" />
                <Bar dataKey="cost" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Events List */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Events</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {events.map((event) => (
              <div key={event.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(event.startDate)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>{event.attendees} attendees</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-green-600 font-medium">${(event.revenue - event.cost).toLocaleString()} profit</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">Type:</span>
                        <span>{event.type}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <Repeat className="w-4 h-4 text-gray-400" />
                        <span>{event.repeat}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-gray-600">
                        <span className="font-medium">Duration:</span>
                        <span>{event.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-6">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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