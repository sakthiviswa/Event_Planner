'use client';
import React, { useState } from 'react';
import { Calendar, MapPin, Mail, Bell } from 'lucide-react';

export default function EventDetailsForm() {
  const [activeTab, setActiveTab] = useState('Event Details');
  const [formData, setFormData] = useState({
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

  const tabs = [
    { name: 'Event Details', icon: Calendar },
    { name: 'Email', icon: Mail },
    { name: 'Location', icon: MapPin }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value
    }));
  };

  const handleSave = () => {
    console.log('Saving form data:', formData);
    alert('Event details saved successfully!');
  };

  const renderEventDetails = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-4">Specify event name, description and dates</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select
                name="timezone"
                value={formData.timezone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                <option value="">Select timezone</option>
                <option value="GMT+5:30">GMT+5:30 - India Standard Time</option>
                <option value="GMT-5">GMT-5 - Eastern Standard Time</option>
                <option value="GMT-8">GMT-8 - Pacific Standard Time</option>
                <option value="GMT+0">GMT+0 - Greenwich Mean Time</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleSave}
        className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors font-medium"
      >
        Save
      </button>
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
              name="isOnlineEvent"
              checked={formData.isOnlineEvent}
              onChange={handleInputChange}
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
              name="venueName"
              value={formData.venueName}
              onChange={handleInputChange}
              disabled={formData.isOnlineEvent}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
              <input
                type="text"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                disabled={formData.isOnlineEvent}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
              <input
                type="text"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                disabled={formData.isOnlineEvent}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={formData.isOnlineEvent}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State or Region</label>
              <input
                type="text"
                name="stateOrRegion"
                value={formData.stateOrRegion}
                onChange={handleInputChange}
                disabled={formData.isOnlineEvent}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zip or Postal Code</label>
              <input
                type="text"
                name="zipOrPostalCode"
                value={formData.zipOrPostalCode}
                onChange={handleInputChange}
                disabled={formData.isOnlineEvent}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                disabled={formData.isOnlineEvent}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Custom Maps URL</label>
            <p className="text-xs text-gray-500 mb-2">If blank, the address will be used to generate a Google Maps link</p>
            <input
              type="url"
              name="customMapsURL"
              value={formData.customMapsURL}
              onChange={handleInputChange}
              disabled={formData.isOnlineEvent}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={handleSave}
        className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors font-medium"
      >
        Save
      </button>
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
            <p className="text-xs text-gray-500 mb-2">
              Any queries from product holders will be sent to this email address. This will also be used as the "reply to" address for all emails sent from this event.
            </p>
            <input
              type="email"
              name="supportEmail"
              value={formData.supportEmail}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email footer message</label>
            <p className="text-xs text-gray-500 mb-2">
              This message will be included in the footer of all emails sent from this event
            </p>
            <textarea
              name="emailFooterMessage"
              value={formData.emailFooterMessage}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <h4 className="text-base font-medium text-gray-900 mb-2">Notification Settings</h4>
            <p className="text-sm text-gray-600 mb-4">
              Notify organizer of new orders<br/>
              Receive email notifications when a new order is placed
            </p>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleSave}
        className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors font-medium"
      >
        Save
      </button>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.name
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
              <h1 className="text-2xl font-bold text-gray-900 mb-6">{activeTab}</h1>
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}