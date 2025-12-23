import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { 
  LayoutDashboard, 
  FileText,
  Wallet,
  Bell,
  ChevronUp,
  ChevronDown,
  X,
  Plus,
  Activity,
  TrendingUp,
  PieChart,
  ShoppingCart,
  Package,
  Store,
  BarChart3,
  Users,
  Shield,
  Settings,
  HelpCircle,
  Moon,
  Sun
} from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const DashboardSidebar = ({ isOpen, onClose, isMobile = false }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [expandedItems, setExpandedItems] = useState(['dashboard']);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
      badge: null,
      subItems: [
        { label: 'Activity', path: '/dashboard/activity', icon: Activity },
        { label: 'Traffic', path: '/dashboard/traffic', icon: TrendingUp },
        { label: 'Statistic', path: '/dashboard/statistic', icon: PieChart },
      ]
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingCart,
      path: '/dashboard/orders',
      badge: null,
    },
    {
      id: 'products',
      label: 'Products',
      icon: Package,
      path: '/dashboard/products',
      badge: null,
      subItems: [
        { label: 'All Products', path: '/dashboard/products', icon: Package },
        { label: 'Add Product', path: '/dashboard/products/add', icon: Plus },
        { label: 'Categories', path: '/dashboard/products/categories', icon: FileText },
      ]
    },
    {
      id: 'transaction',
      label: 'Transaction',
      icon: Wallet,
      path: '/dashboard/transaction',
      badge: null,
    },
    {
      id: 'stores',
      label: 'Stores',
      icon: Store,
      path: '/dashboard/stores',
      badge: null,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      path: '/dashboard/reports',
      badge: null,
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      path: '/dashboard/customers',
      badge: null,
    },
    {
      id: 'role-management',
      label: 'Role Management',
      icon: Shield,
      path: '/dashboard/role-management',
      badge: null,
    },
    {
      id: 'log-activity',
      label: 'Log Activity',
      icon: FileText,
      path: '/dashboard/log-activity',
      badge: null,
    },
  ];

  const messages = [
    { name: 'Erik Gunsel', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Emily Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Arthur Adelk', avatar: 'https://i.pravatar.cc/150?img=3' },
  ];

  const toggleSubMenu = (itemId) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const sidebarVariants = {
    collapsed: {
      width: isMobile ? 0 : 80,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    expanded: {
      width: 280,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -20,
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const shouldShow = isMobile ? isOpen : true;
  const showCollapsed = isCollapsed && !isMobile;

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial="expanded"
        animate={showCollapsed ? "collapsed" : "expanded"}
        className={`
          fixed lg:static left-0 top-0 h-full
          bg-academic-900 border-r border-academic-800
          shadow-xl lg:shadow-none
          z-50 lg:z-auto
          flex flex-col
          overflow-hidden
        `}
        style={{ width: showCollapsed ? 80 : 280 }}
      >
        {/* Header with Collapse Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between p-4 border-b border-academic-800"
        >
          {!showCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-3 flex-1"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-sm font-display font-bold text-white">
                  Dashboard
                </h2>
                <p className="text-xs text-academic-400">
                  Control Panel
                </p>
              </div>
            </motion.div>
          )}
          {showCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mx-auto"
            >
              <Logo size="default" />
            </motion.div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:block hidden p-1.5 text-academic-400 hover:text-white hover:bg-academic-800 rounded-md transition-colors"
          >
            {showCollapsed ? (
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            ) : (
              <ChevronDown className="w-4 h-4 rotate-90" />
            )}
          </button>
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-academic-400 hover:text-white hover:bg-academic-800 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>

        {/* User Profile Section */}
        <AnimatePresence>
          {shouldShow && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 border-b border-academic-800"
            >
              {!showCollapsed ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3"
                >
                  <div className="relative">
                    <img
                      src="https://i.pravatar.cc/150?img=12"
                      alt="User"
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-500"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-academic-900"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-academic-400 truncate">
                      PRODUCT DESIGNER
                    </p>
                    <p className="text-sm font-bold text-white truncate">
                      Andrew Smith
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center"
                >
                  <div className="relative">
                    <img
                      src="https://i.pravatar.cc/150?img=12"
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover border-2 border-purple-500"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-academic-900"></div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-3">
          {!showCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-3"
            >
              <p className="text-xs font-bold text-academic-500 uppercase tracking-wider px-3 mb-2">
                MAIN
              </p>
            </motion.div>
          )}
          
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1"
          >
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              const hasSubItems = item.subItems && item.subItems.length > 0;
              const isExpanded = expandedItems.includes(item.id);

              return (
                <motion.li
                  key={item.id}
                  variants={itemVariants}
                  className="relative"
                  onMouseEnter={() => showCollapsed && setHoveredItem(item.id)}
                  onMouseLeave={() => showCollapsed && setHoveredItem(null)}
                >
                  {/* Main Menu Item */}
                  <div className="relative">
                    <Link
                      to={item.path}
                      onClick={(e) => {
                        if (hasSubItems && !showCollapsed) {
                          e.preventDefault();
                          toggleSubMenu(item.id);
                        }
                        if (isMobile) {
                          onClose();
                        }
                      }}
                    >
                      <motion.div
                        whileHover={{ scale: showCollapsed ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          relative flex items-center justify-between p-3 rounded-lg
                          transition-all duration-200 cursor-pointer
                          ${active 
                            ? 'bg-purple-600/20 text-white' 
                            : 'text-academic-300 hover:bg-academic-800'
                          }
                        `}
                      >
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className={`
                            p-2 rounded-lg transition-colors flex-shrink-0
                            ${active 
                              ? 'bg-purple-600 text-white' 
                              : 'bg-academic-800 text-purple-400'
                            }
                          `}>
                            <Icon className="w-4 h-4" />
                          </div>
                          
                          {!showCollapsed && (
                            <span className={`font-semibold text-sm truncate ${active ? 'text-white' : 'text-academic-300'}`}>
                              {item.label}
                            </span>
                          )}
                        </div>

                        {!showCollapsed && (
                          <div className="flex items-center space-x-2 flex-shrink-0">
                            {item.badge && (
                              <span className={`
                                px-2 py-0.5 text-xs font-bold rounded-full
                                ${active 
                                  ? 'bg-purple-600 text-white' 
                                  : 'bg-purple-600/20 text-purple-400'
                                }
                              `}>
                                {item.badge}
                              </span>
                            )}
                            
                            {hasSubItems && (
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronUp className={`w-4 h-4 ${active ? 'text-white' : 'text-academic-500'}`} />
                              </motion.div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    </Link>

                    {/* Pop-out Menu for Collapsed State */}
                    <AnimatePresence>
                      {showCollapsed && hoveredItem === item.id && hasSubItems && (
                        <motion.div
                          initial={{ opacity: 0, x: -10, scale: 0.95 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-full ml-2 top-0 w-48 bg-academic-800 rounded-lg shadow-xl border border-academic-700 p-2 z-50"
                          onMouseEnter={() => setHoveredItem(item.id)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          {item.subItems.map((subItem) => {
                            const SubIcon = subItem.icon;
                            const subActive = isActive(subItem.path);
                            return (
                              <Link
                                key={subItem.path}
                                to={subItem.path}
                                onClick={() => isMobile && onClose()}
                              >
                                <motion.div
                                  whileHover={{ x: 3 }}
                                  className={`
                                    flex items-center p-2.5 rounded-md text-sm
                                    transition-colors
                                    ${subActive
                                      ? 'bg-purple-600/20 text-purple-400 font-semibold'
                                      : 'text-academic-300 hover:bg-academic-700'
                                    }
                                  `}
                                >
                                  <SubIcon className="w-4 h-4 mr-2" />
                                  {subItem.label}
                                </motion.div>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Sub Menu Items (Expanded State) */}
                    {!showCollapsed && (
                      <AnimatePresence>
                        {hasSubItems && isExpanded && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-1 ml-11 space-y-1 overflow-hidden"
                          >
                            {item.subItems.map((subItem) => {
                              const SubIcon = subItem.icon;
                              const subActive = isActive(subItem.path);
                              return (
                                <motion.li
                                  key={subItem.path}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -10 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Link to={subItem.path} onClick={() => isMobile && onClose()}>
                                    <motion.div
                                      whileHover={{ x: 3 }}
                                      className={`
                                        flex items-center p-2.5 rounded-md text-sm
                                        transition-colors
                                        ${subActive
                                          ? 'bg-purple-600/20 text-purple-400 font-semibold'
                                          : 'text-academic-400 hover:bg-academic-800'
                                        }
                                      `}
                                    >
                                      <SubIcon className="w-4 h-4 mr-2" />
                                      {subItem.label}
                                    </motion.div>
                                  </Link>
                                </motion.li>
                              );
                            })}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </nav>

        {/* Messages Section */}
        <AnimatePresence>
          {shouldShow && !showCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 border-t border-academic-800"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-academic-500 uppercase tracking-wider px-3">
                  MESSAGES
                </p>
                <button className="p-1.5 hover:bg-academic-800 rounded-md transition-colors">
                  <Plus className="w-4 h-4 text-academic-400" />
                </button>
              </div>
              <div className="space-y-2">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 3 }}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-academic-800 cursor-pointer transition-colors"
                  >
                    <img
                      src={message.avatar}
                      alt={message.name}
                      className="w-8 h-8 rounded-full object-cover border border-academic-700"
                    />
                    <span className="text-sm font-medium text-white truncate flex-1">
                      {message.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Messages Section - Collapsed (Only Avatars) */}
        <AnimatePresence>
          {shouldShow && showCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-3 border-t border-academic-800"
            >
              <div className="space-y-2">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    className="flex justify-center"
                  >
                    <img
                      src={message.avatar}
                      alt={message.name}
                      className="w-8 h-8 rounded-full object-cover border border-academic-700 cursor-pointer"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Support Section */}
        <AnimatePresence>
          {shouldShow && !showCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 border-t border-academic-800"
            >
              <div className="mb-3">
                <p className="text-xs font-bold text-academic-500 uppercase tracking-wider px-3 mb-2">
                  SUPPORT
                </p>
                <div className="space-y-1">
                  <Link to="/dashboard/settings">
                    <motion.div
                      whileHover={{ x: 3 }}
                      className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-academic-800 cursor-pointer transition-colors"
                    >
                      <Settings className="w-4 h-4 text-academic-400" />
                      <span className="text-sm font-medium text-white">Settings</span>
                    </motion.div>
                  </Link>
                  <Link to="/dashboard/help">
                    <motion.div
                      whileHover={{ x: 3 }}
                      className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-academic-800 cursor-pointer transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-academic-400" />
                      <span className="text-sm font-medium text-white">Help</span>
                    </motion.div>
                  </Link>
                  <motion.div
                    whileHover={{ x: 3 }}
                    onClick={toggleTheme}
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-academic-800 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {theme === 'dark' ? (
                        <Moon className="w-4 h-4 text-academic-400" />
                      ) : (
                        <Sun className="w-4 h-4 text-academic-400" />
                      )}
                      <span className="text-sm font-medium text-white">Dark-Mode</span>
                    </div>
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${
                      theme === 'dark' ? 'bg-purple-600' : 'bg-academic-600'
                    }`}>
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full absolute top-1 transition-all"
                        animate={{ 
                          x: theme === 'dark' ? 16 : 2,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA Section */}
        <AnimatePresence>
          {shouldShow && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="p-4 border-t border-academic-800"
            >
              {!showCollapsed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-academic-800 rounded-lg p-4 mb-3"
                >
                  <p className="text-sm font-semibold text-white mb-1">
                    Let's start!
                  </p>
                  <p className="text-xs text-academic-400 mb-3">
                    Creating or adding new tasks couldn't be easier
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Task</span>
                  </motion.button>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </>
  );
};

export default DashboardSidebar;
