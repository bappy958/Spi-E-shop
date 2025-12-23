import { motion } from 'framer-motion';
import { BookOpen, Award, Users, ShoppingBag, ArrowRight, School, GraduationCap, Library } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Logo from './Logo';

const HeroSection = () => {
  const [backgroundImage, setBackgroundImage] = useState('/image.png');

  // Auto-detect image from public folder
  useEffect(() => {
    const possibleImages = [
      '/image.jpg',
      '/image.png',
      '/image.jpeg',
      '/institute.png',
      '/institute.jpg',
      '/institute.jpeg',
      '/building.png',
      '/building.jpg',
      '/building.jpeg',
      '/hero-bg.png',
      '/hero-bg.jpg',
      '/hero-bg.jpeg',
    ];

    // Test which image exists by trying to load them
    const testImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(src);
        img.onerror = () => resolve(null);
        img.src = src;
      });
    };

    // Check images in order and use the first one that loads
    const findImage = async () => {
      for (const imgPath of possibleImages) {
        const result = await testImage(imgPath);
        if (result) {
          setBackgroundImage(result);
          return;
        }
      }
      // If no image found, keep default
    };

    findImage();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-academic-50 dark:bg-academic-900 overflow-hidden py-20">
      {/* Background Image with Blur and Fade */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            filter: 'blur(1px)',
            transform: 'scale(1.1)',
          }}
        />
        {/* Fade Overlay - Professional Navy Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-900/75 to-navy-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-transparent to-navy-950/85" />
        {/* Gold accent overlay for warmth and prestige */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gold-900/5 to-gold-800/10" />
        {/* Additional depth layer */}
        <div className="absolute inset-0 bg-navy-950/35" />
        
        {/* Logo Overlay with Institute Colors */}
        <div className="absolute top-8 left-8 z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -8, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.3 },
              scale: { duration: 0.6, delay: 0.3 },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              },
              rotate: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }
            }}
            className="bg-white/10 dark:bg-navy-900/40 backdrop-blur-xl border-2 border-navy-400/40 dark:border-navy-500/50 rounded-xl p-3 shadow-2xl shadow-navy-500/20"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 20px 40px rgba(30, 58, 138, 0.2)",
                  "0 20px 50px rgba(212, 175, 55, 0.3)",
                  "0 20px 40px rgba(30, 58, 138, 0.2)"
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Logo size="small" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated Background Elements (Subtle) */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-navy-600 rounded-full mix-blend-multiply filter blur-xl opacity-15 dark:opacity-25 animate-blob"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute top-40 right-10 w-72 h-72 bg-gold-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 dark:opacity-20 animate-blob"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/2 w-80 h-80 bg-navy-500 rounded-full mix-blend-multiply filter blur-2xl opacity-10 dark:opacity-15 animate-blob"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column: Text Content */}
          <div className="text-center lg:text-left">
          <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-navy-500/20 to-navy-600/30 dark:from-navy-600/30 dark:to-navy-700/40 backdrop-blur-md border-2 border-navy-400/50 dark:border-navy-500/60 text-navy-100 dark:text-navy-200 text-sm font-semibold rounded-full shadow-lg shadow-navy-500/30">
                <Award className="w-4 h-4 text-gold-400" />
                <span>Established 2006</span>
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight text-white drop-shadow-lg"
          >
              Welcome to the <span className="bg-gradient-to-r from-gold-300 via-gold-200 to-gold-300 bg-clip-text text-transparent">Spi E-shop</span>
            <br />
              <span className="text-white">Institute Store</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
              className="text-lg md:text-xl text-academic-100 dark:text-academic-200 mb-8 max-w-2xl lg:mx-0 mx-auto leading-relaxed drop-shadow-md font-serif"
          >
              Your premier destination for academic excellence and technical innovation. 
              Discover our comprehensive collection of specialized equipment, tools, and resources 
              designed to support students and faculty across all departments.
          </motion.p>

          <motion.div
            variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8"
          >
              <Link to="#products">
                <motion.button
                  className="btn-academic flex items-center space-x-2 shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Browse Products</span>
                </motion.button>
              </Link>
              <Link to="/department/CST">
                <motion.button
                  className="bg-white/10 dark:bg-navy-900/40 backdrop-blur-md border-2 border-navy-400/50 dark:border-navy-500/60 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-navy-500/20 dark:hover:bg-navy-700/40 transition-all shadow-lg hover:shadow-navy-500/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Explore Departments</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
          </motion.div>

            {/* Academic Highlights */}
          <motion.div
            variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
              <motion.div 
                className="bg-gradient-to-br from-navy-500/20 to-navy-600/30 dark:from-navy-600/30 dark:to-navy-700/40 backdrop-blur-md border-2 border-navy-400/40 dark:border-navy-500/50 rounded-lg p-3 text-center hover:border-gold-400 transition-all shadow-lg hover:shadow-gold-500/30"
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <GraduationCap className="w-6 h-6 text-gold-400 dark:text-gold-300 mx-auto mb-2" />
                <div className="text-2xl font-display font-bold text-white mb-1">587+</div>
                <div className="text-xs text-navy-100 dark:text-navy-200 font-medium">Products</div>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-navy-500/20 to-navy-600/30 dark:from-navy-600/30 dark:to-navy-700/40 backdrop-blur-md border-2 border-navy-400/40 dark:border-navy-500/50 rounded-lg p-3 text-center hover:border-gold-400 transition-all shadow-lg hover:shadow-gold-500/30"
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <School className="w-6 h-6 text-gold-400 dark:text-gold-300 mx-auto mb-2" />
                <div className="text-2xl font-display font-bold text-white mb-1">5</div>
                <div className="text-xs text-navy-100 dark:text-navy-200 font-medium">Departments</div>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-navy-500/20 to-navy-600/30 dark:from-navy-600/30 dark:to-navy-700/40 backdrop-blur-md border-2 border-navy-400/40 dark:border-navy-500/50 rounded-lg p-3 text-center hover:border-gold-400 transition-all shadow-lg hover:shadow-gold-500/30"
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <Library className="w-6 h-6 text-gold-400 dark:text-gold-300 mx-auto mb-2" />
                <div className="text-2xl font-display font-bold text-white mb-1">24/7</div>
                <div className="text-xs text-navy-100 dark:text-navy-200 font-medium">Support</div>
          </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-navy-500/20 to-navy-600/30 dark:from-navy-600/30 dark:to-navy-700/40 backdrop-blur-md border-2 border-navy-400/40 dark:border-navy-500/50 rounded-lg p-3 text-center hover:border-gold-400 transition-all shadow-lg hover:shadow-gold-500/30"
                whileHover={{ scale: 1.05, y: -3 }}
              >
                <Award className="w-6 h-6 text-gold-400 dark:text-gold-300 mx-auto mb-2" />
                <div className="text-2xl font-display font-bold text-white mb-1">100%</div>
                <div className="text-xs text-navy-100 dark:text-navy-200 font-medium">Quality</div>
          </motion.div>
        </motion.div>
      </div>

          {/* Right Column: Image/Illustration or Stats */}
          <motion.div
            variants={fadeInUp}
            className="relative flex justify-center lg:justify-end mt-12 lg:mt-0"
          >
            <div className="relative bg-gradient-to-br from-navy-800/50 via-navy-900/60 to-navy-800/50 dark:from-navy-800/60 dark:via-navy-900/70 dark:to-navy-800/60 backdrop-blur-2xl border-2 border-navy-400/40 dark:border-navy-500/50 p-8 md:p-10 rounded-3xl shadow-2xl shadow-navy-500/20 w-full max-w-md text-center overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <motion.div
                  className="flex justify-center mb-6"
                  animate={floatingAnimation}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-navy-600 rounded-full blur-2xl opacity-40 animate-pulse" />
                    <div className="absolute inset-0 bg-gold-400 rounded-full blur-xl opacity-30" />
                    <div className="relative bg-gradient-to-br from-navy-600 via-navy-700 to-navy-800 p-6 rounded-full shadow-2xl shadow-navy-500/50 border-2 border-gold-400/50">
                      <GraduationCap className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </motion.div>

                <h3 className="text-3xl font-display font-bold text-white mb-4 drop-shadow-lg bg-gradient-to-r from-gold-300 to-gold-200 bg-clip-text text-transparent">
                  Academic Excellence
                </h3>
                <p className="text-navy-100 dark:text-navy-200 mb-6 drop-shadow-md font-serif leading-relaxed">
                  Empowering your educational journey with premium-quality equipment, 
                  cutting-edge technology, and comprehensive support services.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <motion.div
                    className="bg-gradient-to-br from-navy-700/50 to-navy-800/60 dark:from-navy-700/60 dark:to-navy-800/70 backdrop-blur-xl border-2 border-navy-400/40 dark:border-navy-500/50 p-4 rounded-xl border-l-4 border-gold-400 hover:border-gold-300 transition-all shadow-lg"
                    whileHover={{ scale: 1.05, y: -3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="text-3xl font-display font-bold text-gold-300 mb-1">587+</div>
                    <div className="text-navy-100 dark:text-navy-200 text-sm font-medium">Products</div>
                  </motion.div>
      <motion.div
                    className="bg-gradient-to-br from-navy-700/50 to-navy-800/60 dark:from-navy-700/60 dark:to-navy-800/70 backdrop-blur-xl border-2 border-navy-400/40 dark:border-navy-500/50 p-4 rounded-xl border-l-4 border-gold-400 hover:border-gold-300 transition-all shadow-lg"
                    whileHover={{ scale: 1.05, y: -3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="text-3xl font-display font-bold text-gold-300 mb-1">5</div>
                    <div className="text-navy-100 dark:text-navy-200 text-sm font-medium">Departments</div>
                  </motion.div>
        <motion.div
                    className="bg-gradient-to-br from-navy-700/50 to-navy-800/60 dark:from-navy-700/60 dark:to-navy-800/70 backdrop-blur-xl border-2 border-navy-400/40 dark:border-navy-500/50 p-4 rounded-xl border-l-4 border-gold-400 hover:border-gold-300 transition-all shadow-lg"
                    whileHover={{ scale: 1.05, y: -3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="text-3xl font-display font-bold text-gold-300 mb-1">24/7</div>
                    <div className="text-navy-100 dark:text-navy-200 text-sm font-medium">Support</div>
                  </motion.div>
          <motion.div
                    className="bg-gradient-to-br from-navy-700/50 to-navy-800/60 dark:from-navy-700/60 dark:to-navy-800/70 backdrop-blur-xl border-2 border-navy-400/40 dark:border-navy-500/50 p-4 rounded-xl border-l-4 border-gold-400 hover:border-gold-300 transition-all shadow-lg"
                    whileHover={{ scale: 1.05, y: -3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="text-3xl font-display font-bold text-gold-300 mb-1">100%</div>
                    <div className="text-navy-100 dark:text-navy-200 text-sm font-medium">Quality</div>
                  </motion.div>
                </div>
              </div>
            </div>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
