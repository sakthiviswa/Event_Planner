'use client';
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Music, BookOpen, Mail, Settings, Edit3, Save, X } from 'lucide-react';

const EventManagementSystem = () => {
  const [currentView, setCurrentView] = useState('list'); // 'create', 'list', 'settings'
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Tech Innovation Summit 2025',
      type: 'Virtual Event',
      venue: 'Convention Center Dubai',
      startDate: '2025-07-15',
      startTime: '09:00',
      endTime: '17:00',
      status: 'upcoming'
    }
  ]);

  // Create Event Form State
  const [createForm, setCreateForm] = useState({
    eventName: '',
    selectedEventType: 'Virtual Event',
    selectedVenue: 'Convention Center Dubai',
    eventRepeat: 'Does not repeat',
    startDate: '',
    duration: '8 hours',
    startTime: '09:00',
    endTime: '17:00'
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    activeTab: 'Event Details',
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    currency: 'USD',
    timezone: '',
    isOnlineEvent: false,
    venueName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    stateOrRegion: '',
    zipOrPostalCode: '',
    country: '',
    customMapsURL: '',
    supportEmail: '',
    emailFooterMessage: ''
  });

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

  const settingsTabs = [
    { name: 'Event Details', icon: Calendar },
    { name: 'Email', icon: Mail },
    { name: 'Location', icon: MapPin }
  ];

  const handleCreateEvent = () => {
    const newEvent = {
      id: events.length + 1,
      name: createForm.eventName,
      type: createForm.selectedEventType,
      venue: createForm.selectedVenue,
      startDate: createForm.startDate,
      startTime: createForm.startTime,
      endTime: createForm.endTime,
      status: 'upcoming'
    };
    setEvents([...events, newEvent]);
    setCreateForm({
      eventName: '',
      selectedEventType: 'Virtual Event',
      selectedVenue: 'Convention Center Dubai',
      eventRepeat: 'Does not repeat',
      startDate: '',
      duration: '8 hours',
      startTime: '09:00',
      endTime: '17:00'
    });
    setCurrentView('list');
  };

  type EventType = {
    id: number;
    name: string;
    type: string;
    venue: string;
    startDate: string;
    startTime: string;
    endTime: string;
    status: string;
  };

  const handleEditEvent = (event: EventType) => {
    setSelectedEvent(event);
    setSettingsForm({
      ...settingsForm,
      name: event.name,
      startDate: `${event.startDate}T${event.startTime}`,
      endDate: `${event.startDate}T${event.endTime}`,
      venueName: event.venue
    });
    setCurrentView('settings');
  };

  const handleSaveSettings = () => {
    if (selectedEvent) {
      const updatedEvents = events.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, name: settingsForm.name, venue: settingsForm.venueName }
          : event
      );
      setEvents(updatedEvents);
      setCurrentView('list');
    }
  };

  const renderCreateEvent = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 p-4 flex relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => setCurrentView('list')}
            className="flex items-center text-white hover:text-blue-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-lg font-medium">Create New Event</span>
          </button>
          <button 
            onClick={() => setCurrentView('list')}
            className="text-white hover:text-blue-100 transition-colors"
          >
            View Events
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
              value={createForm.eventName}
              onChange={(e) => setCreateForm({...createForm, eventName: e.target.value})}
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
                  onClick={() => setCreateForm({...createForm, selectedEventType: type.label})}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    createForm.selectedEventType === type.label
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
                value={createForm.selectedVenue}
                onChange={(e) => setCreateForm({...createForm, selectedVenue: e.target.value})}
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
            
            {/* Time Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-gray-600 font-medium text-sm">Start date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={createForm.startDate}
                    onChange={(e) => setCreateForm({...createForm, startDate: e.target.value})}
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
                    value={createForm.duration}
                    onChange={(e) => setCreateForm({...createForm, duration: e.target.value})}
                    className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 font-medium"
                    placeholder="e.g. 2 hours"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-600 font-medium text-sm">Start time</label>
                <input
                  type="time"
                  value={createForm.startTime}
                  onChange={(e) => setCreateForm({...createForm, startTime: e.target.value})}
                  className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-600 font-medium text-sm">End time</label>
                <input
                  type="time"
                  value={createForm.endTime}
                  onChange={(e) => setCreateForm({...createForm, endTime: e.target.value})}
                  className="w-full px-3 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-gray-800 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button 
            onClick={() => setCurrentView('list')}
            className="px-6 py-3 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateEvent}
            disabled={!createForm.eventName || !createForm.startDate}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );

  const renderEventList = () => (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <button
            onClick={() => setCurrentView('create')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Create New Event
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{event.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {event.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.type}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.venue}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.startDate} • {event.startTime} - {event.endTime}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEventSettings = () => {
    const renderEventDetails = () => (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-4">Specify event name, description and dates</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={settingsForm.name}
                onChange={(e) => setSettingsForm({...settingsForm, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={settingsForm.description}
                onChange={(e) => setSettingsForm({...settingsForm, description: e.target.value})}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="datetime-local"
                  value={settingsForm.startDate}
                  onChange={(e) => setSettingsForm({...settingsForm, startDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="datetime-local"
                  value={settingsForm.endDate}
                  onChange={(e) => setSettingsForm({...settingsForm, endDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const renderLocation = () => (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-600 mb-4">Event location & venue details</p>
          
          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settingsForm.isOnlineEvent}
                onChange={(e) => setSettingsForm({...settingsForm, isOnlineEvent: e.target.checked})}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">This is an online event</span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Venue Name</label>
              <input
                type="text"
                value={settingsForm.venueName}
                onChange={(e) => setSettingsForm({...settingsForm, venueName: e.target.value})}
                disabled={settingsForm.isOnlineEvent}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>
    );

    const renderEmailSettings = () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Email & Notification Settings</h3>
          <p className="text-sm text-gray-600 mb-6">Customize the email and notification settings for this event</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
              <input
                type="email"
                value={settingsForm.supportEmail}
                onChange={(e) => setSettingsForm({...settingsForm, supportEmail: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email footer message</label>
              <textarea
                value={settingsForm.emailFooterMessage}
                onChange={(e) => setSettingsForm({...settingsForm, emailFooterMessage: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </div>
      </div>
    );

    const renderTabContent = () => {
      switch (settingsForm.activeTab) {
        case 'Event Details':
          return renderEventDetails();
        case 'Location':
          return renderLocation();
        case 'Email':
          return renderEmailSettings();
        default:
          return renderEventDetails();
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-8xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center ">
              <button
                onClick={() => setCurrentView('list')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
                
              </button>
              <h1 className="text-2xl font-bold text-gray-900 ">Event Settings</h1>
            </div>
            <button
              onClick={handleSaveSettings}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.name}
                      onClick={() => setSettingsForm({...settingsForm, activeTab: tab.name})}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm font-medium rounded-md transition-colors ${
                        settingsForm.activeTab === tab.name
                          ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-600'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">{settingsForm.activeTab}</h2>
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'create':
        return renderCreateEvent();
      case 'settings':
        return renderEventSettings();
      default:
        return renderEventList();
    }
  };

  return renderCurrentView();
};

export default EventManagementSystem;