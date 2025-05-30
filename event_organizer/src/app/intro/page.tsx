'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Users, Shield, Zap, MessageCircle, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';



const EventTicketingLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('venues');

  const router = useRouter();
 

  useEffect(() => {
    setIsVisible(true);
  }, []);

 


  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Built-in Tools",
      subtitle: "Simple Check-in"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Full Control",
      subtitle: "Custom Design"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Available Now",
      subtitle: "Self Hosted"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "In Beta",
      subtitle: "Cloud Version"
    }
  ];

  const footerSections = {
    venues: [
      "Abu Dhabi", "Ajman", "Dubai", "Oujah", "Fujairah", "Ras Al Khaimah"
    ],
    suppliers: [
      "Photographers", "Decorators", "Videographers", "Choreographers", "DJs", "Makeup Artists"
    ],
    quickLinks: [
      "About Us", "Careers", "Contact Us", "Privacy Policy", "Terms & Conditions"
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            technoz!
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Documentation</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">GitHub</a>
          <Link href="/login">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 text-center px-6 py-20 max-w-6xl mx-auto">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              A better way to
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Sell Tickets Online
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Effortless and affordable event management for conference, nightclubs, and everything in between
          </p>
          
          <p className="text-gray-400 mb-8">
            Self-Hosted or Cloud-Based — the choice is Yours
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className="text-blue-400">Deploy Open Source</span>
            <ChevronRight className="w-4 h-4 text-blue-400" />
          </div>

          <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/25 mb-12"
          onClick={() => router.push('/createevent')}
          >
            Create Your Event Now
            <ChevronRight className="inline w-5 h-5 ml-2" />
          </button>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-2" />
              <span>#2 Product of the Day on Product Hunt</span>
            </div>
            <div className="flex items-center">
              <span>• 200+ stars on GitHub</span>
              <span className="ml-2 text-blue-400">→ Star us!</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 text-center px-6 py-20 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-2 mb-8 inline-block">
          <span className="text-purple-300 text-sm px-4 py-2">• Full Control | Transparent Pricing</span>
        </div>

        <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Ready to Create Your
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Next Successful Event?
          </span>
        </h2>

        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join Hundreds of event organizers who trust Hi Events for their ticketing needs.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-purple-500/25">
            Create Event Now
            <ChevronRight className="inline w-5 h-5 ml-2" />
          </button>
          <button className="border border-gray-600 px-8 py-4 rounded-full text-lg font-semibold hover:border-gray-400 hover:bg-gray-800/50 transition-all duration-300">
            View Documentation
            <ChevronRight className="inline w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-purple-400 mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                technoz!
              </div>
              <div className="text-gray-400 text-sm mb-4">Social Media</div>
              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Footer Sections */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4">Venues</h4>
                <ul className="space-y-2">
                  {footerSections.venues.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Suppliers</h4>
                <ul className="space-y-2">
                  {footerSections.suppliers.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {footerSections.quickLinks.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-1">
              <h4 className="text-white font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-4">Subscribe To Get Latest Media Updates</p>
              <button className="bg-gradient-to-r from-green-500 to-teal-500 px-6 py-2 rounded-full text-sm font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 flex items-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Live Chat
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventTicketingLanding;