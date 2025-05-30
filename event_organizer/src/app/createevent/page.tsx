'use client';
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Music, Utensils, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreateEventForm = () => {
  const [eventName, setEventName] = useState('Tech Innovation Summit 2025');
  const [selectedEventType, setSelectedEventType] = useState('Virtual Event');
  const [selectedVenue, setSelectedVenue] = useState('Convention Center Dubai');
  const [eventRepeat, setEventRepeat] = useState('Does not repeat');
  const [startDate, setStartDate] = useState('2025-07-15');
  const [duration, setDuration] = useState('8 hours');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  const router = useRouter();

  const eventTypes = [
    { id: 'virtual', label: 'Virtual Event', icon: <Users className="w-4 h-4" /> },
    { id: 'online', label: 'Online Event', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'graduate', label: 'Graduation', icon: <Music className="w-4 h-4" /> }
  ];

  const venues = [
    'Convention Center Dubai',
    'World Trade Center Abu Dhabi',
    'Jumeirah Beach Hotel',
    'Emirates Palace',
    'Dubai Opera House',
    'Sheikh Rashid Hall'
  ];

  const repeatOptions = [
    'Does not repeat',
    'Daily',
    'Weekly',
    'Monthly',
    'Yearly'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-4 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button className="flex items-center text-white hover:text-blue-100 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-lg font-medium">Create New Event</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Event Name */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold text-lg">
              Event name
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 font-medium"
              placeholder="Enter your event name"
            />
          </div>

          {/* Event Type */}
          <div className="space-y-4">
            <label className="block text-gray-700 font-semibold text-lg">
              Select the event type
            </label>
            <div className="flex flex-wrap gap-3">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedEventType(type.label)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedEventType === type.label
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {type.icon}
                  <span className="ml-2">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Venue Selection */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-semibold text-lg">
              Select a venue
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 font-medium appearance-none bg-white"
              >
                {venues.map((venue, index) => (
                  <option key={index} value={venue}>{venue}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Event Time */}
          <div className="space-y-4">
            <label className="block text-gray-700 font-semibold text-lg">
              Select the event & time
            </label>
            
            {/* Event Repeat */}
            <div className="space-y-2">
              <label className="block text-gray-600 font-medium">Event repeat</label>
              <select
                value={eventRepeat}
                onChange={(e) => setEventRepeat(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 font-medium appearance-none bg-white"
              >
                {repeatOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            {/* Time Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-gray-600 font-medium text-sm">Start date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-600 font-medium text-sm">Duration</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 font-medium"
                    placeholder="e.g. 2 hours"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-600 font-medium text-sm">Start time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-600 font-medium text-sm">End time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button className="px-6 py-3 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
            Cancel
          </button>
        

<button
  onClick={() => router.push('/')}
  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 transform hover:scale-105"
>
  Create Event
</button>

        </div>
      </div>
    </div>
  );
};

export default CreateEventForm; 