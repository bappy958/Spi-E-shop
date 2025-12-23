import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, RefreshCw, AlertCircle, User, Mail, Phone, Calendar, MoreVertical } from 'lucide-react';
import { customerService } from '../../services';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchCustomers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await customerService.fetchCustomers();
            setCustomers(response.data);
        } catch (err) {
            console.error("Failed to load customers:", err);
            setError("Failed to load customers. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Filter logic
    const filteredCustomers = customers.filter(customer => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-academic-800 rounded-xl border border-academic-700">
                <div className="bg-red-500/10 p-4 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Something went wrong</h3>
                <p className="text-academic-400 mb-6">{error}</p>
                <button
                    onClick={fetchCustomers}
                    className="px-4 py-2 bg-academic-600 hover:bg-academic-500 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Customers</h1>
                    <p className="text-academic-400">Manage your user base and view customer details</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 bg-academic-800 p-4 rounded-xl border border-academic-700">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-academic-400" />
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-academic-900 text-white pl-10 pr-4 py-2 rounded-lg border border-academic-700 focus:outline-none focus:border-technical-500"
                    />
                </div>
                <div className="flex gap-4">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-academic-900 text-white px-4 py-2 rounded-lg border border-academic-700 focus:outline-none focus:border-technical-500"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="suspended">Suspended</option>
                    </select>
                    <button
                        onClick={fetchCustomers}
                        className="p-2 bg-academic-700 hover:bg-academic-600 text-academic-300 rounded-lg transition-colors"
                    >
                        <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="bg-academic-800 rounded-xl border border-academic-700 overflow-hidden">
                    {/* Skeleton Header */}
                    <div className="h-12 bg-academic-700/50 animate-pulse border-b border-academic-700" />
                    {/* Skeleton Rows */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-16 border-b border-academic-700/50 p-4 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-academic-700 animate-pulse" />
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-32 bg-academic-700 animate-pulse rounded" />
                                <div className="h-3 w-24 bg-academic-700/50 animate-pulse rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredCustomers.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center bg-academic-800 rounded-xl border border-academic-700">
                    <User className="w-16 h-16 text-academic-600 mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No customers found</h3>
                    <p className="text-academic-400">
                        {searchTerm ? `No results matching "${searchTerm}"` : "Your customer list is empty."}
                    </p>
                </div>
            ) : (
                <div className="bg-academic-800 rounded-xl border border-academic-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-academic-700 bg-academic-800/50">
                                    <th className="p-4 text-academic-400 font-medium">Customer</th>
                                    <th className="p-4 text-academic-400 font-medium hidden md:table-cell">Role</th>
                                    <th className="p-4 text-academic-400 font-medium">Status</th>
                                    <th className="p-4 text-academic-400 font-medium hidden sm:table-cell">Joined</th>
                                    <th className="p-4 text-academic-400 font-medium text-center">Orders</th>
                                    <th className="p-4 text-academic-400 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-academic-700">
                                <AnimatePresence>
                                    {filteredCustomers.map((customer) => (
                                        <motion.tr
                                            key={customer.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="group hover:bg-academic-700/30 transition-colors"
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-academic-700 flex items-center justify-center text-technical-400 font-bold border border-academic-600">
                                                        {customer.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-white">{customer.name}</div>
                                                        <div className="text-sm text-academic-400">{customer.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 hidden md:table-cell">
                                                <span className="px-2 py-1 rounded text-xs font-medium bg-academic-700 text-academic-300 border border-academic-600">
                                                    {customer.role}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${customer.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                        customer.status === 'inactive' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                                                            'bg-red-500/10 text-red-400 border-red-500/20'
                                                    }`}>
                                                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="p-4 hidden sm:table-cell text-academic-400">
                                                {new Date(customer.joinDate).toLocaleDateString()}
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="text-white font-medium">{customer.orders}</span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="p-2 text-academic-400 hover:text-white hover:bg-academic-700 rounded-lg transition-colors">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
