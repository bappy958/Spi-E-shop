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
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            // Simple email-based admin check
            setIsAdmin(user?.email === 'bappy958@gmail.com');
            setLoading(false);
        });

        return unsubscribe;
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
            {!loading && children}
        </AuthContext.Provider>
    );
};
