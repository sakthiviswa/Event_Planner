const dashboard=()=>{

    return(
        <div className="flex flex-col h-screen bg-gray-100">
            <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                    {/* Dashboard component would go here */}
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
                        
                        {/* Sample Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome</h3>
                                <p className="text-gray-600">This is your main content area. You can add your dashboard content here.</p>
                            </div>
                            
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Statistics</h3>
                                <p className="text-gray-600">Add your charts and statistics here.</p>
                            </div>
                            
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
                                <p className="text-gray-600">Add quick action buttons or widgets here.</p>
                            </div>
                        </div>
                    </div>
                </main>


        </div>

    );
}

export default dashboard;