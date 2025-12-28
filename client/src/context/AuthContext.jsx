import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/firebase';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Debug: Check if config is present
        // console.log('Auth Context Init. Configured:', !!auth);

        if (!auth) {
            console.error('Firebase Auth not initialized');
            setLoading(false);
            return;
        }

        // Timeout fallback in case Firebase hangs
        const timer = setTimeout(() => {
            console.warn('Firebase auth listener timed out - forcing app load');
            setLoading(false);
        }, 5000);

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            clearTimeout(timer);
            // console.log('Auth State Changed:', user ? 'User logged in' : 'No user');
            setCurrentUser(user);
            // Simple email-based admin check
            setIsAdmin(user?.email === 'bappy958@gmail.com');
            setLoading(false);
        });

        return () => {
            clearTimeout(timer);
            unsubscribe();
        };
    }, []);

    const logout = () => {
        return signOut(auth);
    };

    const updateUserProfile = async (data) => {
        if (!auth.currentUser) throw new Error('No user logged in');
        await updateProfile(auth.currentUser, data);
        await refreshUserData();
    };

    const refreshUserData = async () => {
        if (auth.currentUser) {
            await auth.currentUser.reload();
            setCurrentUser({ ...auth.currentUser });
        }
    };

    const value = {
        currentUser,
        isAdmin,
        logout,
        updateUserProfile,
        refreshUserData,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            <AuthContext.Provider value={value}>
                {loading ? (
                    <div className="min-h-screen bg-academic-900 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    children
                )}
            </AuthContext.Provider>
        </AuthContext.Provider>
    );
};
