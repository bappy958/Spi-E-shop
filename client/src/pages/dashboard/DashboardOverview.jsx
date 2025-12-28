import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MessageCircle,
  Bell,
  Maximize2,
  TrendingUp
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import UserDashboardOverview from './UserDashboardOverview';

const DashboardOverview = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <UserDashboardOverview />;
  }

  const [selectedPeriod, setSelectedPeriod] = useState('1 Day');

  // Bar chart data for Total Sale
  const salesData = [
    { month: 'Jan', value: 65 },
    { month: 'Feb', value: 45 },
    { month: 'Mar', value: 80 },
    { month: 'Apr', value: 55 },
    { month: 'May', value: 95 }, // Peak highlighted
    { month: 'Jun', value: 70 },
    { month: 'Jul', value: 60 },
  ];

  const maxSales = Math.max(...salesData.map(d => d.value));

  // Donut chart data (age groups)
  const ageGroups = [
    { label: '0-18', value: 25, color: 'bg-purple-500' },
    { label: '18-21', value: 35, color: 'bg-blue-400' },
    { label: '24-36', value: 40, color: 'bg-blue-600' },
  ];

  // Revenue trend data
  const revenue2024 = [
    { day: 1, value: 1.2 },
    { day: 2, value: 1.5 },
    { day: 3, value: 1.3 },
    { day: 4, value: 1.6 },
    { day: 5, value: 1.4 },
    { day: 6, value: 1.7 },
    { day: 7, value: 1.5 },
    { day: 8, value: 1.8 },
    { day: 9, value: 1.6 },
    { day: 10, value: 1.9 },
    { day: 11, value: 1.7 },
    { day: 12, value: 2.0 },
    { day: 13, value: 1.8 },
    { day: 14, value: 2.1 },
    { day: 15, value: 2.3 },
  ];

  const revenue2025 = [
    { day: 1, value: 2.5 },
    { day: 2, value: 2.8 },
    { day: 3, value: 3.0 },
    { day: 4, value: 3.2 },
    { day: 5, value: 3.5 },
    { day: 6, value: 3.8 },
    { day: 7, value: 4.0 },
    { day: 8, value: 4.2 },
    { day: 9, value: 4.5 },
    { day: 10, value: 4.8 },
    { day: 11, value: 5.0 },
    { day: 12, value: 5.2 },
    { day: 13, value: 5.5 },
    { day: 14, value: 5.8 },
    { day: 15, value: 6.0 },
  ];

  const maxRevenue = Math.max(...revenue2025.map(d => d.value));

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-academic-900 p-6">
      <div className="max-w-[1920px] mx-auto">
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <h1 className="text-3xl font-display font-bold text-white">
            Product Sales Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-academic-300 hover:text-white hover:bg-academic-800 rounded-lg transition-colors">
              <Calendar className="w-5 h-5" />
            </button>
            <button className="p-2 text-academic-300 hover:text-white hover:bg-academic-800 rounded-lg transition-colors relative">
              <MessageCircle className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-academic-300 hover:text-white hover:bg-academic-800 rounded-lg transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-burgundy-500 cursor-pointer hover:border-burgundy-400 transition-colors">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* AI Assistant Card - Large Left */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 bg-academic-800 rounded-xl p-6 border border-academic-700"
          >
            <h2 className="text-xl font-display font-bold text-white mb-4">AI Assistant</h2>

            {/* 3D Wave Graphic */}
            <div className="relative h-64 mb-6 flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Animated wave circles */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                      borderColor: `rgba(139, 92, 246, ${0.3 - i * 0.05})`,
                      width: `${100 - i * 15}%`,
                      height: `${100 - i * 15}%`,
                      left: `${i * 7.5}%`,
                      top: `${i * 7.5}%`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}

                {/* Central gradient circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-purple-600 opacity-60 blur-xl"></div>

                {/* Dots pattern */}
                <div className="absolute inset-0 rounded-full">
                  {[...Array(50)].map((_, i) => {
                    const angle = (i / 50) * 360;
                    const radius = 45;
                    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-400 rounded-full"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                        }}
                        animate={{
                          scale: [0.5, 1.5, 0.5],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.05,
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm mb-4 shadow-lg hover:shadow-xl transition-shadow"
            >
              Try Now
            </motion.button>

            <p className="text-academic-300 text-sm">
              Analyze product sales over last year. Compare revenue, quality, sales and brand.
            </p>
          </motion.div>

          {/* Total Sale Card - Top Right */}
          <motion.div
            variants={fadeInUp}
            className="bg-academic-800 rounded-xl p-6 border border-academic-700 relative"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display font-semibold text-white">Total sale</h3>
              <button className="p-1.5 text-academic-400 hover:text-white hover:bg-academic-700 rounded transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="text-4xl font-display font-bold text-white mb-6">90,744</div>

            {/* Bar Chart */}
            <div className="h-32 flex items-end justify-between space-x-2">
              {salesData.map((data, index) => (
                <div key={data.month} className="flex-1 flex flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.value / maxSales) * 100}%` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className={`w-full rounded-t-lg relative overflow-hidden ${index === 4
                      ? 'bg-gradient-to-t from-blue-600 to-purple-600'
                      : 'bg-gradient-to-t from-blue-500/50 to-purple-500/50'
                      }`}
                  >
                    {index === 4 && (
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)]"></div>
                    )}
                  </motion.div>
                  <span className="text-xs text-academic-400 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Donut Chart Card - Small */}
          <motion.div
            variants={fadeInUp}
            className="bg-academic-800 rounded-xl p-6 border border-academic-700"
          >
            <div className="flex items-center justify-center h-40">
              {/* Donut Chart */}
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-academic-700"
                  />
                  {/* Segment 1 - 0-18 (25%) */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#purple-gradient)"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 40 * 0.25} ${2 * Math.PI * 40}`}
                    strokeDashoffset={2 * Math.PI * 40 * 0.75}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  />
                  {/* Segment 2 - 18-21 (35%) */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#blue-light-gradient)"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 40 * 0.35} ${2 * Math.PI * 40}`}
                    strokeDashoffset={2 * Math.PI * 40 * 0.4}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                  />
                  {/* Segment 3 - 24-36 (40%) */}
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#blue-dark-gradient)"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 40 * 0.4} ${2 * Math.PI * 40}`}
                    strokeDashoffset={0}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />
                  <defs>
                    <linearGradient id="purple-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#9333ea" />
                    </linearGradient>
                    <linearGradient id="blue-light-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="blue-dark-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#1e40af" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="space-y-2 mt-4">
              {ageGroups.map((group, index) => (
                <div key={group.label} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${group.color}`}></div>
                  <span className="text-sm text-academic-300">{group.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Credit Rate Card - Small */}
          <motion.div
            variants={fadeInUp}
            className="bg-academic-800 rounded-xl p-6 border border-academic-700"
          >
            <h3 className="text-lg font-display font-semibold text-white mb-6">Credit rate</h3>

            {/* Gauge/Semi-circle */}
            <div className="relative h-40 flex items-center justify-center">
              <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 100">
                {/* Background arc */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-academic-700"
                />
                {/* Filled arc */}
                <motion.path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#gauge-gradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.8 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
                {/* Dots on arc */}
                {[...Array(5)].map((_, i) => {
                  const angle = (i / 4) * 180 - 90;
                  const x = 100 + 80 * Math.cos((angle * Math.PI) / 180);
                  const y = 100 + 80 * Math.sin((angle * Math.PI) / 180);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="3"
                      fill="currentColor"
                      className="text-academic-600"
                    />
                  );
                })}
                <defs>
                  <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Center Value */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-white mb-1">803</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Revenue Trend Card - Large Bottom Right */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 bg-academic-800 rounded-xl p-6 border border-academic-700 relative"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-display font-semibold text-white mb-1">Revenue trend</h3>
                <p className="text-sm text-academic-400">Summary Statistics</p>
              </div>
              <button className="p-1.5 text-academic-400 hover:text-white hover:bg-academic-700 rounded transition-colors">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Summary Statistics */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="text-sm">
                <span className="text-academic-400">Min: </span>
                <span className="text-white font-semibold">1.2</span>
              </div>
              <div className="text-sm">
                <span className="text-academic-400">Max: </span>
                <span className="text-white font-semibold">5.33</span>
              </div>
              <div className="text-sm">
                <span className="text-academic-400">Average: </span>
                <span className="text-white font-semibold">2.43</span>
              </div>
              <div className="flex items-center space-x-2">
                {['1 Day', '1 Week'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 rounded text-xs font-medium transition-colors ${selectedPeriod === period
                      ? 'bg-purple-600 text-white'
                      : 'bg-academic-700 text-academic-300 hover:bg-academic-600'
                      }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Line Chart */}
            <div className="relative h-64">
              <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <line
                    key={i}
                    x1="0"
                    y1={40 + i * 30}
                    x2="600"
                    y2={40 + i * 30}
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-academic-700"
                  />
                ))}

                {/* 2024 Line */}
                <motion.polyline
                  points={revenue2024.map((d, i) => `${40 + (i * 35)},${180 - (d.value / maxRevenue) * 120}`).join(' ')}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-blue-400"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />

                {/* 2025 Line with area fill */}
                <defs>
                  <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
                    <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={`M 40,180 ${revenue2025.map((d, i) => `L ${40 + (i * 35)},${180 - (d.value / maxRevenue) * 120}`).join(' ')} L ${40 + (revenue2025.length - 1) * 35},180 Z`}
                  fill="url(#area-gradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.polyline
                  points={revenue2025.map((d, i) => `${40 + (i * 35)},${180 - (d.value / maxRevenue) * 120}`).join(' ')}
                  fill="none"
                  stroke="url(#line-gradient)"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
                <defs>
                  <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>

                {/* Labels */}
                <text x="50" y="195" className="text-xs fill-academic-400">2024</text>
                <text x="50" y="50" className="text-xs fill-purple-400">2025</text>

                {/* +5% Label */}
                <motion.text
                  x="300"
                  y="80"
                  className="text-xs fill-green-400 font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  +5%
                </motion.text>
              </svg>

              {/* X-axis label */}
              <div className="absolute bottom-0 left-0 right-0 text-center">
                <span className="text-xs text-academic-400">15 Jun</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverview;
