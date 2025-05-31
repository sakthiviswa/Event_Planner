import React from 'react';

interface GetStartedProps {
    onNavigate: (route: string) => void;
}

const Getstarted: React.FC<GetStartedProps> = ({ onNavigate }) => {
    return (
        <div className="flex h-screen w-full bg-gray-50">
            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                <div className="max-w-8xl mx-auto">
                    
                    {/* Congratulations Section */}
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-6 mb-6 relative overflow-hidden">
                        {/* Celebration Icons */}
                        <div className="absolute top-4 right-6">
                            <div className="flex space-x-2">
                                <div className="w-8 h-12 bg-yellow-400 rounded-full relative">
                                    <div className="absolute bottom-0 w-1 h-6 bg-yellow-600 left-1/2 transform -translate-x-1/2"></div>
                                </div>
                                <div className="w-8 h-12 bg-red-400 rounded-full relative">
                                    <div className="absolute bottom-0 w-1 h-6 bg-red-600 left-1/2 transform -translate-x-1/2"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex items-center mb-3">
                            <div className="w-6 h-6 mr-3">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Congratulations on creating an event!</h2>
                        </div>
                        
                        <p className="text-gray-600 text-sm max-w-md">
                            Before your event can go live, there are a few things you need to do. Complete all the steps below to get started.
                        </p>
                    </div>

                    {/* Action Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Add Tickets Card */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-6 h-6 bg-pink-500 rounded mr-3 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Add tickets</h3>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-4">
                                Create tickets for your event, set prices, and manage available quantity.
                            </p>
                            
                            <button 
                                onClick={() => onNavigate('add_tickets')}
                                className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                                Add More tickets
                            </button>
                        </div>

                        {/* Set up Event Card */}
                        <div className="bg-white rounded-lg shadow-sm border p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-6 h-6 bg-orange-500 rounded mr-3 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Set up your event</h3>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-4">
                                Add event details and manage event settings.
                            </p>
                            
                            <button 
                                onClick={() => onNavigate('setup_event')}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                            >
                                Set up your event
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Getstarted;