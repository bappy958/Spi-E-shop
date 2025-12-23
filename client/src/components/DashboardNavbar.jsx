import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Search, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import Logo from './Logo';

const DashboardNavbar = ({ onSidebarToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-academic-900 border-b border-academic-800 sticky top-0 z-30">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Menu Toggle & Search */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onSidebarToggle}
              className="text-academic-300 hover:text-white transition-colors p-2 rounded-md hover:bg-academic-800"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="hidden md:flex items-center space-x-2">
              <Search className="w-5 h-5 text-academic-400" />
              <input
                type="text"
                placeholder="Search dashboard..."
                className="px-3 py-1.5 bg-academic-800 border border-academic-700 rounded-md text-sm text-white placeholder-academic-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-academic-300 hover:text-white transition-colors rounded-md hover:bg-academic-800"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button className="relative p-2 text-academic-300 hover:text-white transition-colors rounded-md hover:bg-academic-800">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-academic-300 hover:text-white transition-colors rounded-md hover:bg-academic-800"
              >
                <User className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;

