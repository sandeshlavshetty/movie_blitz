import React from 'react';
import { Search, Home, Tv, Download, Compass, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-orange-500">Sandesh Tv</div>
          <nav className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <Home size={18} />
              <span>Home</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <Tv size={18} />
              <span>Live TV</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <Download size={18} />
              <span>On Demand</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <Compass size={18} />
              <span>Discover</span>
            </button>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:bg-gray-700 transition-colors w-64"
            />
          </div>
          <button className="text-gray-300 hover:text-white transition-colors">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;