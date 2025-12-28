import React from 'react';
import { motion } from 'framer-motion';
import { Package, Clock } from 'lucide-react';

const MyOrders = () => {
    // Mock data
    const orders = [
        { id: '#ORD-7829', date: 'Oct 24, 2023', status: 'Delivered', total: '$120.00', items: 3 },
        { id: '#ORD-7830', date: 'Nov 02, 2023', status: 'Processing', total: '$45.50', items: 1 },
    ];

    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-navy-800 rounded-3xl shadow-xl border border-academic-200 dark:border-navy-700 overflow-hidden"
            >
                <div className="p-6 border-b border-academic-200 dark:border-navy-700 flex justify-between items-center">
                    <h2 className="text-2xl font-display font-bold text-navy-900 dark:text-white flex items-center gap-3">
                        <Package className="w-6 h-6 text-purple-600" />
                        My Orders
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-academic-50 dark:bg-navy-900/50">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-academic-600 dark:text-academic-400">Order ID</th>
                                <th className="p-4 text-sm font-semibold text-academic-600 dark:text-academic-400">Date</th>
                                <th className="p-4 text-sm font-semibold text-academic-600 dark:text-academic-400">Status</th>
                                <th className="p-4 text-sm font-semibold text-academic-600 dark:text-academic-400">Total</th>
                                <th className="p-4 text-sm font-semibold text-academic-600 dark:text-academic-400">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-academic-200 dark:divide-navy-700">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-academic-50 dark:hover:bg-navy-700/50 transition-colors">
                                    <td className="p-4 font-medium text-navy-900 dark:text-white">{order.id}</td>
                                    <td className="p-4 text-academic-600 dark:text-academic-300 flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {order.date}
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Delivered'
                                                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 font-semibold text-navy-900 dark:text-white">{order.total}</td>
                                    <td className="p-4">
                                        <button className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-semibold text-sm">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default MyOrders;
