import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const MyCart = () => {
    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-navy-800 rounded-3xl p-8 shadow-xl border border-academic-200 dark:border-navy-700 text-center"
            >
                <div className="w-20 h-20 bg-purple-100 dark:bg-navy-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingCart className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-3xl font-display font-bold text-navy-900 dark:text-white mb-4">
                    My Cart
                </h2>
                <p className="text-academic-600 dark:text-academic-300">
                    Your shopping cart is currently empty. Start adding items to see them here!
                </p>
                <button className="mt-8 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors">
                    Browse Products
                </button>
            </motion.div>
        </div>
    );
};

export default MyCart;
