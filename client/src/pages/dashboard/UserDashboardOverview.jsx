import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock, Heart, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const UserDashboardOverview = () => {
    const { currentUser } = useAuth();

    const stats = [
        { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'bg-blue-500' },
        { label: 'Pending', value: '2', icon: Clock, color: 'bg-orange-500' },
        { label: 'Wishlist', value: '5', icon: Heart, color: 'bg-pink-500' },
    ];

    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl font-display font-bold text-white mb-2">
                    Welcome back, {currentUser?.displayName || 'Student'}! 👋
                </h1>
                <p className="text-academic-400">
                    Here's what's happening with your store account today.
                </p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-academic-800 rounded-xl p-6 border border-academic-700 relative overflow-hidden group"
                    >
                        <div className="relative z-10">
                            <div className={`w-12 h-12 rounded-lg ${stat.color} bg-opacity-20 flex items-center justify-center mb-4`}>
                                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                            <p className="text-academic-400 text-sm font-medium">{stat.label}</p>
                        </div>
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${stat.color} opacity-10 blur-xl group-hover:opacity-20 transition-opacity`} />
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders - Placeholder */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-academic-800 rounded-xl p-6 border border-academic-700"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Recent Orders</h2>
                        <Link to="/dashboard/my-orders" className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-academic-900/50 rounded-lg border border-academic-700/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-academic-800 flex items-center justify-center border border-academic-700">
                                        <ShoppingBag className="w-5 h-5 text-academic-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Order #ORD-2023-{100 + i}</p>
                                        <p className="text-xs text-academic-400">2 items • $45.00</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                                    Processing
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 rounded-xl p-6 border border-academic-700"
                >
                    <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link to="/dashboard/my-cart" className="p-4 bg-academic-800/50 hover:bg-academic-800 rounded-xl border border-academic-700 transition-all group text-center block">
                            <div className="w-10 h-10 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <ShoppingBag className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-sm font-medium text-white">View Cart</span>
                        </Link>
                        <Link to="/dashboard/profile" className="p-4 bg-academic-800/50 hover:bg-academic-800 rounded-xl border border-academic-700 transition-all group text-center block">
                            <div className="w-10 h-10 mx-auto bg-pink-500/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                <Heart className="w-5 h-5 text-pink-400" />
                            </div>
                            <span className="text-sm font-medium text-white">Edit Profile</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default UserDashboardOverview;
