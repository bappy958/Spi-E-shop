import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';

const SuggestionList = () => {
    return (
        <div className="p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <div className="bg-white dark:bg-navy-800 rounded-3xl p-8 shadow-xl border border-academic-200 dark:border-navy-700">
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="p-3 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl shadow-lg">
                            <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-display font-bold text-navy-900 dark:text-white">
                                Suggestion Box
                            </h2>
                            <p className="text-academic-600 dark:text-academic-300">
                                Help us improve by sharing your ideas and suggestions.
                            </p>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
                                Topic
                            </label>
                            <input
                                type="text"
                                placeholder="E.g., New Product Request"
                                className="w-full px-4 py-3 bg-academic-50 dark:bg-navy-900/50 border border-academic-200 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
                                Description
                            </label>
                            <textarea
                                rows="5"
                                placeholder="Describe your suggestion in detail..."
                                className="w-full px-4 py-3 bg-academic-50 dark:bg-navy-900/50 border border-academic-200 dark:border-navy-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                            >
                                <Send className="w-5 h-5" />
                                <span>Submit Suggestion</span>
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default SuggestionList;
