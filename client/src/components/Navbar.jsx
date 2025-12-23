import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Sun, Moon, LayoutGrid, Bot } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import { aiSearch } from '../services/aiService';
import Logo from './Logo';

const Navbar = ({ onSidebarToggle, isSidebarOpen, onUserClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAISearchActive, setIsAISearchActive] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setIsAISearchActive(true);

    try {
      const result = await aiSearch(searchQuery);
      
      if (result.success && result.department) {
        setTimeout(() => {
          navigate(`/department/${result.department}`);
          setSearchQuery('');
          setIsAISearchActive(false);
        }, 1500);
      } else {
        setTimeout(() => {
          setIsAISearchActive(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Search error:', error);
      setIsAISearchActive(false);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <nav className="academic-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo & Institute Name */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onSidebarToggle}
              className="text-academic-700 dark:text-academic-300 hover:text-burgundy-600 transition-colors lg:hidden p-2"
              aria-label="Toggle sidebar"
            >
              <LayoutGrid className="w-6 h-6" />
            </button>
            
                    <Link to="/" className="flex items-center space-x-4 group">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Logo size="default" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-cream-600 rounded-full border-2 border-white dark:border-academic-900"></div>
                      </motion.div>
                      
                      <div className="hidden sm:block">
                        <div className="flex flex-col">
                          <h1 className="text-lg font-display font-bold text-burgundy-600 dark:text-burgundy-400 group-hover:text-burgundy-700 transition-colors">
                            SATKHIRA POLYTECHNIC INSTITUTE
                          </h1>
                          <p className="text-xs text-academic-600 dark:text-academic-400 font-medium">
                            Departmental Store
                          </p>
                        </div>
                      </div>
                    </Link>
          </div>

          {/* Center: Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <motion.div
                className="relative"
                whileFocus={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products with AI... (e.g., 'Laptop for CST')"
                  disabled={isSearching}
                  className="w-full px-4 py-2.5 pl-12 pr-12 bg-white dark:bg-academic-800 border-2 border-academic-200 dark:border-academic-700 rounded-lg text-academic-900 dark:text-academic-50 placeholder-academic-400 focus:outline-none focus:border-burgundy-500 focus:ring-2 focus:ring-burgundy-200 dark:focus:ring-burgundy-800 transition-all text-sm disabled:opacity-50"
                />
                <Bot className="absolute left-4 top-1/2 transform -translate-y-1/2 text-academic-400 w-5 h-5" />
                <motion.button
                  type="submit"
                  disabled={isSearching}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-burgundy-600 hover:bg-burgundy-700 text-white rounded-md transition-all disabled:opacity-50"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Search className={`w-4 h-4 ${isAISearchActive ? 'animate-spin' : ''}`} />
                </motion.button>
              </motion.div>
            </form>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-academic-700 dark:text-academic-300 hover:text-burgundy-600 transition-colors rounded-md hover:bg-academic-100 dark:hover:bg-academic-800"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button className="relative p-2 text-academic-700 dark:text-academic-300 hover:text-burgundy-600 transition-colors rounded-md hover:bg-academic-100 dark:hover:bg-academic-800">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-0 right-0 bg-burgundy-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                0
              </span>
            </button>
            
            <button 
              onClick={onUserClick}
              className="p-2 text-academic-700 dark:text-academic-300 hover:text-burgundy-600 transition-colors rounded-md hover:bg-academic-100 dark:hover:bg-academic-800"
            >
              <User className="w-6 h-6" />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-academic-700 dark:text-academic-300 hover:text-burgundy-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                disabled={isSearching}
                className="w-full px-4 py-2.5 pl-12 pr-12 bg-white dark:bg-academic-800 border-2 border-academic-200 dark:border-academic-700 rounded-lg text-academic-900 dark:text-academic-50 placeholder-academic-400 focus:outline-none focus:border-burgundy-500 transition-all text-sm disabled:opacity-50"
              />
              <Bot className="absolute left-4 top-1/2 transform -translate-y-1/2 text-academic-400 w-5 h-5" />
              <button
                type="submit"
                disabled={isSearching}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-burgundy-600 hover:bg-burgundy-700 text-white rounded-md transition-all disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
