
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { productService } from '../../services';
import { Package, Filter, Plus, Search, MoreVertical, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await productService.fetchProducts();
            setProducts(response.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load products. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-academic-800 rounded-xl border border-gray-200 dark:border-academic-700 mt-6">
                <div className="bg-red-500/10 p-4 rounded-full mb-4">
                    <AlertCircle className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Something went wrong</h3>
                <p className="text-gray-600 dark:text-academic-400 mb-6">{error}</p>
                <button
                    onClick={loadProducts}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white font-display">Products</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your inventory</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-academic-800 border border-gray-200 dark:border-academic-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-academic-700 transition-colors">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                    <Link to="/dashboard/products/add" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                        <Plus className="w-4 h-4" />
                        Add Product
                    </Link>
                </div>
            </div>

            <div className="bg-white dark:bg-academic-800 rounded-xl border border-gray-200 dark:border-academic-700 shadow-sm overflow-hidden">
                {/* Table Header Filter */}
                <div className="p-4 border-b border-gray-200 dark:border-academic-700 flex justify-between items-center bg-gray-50/50 dark:bg-academic-800">
                    <div className="relative max-w-sm w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-9 pr-4 py-2 bg-white dark:bg-academic-900 border border-gray-200 dark:border-academic-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="p-12 flex justify-center">
                        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-academic-700 text-xs uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-academic-900/50">
                                    <th className="px-6 py-4 font-semibold">Product Name</th>
                                    <th className="px-6 py-4 font-semibold">Category</th>
                                    <th className="px-6 py-4 font-semibold">Price</th>
                                    <th className="px-6 py-4 font-semibold">Stock</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-academic-700">
                                {products.map((product, index) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50 dark:hover:bg-academic-700/50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">
                                                    <Package className="w-5 h-5" />
                                                </div>
                                                {product.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {product.category}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                            ${product.price.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                            {product.stock} units
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline - flex items - center gap - 1.5 px - 2.5 py - 0.5 rounded - full text - xs font - medium capitalize
                            ${product.status === 'in_stock' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                                                    product.status === 'low_stock' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                                                        'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                                }
`}>
                                                {product.status === 'low_stock' && <AlertCircle className="w-3 h-3" />}
                                                {product.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
