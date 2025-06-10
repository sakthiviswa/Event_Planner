'use client';
import React, { useState, useEffect } from 'react';
import Dashboard from './components/containers/dashboard';
import Getstarted from './components/containers/getstarted';
import Add_tickets from './components/containers/add_tickets';
import SetUpEvent from './components/containers/CreateProduct';
import Settings from './components/containers/settings';

type PageKey = 'getstarted' | 'dashboard' | 'settings' | 'add_tickets' | 'setup_event';

const Layout = () => {
    // Track which page is active
    const [activePage, setActivePage] = useState<PageKey>('dashboard');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Ensure client-side hydration is complete
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Function to get breadcrumb based on active page
    const getBreadcrumb = () => {
        const breadcrumbs: Record<PageKey, string[]> = {
            'getstarted': ['Home', 'Getting Started'],
            'dashboard': ['Home', 'Dashboard'],
            'settings': ['Home', 'Settings'],
            'add_tickets': ['Home', 'Tickets & Products'],
            'setup_event': ['Home', 'Getting Started', 'Setup Event']
        };

        return breadcrumbs[activePage] || ['Home', 'Dashboard'];
    };

    // Wrapper to ensure only valid PageKey values are passed
    const handleNavigate = (route: string) => {
        if (
            route === 'getstarted' ||
            route === 'dashboard' ||
            route === 'settings' ||
            route === 'add_tickets' ||
            route === 'setup_event'
        ) {
            setActivePage(route as PageKey);
        }
    };

    // Function to render content based on activePage
    const renderContent = () => {
        if (!isClient) {
            // Return a loading state or placeholder during server-side rendering
            return (
                <div className="flex items-center justify-center h-full">
                    <div className="text-gray-400">Loading...</div>
                </div>
            );
        }

        switch (activePage) {
            case 'getstarted':
                return <Getstarted onNavigate={handleNavigate} />;
            case 'dashboard':
                return <Dashboard onNavigate={handleNavigate} />;
            case 'settings':
                return <Settings onNavigate={(page: string) => setActivePage(page as PageKey)} />;
            case 'add_tickets':
                return <Add_tickets onNavigate={(page: string) => setActivePage(page as PageKey)} />;
            case 'setup_event':
                return <SetUpEvent onBack={() => setActivePage('getstarted')} onProductCreated={() => { }} />;
            default:
                return <Dashboard onNavigate={(page: string) => setActivePage(page as PageKey)} />;
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-teal-900">
            {/* Sidebar */}
            <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 shadow-2xl flex flex-col justify-between min-h-screen backdrop-blur-sm border-r border-gray-700/50`}>

                {/* Logo/Brand Section */}
                <div className="p-6">
                    <div className="flex items-center justify-between">
                        <div className={`${sidebarCollapsed ? 'w-8 h-8' : 'h-10 w-32'} bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300`}>
                            {sidebarCollapsed ? (
                                <div className="w-4 h-4 bg-white rounded"></div>
                            ) : (
                                <span className="text-white font-bold text-lg">EventHub</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Navigation Sections */}
                <div className="flex-1 px-4 space-y-8">
                    {/* Overview Section */}
                    <div>
                        {!sidebarCollapsed && (
                            <h3 className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-4 px-2">
                                Overview
                            </h3>
                        )}

                        <nav className="space-y-1">
                            <button
                                onClick={() => setActivePage('getstarted')}
                                className={`group flex items-center space-x-3 rounded-xl px-3 py-3 transition-all duration-200 w-full relative overflow-hidden
                                ${activePage === 'getstarted'
                                        ? 'bg-teal-600/20 text-teal-300 shadow-lg backdrop-blur-sm border border-teal-500/30'
                                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-teal-300 hover:shadow-md'}`}
                            >
                                <div className={`p-1 rounded-lg ${activePage === 'getstarted' ? 'bg-teal-500/20' : 'group-hover:bg-gray-600/50'} transition-colors duration-200`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                {!sidebarCollapsed && <span className="font-medium">Getting Started</span>}
                                {activePage === 'getstarted' && (
                                    <div className="absolute right-2 w-1 h-6 bg-teal-400 rounded-full"></div>
                                )}
                            </button>

                            <button
                                onClick={() => setActivePage('dashboard')}
                                className={`group flex items-center space-x-3 rounded-xl px-3 py-3 transition-all duration-200 w-full relative overflow-hidden
                                ${activePage === 'dashboard'
                                        ? 'bg-teal-600/20 text-teal-300 shadow-lg backdrop-blur-sm border border-teal-500/30'
                                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-teal-300 hover:shadow-md'}`}
                            >
                                <div className={`p-1 rounded-lg ${activePage === 'dashboard' ? 'bg-teal-500/20' : 'group-hover:bg-gray-600/50'} transition-colors duration-200`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                {!sidebarCollapsed && <span className="font-medium">Dashboard</span>}
                                {activePage === 'dashboard' && (
                                    <div className="absolute right-2 w-1 h-6 bg-teal-400 rounded-full"></div>
                                )}
                            </button>
                        </nav>
                    </div>

                    {/* Manage Section */}
                    <div>
                        {!sidebarCollapsed && (
                            <h3 className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-4 px-2">
                                Manage
                            </h3>
                        )}

                        <nav className="space-y-1">
                            <button
                                onClick={() => setActivePage('settings')}
                                className={`group flex items-center space-x-3 rounded-xl px-3 py-3 transition-all duration-200 w-full relative overflow-hidden
                                ${activePage === 'settings'
                                        ? 'bg-teal-600/20 text-teal-300 shadow-lg backdrop-blur-sm border border-teal-500/30'
                                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-teal-300 hover:shadow-md'}`}
                            >
                                <div className={`p-1 rounded-lg ${activePage === 'settings' ? 'bg-teal-500/20' : 'group-hover:bg-gray-600/50'} transition-colors duration-200`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                {!sidebarCollapsed && <span className="font-medium">Settings</span>}
                                {activePage === 'settings' && (
                                    <div className="absolute right-2 w-1 h-6 bg-teal-400 rounded-full"></div>
                                )}
                            </button>

                            <button
                                onClick={() => setActivePage('add_tickets')}
                                className={`group flex items-center space-x-3 rounded-xl px-3 py-3 transition-all duration-200 w-full relative overflow-hidden
                                ${activePage === 'add_tickets'
                                        ? 'bg-teal-600/20 text-teal-300 shadow-lg backdrop-blur-sm border border-teal-500/30'
                                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-teal-300 hover:shadow-md'}`}
                            >
                                <div className={`p-1 rounded-lg ${activePage === 'add_tickets' ? 'bg-teal-500/20' : 'group-hover:bg-gray-600/50'} transition-colors duration-200`}>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                                {!sidebarCollapsed && <span className="font-medium">Tickets & Products</span>}
                                {activePage === 'add_tickets' && (
                                    <div className="absolute right-2 w-1 h-6 bg-teal-400 rounded-full"></div>
                                )}
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Bottom Section - User/Profile */}
                <div className="p-4">
                    <button className="group flex items-center space-x-3 text-gray-300 hover:bg-gray-700/50 hover:text-teal-300 rounded-xl px-3 py-3 transition-all duration-200 w-full backdrop-blur-sm">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg border-2 border-teal-400/30">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        {!sidebarCollapsed && (
                            <div className="flex flex-col items-start">
                                <p className="text-sm font-medium">Profile</p>
                                <p className="text-xs text-gray-400">Manage account</p>
                            </div>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col bg-gray-900">
                {/* Enhanced Navbar */}
                <nav className="bg-gradient-to-r from-gray-800 via-gray-700 to-teal-800 shadow-xl border-b border-gray-600/50">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Left side - Welcome message */}
                            <div className="flex items-center space-x-4">
                                <div className="hidden md:block">
                                </div>
                            </div>

                            {/* Right side - Profile and notifications */}
                            <div className="flex items-center space-x-4">
                                {/* Notifications */}
                                <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors duration-200 backdrop-blur-sm relative">
                                    <svg className="w-5 h-5 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5v5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8z" />
                                    </svg>
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-800"></div>
                                </button>

                                {/* Profile */}
                                <div className="flex items-center space-x-3 bg-gray-700/50 rounded-xl px-3 py-2 backdrop-blur-sm">
                                    <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-white font-medium text-sm">S</span>
                                    </div>
                                    <div className="hidden md:block">
                                        <p className="text-white font-medium text-sm">Sakthi</p>
                                        <p className="text-teal-300 text-xs">Admin</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="bg-gray-800 border-b border-gray-700/50 shadow-sm">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Left side - Enhanced Breadcrumb */}
                            <div className="flex items-center space-x-2">
                                {getBreadcrumb().map((item: string, index: number) => (
                                    <React.Fragment key={index}>
                                        <span
                                            className={`text-sm transition-colors duration-200 ${index === getBreadcrumb().length - 1
                                                    ? 'text-white font-semibold bg-gray-700/50 px-3 py-1 rounded-lg'
                                                    : 'text-gray-300'
                                                }`}
                                        >
                                            {item}
                                        </span>
                                        {index < getBreadcrumb().length - 1 && (
                                            <svg
                                                className="w-4 h-4 text-gray-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Right side - Enhanced Share button */}
                            <button className="group flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105">
                                <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                                <span className="text-sm font-medium">Share Event</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content with subtle background */}
                <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Layout;