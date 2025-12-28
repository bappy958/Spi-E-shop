import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { currentUser, isAdmin, loading, refreshUserData } = useAuth();
    const location = useLocation();

    useEffect(() => {
        // Refresh user data when entering a protected route to ensure emailVerified status is up to date
        refreshUserData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-academic-50 dark:bg-academic-900 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!currentUser) {
        // Redirect them to the home page, but save the current location they were trying to go to
        // We can use this later to redirect them back after they login
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (!currentUser.emailVerified) {
        return (
            <div className="min-h-screen bg-academic-50 dark:bg-academic-900 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full bg-white dark:bg-navy-800 rounded-3xl shadow-xl p-8 text-center border-2 border-academic-200 dark:border-navy-700"
                >
                    <div className="w-16 h-16 bg-gold-100 dark:bg-navy-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gold-600 dark:text-gold-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9" />
                            <polyline points="22,6 12,13 2,6" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-display font-bold text-navy-900 dark:text-white mb-4">
                        Verify Your Email
                    </h2>
                    <p className="text-academic-600 dark:text-academic-300 mb-8">
                        Please check your inbox and verify your email address to access the dashboard.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full bg-navy-600 hover:bg-navy-700 text-white font-semibold py-3 rounded-xl transition-colors"
                    >
                        I've Verified My Email
                    </button>
                </motion.div>
            </div>
        );
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
