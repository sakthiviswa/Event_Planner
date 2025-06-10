'use client';
import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Music, BookOpen, Mail, Settings as SettingsIcon, Edit3, Save, X } from 'lucide-react';

interface SettingsProps {
  onNavigate: (page: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate }) => {
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
    <div className="min-h-screen bg-gray-900 p-4 flex relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-300/25 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentView('list')}
            className="flex items-center text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="text-lg font-medium">Create New Event</span>
          </button>
          <button
            onClick={() => setCurrentView('list')}
            className="text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            View Events
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-8 border border-gray-700">
          {/* Event Name */}
          <div className="space-y-2">
            <label className="block text-gray-200 font-semibold text-lg">
              Event name
            </label>
            <input
              type="text"
              value={createForm.eventName}
              onChange={(e) => setCreateForm({ ...createForm, eventName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-600 bg-gray-700 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-200 text-gray-100 font-medium placeholder-gray-400"
              placeholder="Enter your event name"
            />
          </div>

          {/* Event Type */}
          <div className="space-y-4">
            <label className="block text-gray-200 font-semibold text-lg">
              Select the event type
            </label>
            <div className="flex flex-wrap gap-3">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setCreateForm({ ...createForm, selectedEventType: type.label })}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${createForm.selectedEventType === type.label
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-cyan-300 border border-gray-600'
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
            <label className="block text-gray-200 font-semibold text-lg">
              Select a venue
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={createForm.selectedVenue}
                onChange={(e) => setCreateForm({ ...createForm, selectedVenue: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-600 bg-gray-700 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-200 text-gray-100 font-medium appearance-none"
              >
                {venues.map((venue, index) => (
                  <option key={index} value={venue}>{venue}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Event Time */}
          <div className="space-y-4">
            <label className="block text-gray-200 font-semibold text-lg">
              Select the event & time
            </label>

            {/* Time Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="block text-gray-400 font-medium text-sm">Start date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={createForm.startDate}
                    onChange={(e) => setCreateForm({ ...createForm, startDate: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-600 bg-gray-700 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-200 text-gray-100 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400 font-medium text-sm">Duration</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={createForm.duration}
                    onChange={(e) => setCreateForm({ ...createForm, duration: e.target.value })}
                    className="w-full pl-10 pr-3 py-3 rounded-xl border-2 border-gray-600 bg-gray-700 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-200 text-gray-100 font-medium placeholder-gray-400"
                    placeholder="e.g. 2 hours"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400 font-medium text-sm">Start time</label>
                <input
                  type="time"
                  value={createForm.startTime}
                  onChange={(e) => setCreateForm({ ...createForm, startTime: e.target.value })}
                  className="w-full px-3 py-3 rounded-xl border-2 border-gray-600 bg-gray-700 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-200 text-gray-100 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-400 font-medium text-sm">End time</label>
                <input
                  type="time"
                  value={createForm.endTime}
                  onChange={(e) => setCreateForm({ ...createForm, endTime: e.target.value })}
                  className="w-full px-3 py-3 rounded-xl border-2 border-gray-600 bg-gray-700 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 transition-all duration-200 text-gray-100 font-medium"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setCurrentView('list')}
            className="px-6 py-3 text-gray-300 font-semibold rounded-xl hover:bg-gray-700/50 transition-all duration-200 backdrop-blur-sm border border-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateEvent}
            disabled={!createForm.eventName || !createForm.startDate}
            className="bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );

  const renderEventList = () => (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-100">My Events</h1>
          <button
            onClick={() => setCurrentView('create')}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/25"
          >
            <Calendar className="w-5 h-5" />
            Create New Event
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-700 hover:border-gray-600">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-100 line-clamp-2">{event.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${event.status === 'upcoming' ? 'bg-teal-900/50 text-teal-300 border border-teal-700' : 'bg-gray-700 text-gray-300 border border-gray-600'
                    }`}>
                    {event.status}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-400">
                    <Users className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.type}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.venue}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-sm">{event.startDate} • {event.startTime} - {event.endTime}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditEvent(event)}
                    className="flex-1 bg-cyan-900/30 hover:bg-cyan-800/40 text-cyan-300 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-cyan-700/50 hover:border-cyan-600"
                  >
                    <SettingsIcon className="w-4 h-4" />
                    Settings
                  </button>
                  <button className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-500">
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
          <p className="text-sm text-gray-400 mb-4">Specify event name, description and dates</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <input
                type="text"
                value={settingsForm.name}
                onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
              <textarea
                value={settingsForm.description}
                onChange={(e) => setSettingsForm({ ...settingsForm, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-white placeholder-gray-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                <input
                  type="datetime-local"
                  value={settingsForm.startDate}
                  onChange={(e) => setSettingsForm({ ...settingsForm, startDate: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                <input
                  type="datetime-local"
                  value={settingsForm.endDate}
                  onChange={(e) => setSettingsForm({ ...settingsForm, endDate: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
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
          <p className="text-sm text-gray-400 mb-4">Event location & venue details</p>

          <div className="mb-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settingsForm.isOnlineEvent}
                onChange={(e) => setSettingsForm({ ...settingsForm, isOnlineEvent: e.target.checked })}
                className="rounded border-gray-600 bg-gray-700 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-800"
              />
              <span className="text-sm text-gray-300">This is an online event</span>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Venue Name</label>
              <input
                type="text"
                value={settingsForm.venueName}
                onChange={(e) => setSettingsForm({ ...settingsForm, venueName: e.target.value })}
                disabled={settingsForm.isOnlineEvent}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-800 disabled:cursor-not-allowed text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
    );

    const renderEmailSettings = () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-2">Email & Notification Settings</h3>
          <p className="text-sm text-gray-400 mb-6">Customize the email and notification settings for this event</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Support Email</label>
              <input
                type="email"
                value={settingsForm.supportEmail}
                onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email footer message</label>
              <textarea
                value={settingsForm.emailFooterMessage}
                onChange={(e) => setSettingsForm({ ...settingsForm, emailFooterMessage: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-white placeholder-gray-400"
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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800">
        <div className="max-w-8xl mx-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center ">
              <button
                onClick={() => setCurrentView('list')}
                className="flex items-center text-gray-400 hover:text-teal-400 mr-4 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-1" />
              </button>
              <h1 className="text-2xl font-bold text-white ">Event Settings</h1>
            </div>
            <button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-6 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-2">
                <nav className="space-y-1">
                  {settingsTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.name}
                        onClick={() => setSettingsForm({ ...settingsForm, activeTab: tab.name })}
                        className={`w-full flex items-center gap-3 px-3 py-3 text-left text-sm font-medium rounded-md transition-all duration-200  ${settingsForm.activeTab === tab.name
                          ? 'bg-gradient-to-r from-teal-900/50 to-cyan-900/50 text-teal-300 border-r-2 border-teal-500 shadow-md'
                          : 'text-gray-400 hover:text-teal-300 hover:bg-gradient-to-r hover:from-teal-900/20 hover:to-cyan-900/20'
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.name}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-full"></div>
                  <h2 className="text-xl font-semibold text-white">{settingsForm.activeTab}</h2>
                </div>
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

export default Settings;