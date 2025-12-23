import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, UserPlus, Eye, EyeOff, User, GraduationCap } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

const Signup = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gradient-to-br from-navy-950/90 via-navy-900/80 to-navy-950/90 backdrop-blur-md z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-br from-white via-white to-academic-50 dark:from-navy-900 dark:via-navy-800 dark:to-navy-900 border-2 border-navy-300/30 dark:border-navy-500/50 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-gold-400/20 to-navy-400/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-navy-400/20 to-gold-400/20 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                      className="bg-gradient-to-br from-gold-500 to-gold-600 p-3 rounded-xl shadow-lg"
                    >
                      <UserPlus className="w-6 h-6 text-white" />
                    </motion.div>
                    <div>
                      <h2 className="text-3xl font-display font-bold bg-gradient-to-r from-navy-700 via-navy-600 to-navy-700 dark:from-navy-300 dark:via-navy-200 dark:to-navy-300 bg-clip-text text-transparent">
                        Create Account
                      </h2>
                      <p className="text-sm text-academic-600 dark:text-academic-400">Join our institute community</p>
                    </div>
                  </div>
                  <motion.button
                    onClick={onClose}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-academic-600 dark:text-academic-400 hover:text-navy-600 dark:hover:text-navy-400 transition-colors p-2 hover:bg-academic-100 dark:hover:bg-navy-800 rounded-lg"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800/50 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center space-x-2"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span>{error}</span>
                    </motion.div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
                      Full Name
                    </label>
                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.01 }}
                    >
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-navy-400 dark:text-navy-500 w-5 h-5" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-navy-900/50 border-2 border-navy-200 dark:border-navy-700 rounded-xl text-navy-900 dark:text-navy-100 placeholder-academic-400 dark:placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500 dark:focus:ring-navy-400 dark:focus:border-navy-400 transition-all shadow-sm hover:shadow-md"
                        placeholder="John Doe"
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
                      Email Address
                    </label>
                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.01 }}
                    >
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-navy-400 dark:text-navy-500 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-navy-900/50 border-2 border-navy-200 dark:border-navy-700 rounded-xl text-navy-900 dark:text-navy-100 placeholder-academic-400 dark:placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500 dark:focus:ring-navy-400 dark:focus:border-navy-400 transition-all shadow-sm hover:shadow-md"
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
                      Password
                    </label>
                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.01 }}
                    >
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-navy-400 dark:text-navy-500 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-navy-900/50 border-2 border-navy-200 dark:border-navy-700 rounded-xl text-navy-900 dark:text-navy-100 placeholder-academic-400 dark:placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500 dark:focus:ring-navy-400 dark:focus:border-navy-400 transition-all shadow-sm hover:shadow-md"
                        placeholder="••••••••"
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-navy-400 dark:text-navy-500 hover:text-navy-600 dark:hover:text-navy-300 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </motion.button>
                    </motion.div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-navy-700 dark:text-navy-300 mb-2">
                      Confirm Password
                    </label>
                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.01 }}
                    >
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-navy-400 dark:text-navy-500 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full pl-12 pr-12 py-3.5 bg-white dark:bg-navy-900/50 border-2 border-navy-200 dark:border-navy-700 rounded-xl text-navy-900 dark:text-navy-100 placeholder-academic-400 dark:placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-navy-500 dark:focus:ring-navy-400 dark:focus:border-navy-400 transition-all shadow-sm hover:shadow-md"
                        placeholder="••••••••"
                      />
                      <motion.button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-navy-400 dark:text-navy-500 hover:text-navy-600 dark:hover:text-navy-300 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </motion.button>
                    </motion.div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-gold-500 via-gold-600 to-gold-500 hover:from-gold-600 hover:via-gold-700 hover:to-gold-600 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <UserPlus className="w-5 h-5" />
                        <span>Create Account</span>
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-academic-600 dark:text-academic-400 text-sm">
                    Already have an account?{' '}
                    <motion.button
                      onClick={onSwitchToLogin}
                      whileHover={{ scale: 1.05 }}
                      className="text-navy-600 dark:text-navy-400 hover:text-navy-700 dark:hover:text-navy-300 font-semibold transition-colors underline decoration-2 underline-offset-2"
                    >
                      Sign In
                    </motion.button>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Signup;
