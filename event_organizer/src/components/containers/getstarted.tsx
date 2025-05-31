'use client';
import React from 'react';

interface GetStartedProps {
    onNavigate: (route: string) => void;
}

const Getstarted: React.FC<GetStartedProps> = ({ onNavigate }) => {
    return (
        <div className="flex h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-800">
            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto">

                    {/* Congratulations Section */}
                    <div className="relative bg-gradient-to-r from-purple-900/80 to-pink-900/80 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-purple-500/20 overflow-hidden">
                        {/* Animated Background Elements */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        </div>

                        {/* Celebration Icons */}
                        <div className="absolute top-6 right-8">
                            <div className="flex space-x-3">
                                <div className="w-10 h-16 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full relative shadow-lg animate-bounce">
                                    <div className="absolute bottom-0 w-2 h-8 bg-yellow-800 left-1/2 transform -translate-x-1/2 rounded-b-full"></div>
                                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-200 rounded-full"></div>
                                </div>
                                <div className="w-10 h-16 bg-gradient-to-b from-red-400 to-red-600 rounded-full relative shadow-lg animate-bounce delay-150">
                                    <div className="absolute bottom-0 w-2 h-8 bg-red-800 left-1/2 transform -translate-x-1/2 rounded-b-full"></div>
                                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-200 rounded-full"></div>
                                </div>
                                <div className="w-10 h-16 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full relative shadow-lg animate-bounce delay-300">
                                    <div className="absolute bottom-0 w-2 h-8 bg-blue-800 left-1/2 transform -translate-x-1/2 rounded-b-full"></div>
                                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-blue-200 rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 flex items-center mb-4">
                            <div className="w-10 h-10 mr-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                Congratulations on creating an event!
                            </h2>
                        </div>

                        <p className="relative z-10 text-gray-300 text-lg max-w-2xl leading-relaxed">
                            Before your event can go live, there are a few things you need to do. Complete all the steps below to get started and make your event shine.
                        </p>
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Add Tickets Card */}
                        <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8 hover:border-pink-500/50 transition-all duration-300 hover:shadow-pink-500/20 hover:shadow-2xl hover:scale-105">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-700 rounded-xl mr-4 flex items-center justify-center shadow-lg group-hover:shadow-pink-500/50 transition-all duration-300">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-white group-hover:text-pink-200 transition-colors duration-300">Add tickets</h3>
                            </div>

                            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                                Create tickets for your event, set prices, and manage available quantity to maximize your reach.
                            </p>

                            <button
                                onClick={() => onNavigate('add_tickets')}
                                className="w-full bg-gradient-to-r from-gray-700 to-gray-800 border border-gray-600 text-white py-4 px-6 rounded-xl hover:from-pink-600 hover:to-pink-700 hover:border-pink-500 transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-pink-500/30 hover:scale-105 group-hover:bg-pink-600"
                            >
                                Add More tickets
                            </button>
                        </div>

                        {/* Set up Event Card */}
                        <div className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-2xl hover:scale-105">
                            <div className="flex items-center mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl mr-4 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold text-white group-hover:text-blue-200 transition-colors duration-300">Set up your event</h3>
                            </div>

                            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                                Add event details and manage event settings to create an unforgettable experience.
                            </p>

                            <button
                                onClick={() => onNavigate('setup_event')}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 text-lg font-medium shadow-lg hover:shadow-blue-500/50 hover:scale-105 transform"
                            >
                                Set up your event
                            </button>
                        </div>
                    </div>

                    {/* Additional Visual Elements */}
                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800/50 rounded-full border border-gray-700/50">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-gray-400 text-sm">Ready to make your event amazing</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Getstarted;