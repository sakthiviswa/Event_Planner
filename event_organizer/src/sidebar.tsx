'use client';
import React, { useState } from 'react';
import Dashboard from './components/containers/dashboard';
import Getstarted from './components/containers/getstarted';
import Add_tickets from './components/containers/add_tickets';
import SetUpEvent from './components/containers/CreateProduct';
import Settings from './components/containers/settings';

const Layout = () => {
    // Track which page is active
    const [activePage, setActivePage] = useState('dashboard'); 

    // Function to render content based on activePage
    const renderContent = () => {
        switch (activePage) {
            case 'getstarted':
                return <Getstarted onNavigate={setActivePage} />;
            case 'dashboard':
                return <Dashboard onNavigate={setActivePage} />;
            case 'settings':
                return <Settings onNavigate={setActivePage} />;
            case 'add_tickets':
                return <Add_tickets onNavigate={setActivePage} />;
            case 'setup_event':
                return <SetUpEvent onBack={() => setActivePage('getstarted')} onProductCreated={() => {}} />;
            default:
                return <Dashboard onNavigate={setActivePage} />;
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 ">
            {/* Sidebar */}
            <div className="md:w-[240px] w-20 border border-gray-100 shadow-lg flex flex-col md:p-6 py-6 justify-between md:items-stretch items-center bg-blue-400 text-white min-h-screen overflow-hidden">
                
                {/* Logo/Brand Section */}
                <div className="mb-8">
                    <div className="h-12 bg-blue-500 rounded md:block hidden"></div>
                    <div className="h-8 w-8 bg-blue-500 rounded md:hidden block"></div>
                </div>

                {/* Navigation Sections */}
                <div className="flex-1 space-y-8">
                    
                    {/* Overview Section */}
                    <div>
                        <h3 className="text-xs font-semibold text-blue-100 uppercase tracking-wider mb-3 md:block hidden">
                            Overview
                        </h3>
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActivePage('getstarted')}
                                className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors w-full
                                ${activePage === 'getstarted' ? 'bg-blue-500 text-white' : 'text-white hover:bg-blue-500'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="md:block hidden">Getting started</span>
                            </button>
                            
                            <button
                                onClick={() => setActivePage('dashboard')}
                                className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors w-full
                                ${activePage === 'dashboard' ? 'bg-blue-500 text-white' : 'text-blue-200 hover:bg-blue-500'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <span className="md:block hidden">Dashboard</span>
                            </button>
                        </nav>
                    </div>

                    {/* Manage Section */}
                    <div>
                        <h3 className="text-xs font-semibold text-blue-100 uppercase tracking-wider mb-3 md:block hidden">
                            Manage
                        </h3>
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActivePage('settings')}
                                className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors w-full
                                ${activePage === 'settings' ? 'bg-blue-500 text-white' : 'text-white hover:bg-blue-500'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="md:block hidden">Settings</span>
                            </button>
                            
                            <button
                                onClick={() => setActivePage('add_tickets')}
                                className={`flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors w-full
                                ${activePage === 'add_tickets' ? 'bg-blue-500 text-white' : 'text-white hover:bg-blue-500'}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                </svg>
                                <span className="md:block hidden">Tickets & Products</span>
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Bottom Section - User/Profile */}
                <div className="mt-4">
                    <button className="flex items-center space-x-3 text-white hover:bg-blue-500 rounded-lg px-3 py-2 transition-colors w-full">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div className="md:block hidden">
                            <p className="text-sm font-medium">Profile</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <nav className="bg-[#50BCFF] shadow-md w-full h-[60px] flex items-center justify-end px-6">
                    {/* Right side - Search and Profile */}
                    <div className="flex items-center gap-10 mt-2">
                        {/* Profile Name */}
                        <p className="text-gray-800 font-medium text-base">sakthi</p>

                        {/* Profile Picture */}
                        <div className="w-[45px] h-[45px] bg-gray-300 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    </div>
                </nav>

                {/* Content below navbar */}
                <div className="bg-gray-100 px-2 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        {/* Left side - Event info */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-600 text-sm">Event\</span>
                                <span className="text-gray-900 font-medium">Sakthinathan\</span>
                                <span className="text-gray-600 text-sm">event name</span>
                            </div>
                        </div>
                        
                        {/* Right side - Share button */}
                        <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2" >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            <span className="text-sm">share event</span>
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                {renderContent()}
            </div>
        </div>
    );
};

export default Layout;