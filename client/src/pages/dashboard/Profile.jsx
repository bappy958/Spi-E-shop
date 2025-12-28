import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, ShieldCheck, Calendar, MapPin, Phone, GraduationCap, Camera, Check, X, Loader2 } from 'lucide-react';

const Profile = () => {
    const { currentUser, updateUserProfile } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(currentUser?.displayName || '');
    const [newPhotoURL, setNewPhotoURL] = useState(currentUser?.photoURL || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    if (!currentUser) {
        return (
            <div className="p-6 text-center text-academic-500">
                <p>Please log in to view your profile.</p>
            </div>
        );
    }

    const handleSave = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await updateUserProfile({
                displayName: newName,
                photoURL: newPhotoURL
            });
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setNewName(currentUser.displayName || '');
        setNewPhotoURL(currentUser.photoURL || '');
        setIsEditing(false);
        setError('');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-academic-800 rounded-2xl shadow-xl overflow-hidden"
            >
                {/* Profile Header Background */}
                <div className="h-48 bg-gradient-to-r from-burgundy-600 via-navy-700 to-burgundy-600 relative">
                    <div className="absolute -bottom-16 left-8">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-2xl border-4 border-white dark:border-academic-800 overflow-hidden shadow-lg bg-white">
                                <img
                                    src={isEditing ? (newPhotoURL || `https://ui-avatars.com/api/?name=${currentUser.email}&background=random`) : (currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email}&background=random`)}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                                {isEditing && (
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Camera className="w-8 h-8 text-white" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Content */}
                <div className="pt-20 px-8 pb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div className="flex-1">
                            {isEditing ? (
                                <div className="space-y-4 max-w-md">
                                    <div>
                                        <label className="block text-xs font-bold text-academic-500 uppercase mb-1">Display Name</label>
                                        <input
                                            type="text"
                                            value={newName}
                                            onChange={(e) => setNewName(e.target.value)}
                                            className="w-full px-4 py-2 bg-academic-50 dark:bg-academic-900 border border-academic-200 dark:border-academic-700 rounded-lg focus:ring-2 focus:ring-burgundy-500 outline-none text-academic-900 dark:text-academic-50"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-academic-500 uppercase mb-1">Avatar URL</label>
                                        <input
                                            type="text"
                                            value={newPhotoURL}
                                            onChange={(e) => setNewPhotoURL(e.target.value)}
                                            className="w-full px-4 py-2 bg-academic-50 dark:bg-academic-900 border border-academic-200 dark:border-academic-700 rounded-lg focus:ring-2 focus:ring-burgundy-500 outline-none text-academic-900 dark:text-academic-50 text-sm"
                                            placeholder="https://example.com/photo.jpg"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-display font-bold text-academic-900 dark:text-academic-50 capitalize">
                                        {currentUser.displayName || currentUser.email.split('@')[0]}
                                    </h1>
                                    <p className="text-academic-500 font-medium">Satkhira Polytechnic Institute Student</p>
                                </>
                            )}
                        </div>

                        <div className="flex gap-3">
                            {isEditing ? (
                                <>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSave}
                                        disabled={loading}
                                        className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                                        Save Changes
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleCancel}
                                        className="px-6 py-2.5 bg-academic-200 dark:bg-academic-700 text-academic-700 dark:text-academic-200 rounded-xl font-semibold transition-all flex items-center gap-2"
                                    >
                                        <X className="w-5 h-5" />
                                        Cancel
                                    </motion.button>
                                </>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsEditing(true)}
                                    className="px-6 py-2.5 bg-burgundy-600 hover:bg-burgundy-700 text-white rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2"
                                >
                                    <User className="w-5 h-5" />
                                    Edit Profile
                                </motion.button>
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium flex items-center gap-2"
                            >
                                <X className="w-5 h-5" />
                                {error}
                            </motion.div>
                        )}
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl text-sm font-medium flex items-center gap-2"
                            >
                                <Check className="w-5 h-5" />
                                {success}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Info */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-academic-800 dark:text-academic-200 flex items-center gap-2">
                                <User className="w-5 h-5 text-burgundy-500" />
                                Personal Information
                            </h3>

                            <div className="grid gap-4">
                                <InfoItem icon={Mail} label="Email Address" value={currentUser.email} />
                                <InfoItem icon={ShieldCheck} label="Account Status" value={currentUser.emailVerified ? 'Verified' : 'Unverified'} status={currentUser.emailVerified} />
                                <InfoItem icon={Calendar} label="Join Date" value={new Date(currentUser.metadata.creationTime).toLocaleDateString()} />
                            </div>
                        </div>

                        {/* Academic Info */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-academic-800 dark:text-academic-200 flex items-center gap-2">
                                <GraduationCap className="w-5 h-5 text-burgundy-500" />
                                Academic Details
                            </h3>

                            <div className="grid gap-4">
                                <InfoItem icon={MapPin} label="Institute" value="Satkhira Polytechnic institute" />
                                <InfoItem icon={Phone} label="Department" value="Computer Science & Technology" />
                            </div>
                        </div>
                    </div>

                    {/* Order History Placeholder */}
                    <div className="mt-12">
                        <h3 className="text-xl font-bold text-academic-900 dark:text-academic-50 mb-4">Recent Activity</h3>
                        <div className="bg-academic-50 dark:bg-academic-900/50 rounded-xl p-8 border-2 border-dashed border-academic-200 dark:border-academic-700 text-center text-academic-500 font-medium">
                            No recent activity found. Start exploring products!
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const InfoItem = ({ icon: Icon, label, value, status }) => (
    <div className="flex items-center gap-4 p-4 bg-academic-50 dark:bg-academic-900/50 rounded-xl border border-academic-100 dark:border-academic-800">
        <div className="p-2 bg-white dark:bg-academic-800 rounded-lg shadow-sm">
            <Icon className="w-4 h-4 text-burgundy-500" />
        </div>
        <div>
            <p className="text-xs text-academic-500 font-bold uppercase tracking-wider">{label}</p>
            <p className={`text-sm font-semibold truncate ${label === 'Account Status' ? (status ? 'text-green-600' : 'text-red-500') : 'text-academic-900 dark:text-academic-100'}`}>
                {value}
            </p>
        </div>
    </div>
);

export default Profile;
