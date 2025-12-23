import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { X, Laptop, Building2, CircuitBoard, Snowflake, Package, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedDept, setExpandedDept] = useState(null);
  
  const departments = [
    { 
      name: 'CST', 
      fullName: 'Computer Science & Technology', 
      icon: Laptop, 
      count: 156, 
      description: 'Computer components, sensors, microcontrollers',
      route: 'CST',
      color: 'from-navy-500 to-navy-600'
    },
    { 
      name: 'Civil', 
      fullName: 'Civil Technology', 
      icon: Building2, 
      count: 98, 
      description: 'Construction materials, measuring instruments',
      route: 'Civil',
      color: 'from-navy-600 to-navy-700'
    },
    { 
      name: 'Electronics', 
      fullName: 'Electronics Technology', 
      icon: CircuitBoard, 
      count: 134, 
      description: 'Electronic components, communication devices',
      route: 'Electronics',
      color: 'from-gold-500 to-gold-600'
    },
    { 
      name: 'RAC', 
      fullName: 'Refrigeration and Air Conditioning', 
      icon: Snowflake, 
      count: 87, 
      description: 'HVAC equipment, refrigeration components',
      route: 'RAC',
      color: 'from-navy-500 to-gold-500'
    },
    { 
      name: 'General', 
      fullName: 'General Supplies', 
      icon: Package, 
      count: 200, 
      description: 'General academic and office supplies',
      route: 'General',
      color: 'from-academic-500 to-academic-600'
    },
  ];

  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    }
  };

  const toggleExpand = (deptName) => {
    setExpandedDept(expandedDept === deptName ? null : deptName);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar - Compact Design */}
      <motion.div
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        className={`
          fixed left-0 top-0 h-full 
          bg-white dark:bg-academic-800 
          border-r-2 border-academic-200 dark:border-academic-700 
          z-50 shadow-xl 
          lg:static lg:z-auto lg:shadow-none lg:translate-x-0
          transition-all duration-300
          ${isCollapsed ? 'w-16' : 'w-64'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Compact Header */}
          <div className="flex items-center justify-between p-3 border-b-2 border-academic-200 dark:border-academic-700 bg-academic-50 dark:bg-academic-900">
            {!isCollapsed && (
              <h2 className="text-sm font-display font-bold text-burgundy-600 dark:text-burgundy-400">
                Departments
              </h2>
            )}
            <div className="flex items-center space-x-1 ml-auto">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="lg:block hidden p-1.5 text-academic-600 dark:text-academic-400 hover:text-burgundy-600 dark:hover:text-burgundy-400 hover:bg-academic-100 dark:hover:bg-academic-700 rounded-md transition-colors"
                title={isCollapsed ? 'Expand' : 'Collapse'}
              >
                <ChevronRight className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={onClose}
                className="lg:hidden p-1.5 text-academic-600 dark:text-academic-400 hover:text-burgundy-600 dark:hover:text-burgundy-400 hover:bg-academic-100 dark:hover:bg-academic-700 rounded-md transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Compact Departments List */}
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              {departments.map((dept, index) => {
                const Icon = dept.icon;
                const isActive = location.pathname === `/department/${dept.route}`;
                return (
                  <div key={dept.name}>
                    <Link
                      to={`/department/${dept.route}`}
                      onClick={() => {
                        if (window.innerWidth < 1024) {
                          onClose();
                        }
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.05,
                          type: 'spring',
                          stiffness: 100
                        }}
                        whileHover={{
                          x: isCollapsed ? 0 : 3,
                          scale: isCollapsed ? 1.05 : 1,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          w-full flex items-center p-2 rounded-lg
                          transition-all duration-200
                          ${isCollapsed 
                            ? 'justify-center' 
                            : 'justify-between'
                          }
                          ${isActive 
                            ? 'bg-burgundy-50 dark:bg-burgundy-900/20 border-l-4 border-burgundy-600 shadow-sm' 
                            : 'hover:bg-academic-50 dark:hover:bg-academic-700'
                          }
                        `}
                        title={isCollapsed ? dept.fullName : ''}
                      >
                        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'} flex-1 min-w-0`}>
                          <div className={`
                            p-1.5 rounded-md transition-colors flex-shrink-0
                            ${isActive 
                              ? `bg-gradient-to-br ${dept.color} text-white` 
                              : 'bg-academic-100 dark:bg-academic-700 text-burgundy-600 dark:text-burgundy-400'
                            }
                          `}>
                            <Icon className="w-4 h-4" />
                          </div>
                          {!isCollapsed && (
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className={`
                                  text-sm font-semibold transition-colors truncate
                                  ${isActive 
                                    ? 'text-burgundy-600 dark:text-burgundy-400' 
                                    : 'text-academic-900 dark:text-academic-50'
                                  }
                                `}>
                                  {dept.name}
                                </span>
                                <span className={`
                                  text-xs font-bold px-1.5 py-0.5 rounded
                                  ${isActive 
                                    ? 'bg-burgundy-600 text-white' 
                                    : 'bg-academic-200 dark:bg-academic-700 text-academic-700 dark:text-academic-300'
                                  }
                                `}>
                                  {dept.count}
                                </span>
                              </div>
                              <p className="text-xs text-academic-600 dark:text-academic-400 truncate mt-0.5">
                                {dept.description}
                              </p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Compact Footer */}
          {!isCollapsed && (
            <div className="p-3 border-t-2 border-academic-200 dark:border-academic-700 bg-academic-50 dark:bg-academic-900">
              <div className="text-xs text-center text-academic-600 dark:text-academic-400">
                <p className="font-semibold text-burgundy-600 dark:text-burgundy-400 mb-1">
                  Quick Access
                </p>
                <p className="text-academic-500 dark:text-academic-500">
                  Browse by Department
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
