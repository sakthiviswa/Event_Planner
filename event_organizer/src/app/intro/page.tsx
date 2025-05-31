'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Users, Shield, Zap, MessageCircle, Facebook, Twitter, Linkedin, Instagram, Calendar, Clock, MapPin, CreditCard } from 'lucide-react';

const EventTicketingLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('venues');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Built-in Tools",
      subtitle: "Simple Check-in",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Full Control",
      subtitle: "Custom Design",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Available Now",
      subtitle: "Self Hosted",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "In Beta",
      subtitle: "Cloud Version",
      color: "from-purple-400 to-pink-500"
    }
  ];

  const stats = [
    { icon: <Calendar className="w-6 h-6" />, value: "10K+", label: "Events Created" },
    { icon: <Users className="w-6 h-6" />, value: "500K+", label: "Tickets Sold" },
    { icon: <MapPin className="w-6 h-6" />, value: "50+", label: "Cities" },
    { icon: <CreditCard className="w-6 h-6" />, value: "2.5%", label: "Processing Fee" }
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
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/20 to-teal-900/30"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-500/15 to-teal-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Enhanced Header */}
      <header className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto backdrop-blur-sm bg-black/20 border-b border-gray-800/50">
        <div className="flex items-center space-x-8">
          <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            technoz!
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">Features</a>
          <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">Documentation</a>
          <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">Pricing</a>
          <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium">GitHub</a>
          <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 font-semibold">
            Login
          </button>
        </nav>
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative z-10 text-center px-6 py-24 max-w-6xl mx-auto">
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-6 py-2 mb-8">
            <Star className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-cyan-300 text-sm font-medium">#2 Product of the Day on Product Hunt</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
              A better way to
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Sell Tickets Online
            </span>
          </h1>

          <p className="text-2xl text-gray-200 mb-6 max-w-3xl mx-auto font-light">
            Effortless and affordable event management for conferences, nightclubs, and everything in between
          </p>

          <p className="text-gray-400 mb-12 text-lg">
            Self-Hosted or Cloud-Based — <span className="text-cyan-400 font-semibold">the choice is Yours</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-4 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/25">
              Create Your Event Now
              <ChevronRight className="inline w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-cyan-400/50 px-10 py-4 rounded-full text-lg font-semibold hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 text-cyan-300">
              Deploy Open Source
              <ChevronRight className="inline w-5 h-5 ml-2" />
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-cyan-400 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to create, manage, and scale your events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"></div>
              <div className="relative text-center p-8 bg-gray-900/60 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className={`text-transparent bg-clip-text bg-gradient-to-r ${feature.color} mb-6 flex justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative z-10 text-center px-6 py-24 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-cyan-600/10 to-purple-600/10 backdrop-blur-sm border border-cyan-500/20 rounded-3xl p-16">
          <div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-2 mb-8 inline-block">
            <span className="text-cyan-300 text-sm px-6 py-2 font-medium">✨ Full Control | Transparent Pricing | No Hidden Fees</span>
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

          <p className="text-xl text-gray-200 mb-12 max-w-2xl mx-auto">
            Join <span className="text-cyan-400 font-semibold">thousands</span> of event organizers who trust technoz! for their ticketing needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <button className="bg-gradient-to-r from-cyan-500 to-purple-600 px-10 py-4 rounded-full text-lg font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/25">
              Create Event Now
              <ChevronRight className="inline w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-gray-600 px-10 py-4 rounded-full text-lg font-semibold hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 text-gray-300 hover:text-cyan-300">
              View Documentation
              <ChevronRight className="inline w-5 h-5 ml-2" />
            </button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <span>⭐ 200+ stars on GitHub</span>
            </div>
            <div className="flex items-center">
              <span>• Trusted by 10K+ events</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative z-10 bg-gray-950/90 backdrop-blur-sm border-t border-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-6">
                technoz!
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                The future of event ticketing is here. Simple, powerful, and affordable.
              </p>
              <div className="text-gray-400 text-sm mb-4 font-medium">Follow Us</div>
              <div className="flex space-x-4">
                <div className="p-2 bg-gray-800 rounded-full hover:bg-cyan-600 transition-colors cursor-pointer">
                  <Facebook className="w-5 h-5 text-gray-400 hover:text-white" />
                </div>
                <div className="p-2 bg-gray-800 rounded-full hover:bg-cyan-600 transition-colors cursor-pointer">
                  <Twitter className="w-5 h-5 text-gray-400 hover:text-white" />
                </div>
                <div className="p-2 bg-gray-800 rounded-full hover:bg-cyan-600 transition-colors cursor-pointer">
                  <Linkedin className="w-5 h-5 text-gray-400 hover:text-white" />
                </div>
                <div className="p-2 bg-gray-800 rounded-full hover:bg-cyan-600 transition-colors cursor-pointer">
                  <Instagram className="w-5 h-5 text-gray-400 hover:text-white" />
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-bold mb-6 text-lg">Venues</h4>
                <ul className="space-y-3">
                  {footerSections.venues.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 text-lg">Suppliers</h4>
                <ul className="space-y-3">
                  {footerSections.suppliers.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
                <ul className="space-y-3">
                  {footerSections.quickLinks.map((item, index) => (
                    <li key={index}>
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-1">
              <h4 className="text-white font-bold mb-6 text-lg">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Subscribe to get the latest updates and exclusive features
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 rounded-lg text-sm font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
              <button className="mt-6 bg-gradient-to-r from-green-500 to-teal-500 px-6 py-3 rounded-full text-sm font-semibold hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 flex items-center w-full justify-center">
                <MessageCircle className="w-4 h-4 mr-2" />
                Live Chat
              </button>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2025 technoz! All rights reserved. Built with ❤️ for event creators.
              </div>
              <div className="text-gray-400 text-sm">
                <span className="text-cyan-400">Open Source</span> • <span className="text-purple-400">Self-Hosted</span> • <span className="text-green-400">Cloud-Ready</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventTicketingLanding;