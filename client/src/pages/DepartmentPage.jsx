import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Laptop, Building2, CircuitBoard, Snowflake, Package, ArrowLeft, ShoppingCart, Eye, Star, Heart } from 'lucide-react';
import { getProductsByDepartment } from '../services/api';

const DepartmentPage = () => {
  const { deptName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const departmentInfo = {
    CST: {
      name: 'Computer Science & Technology',
      icon: Laptop,
      description: 'Explore our comprehensive collection of computer components, microcontrollers, sensors, and development boards.',
      subCategories: ['Computer Components', 'Hardware', 'Software', 'Sensors'],
      color: 'from-navy-600 to-navy-700'
    },
    Civil: {
      name: 'Civil Technology',
      icon: Building2,
      description: 'Browse through construction materials, surveying instruments, drafting tools, and measurement equipment.',
      subCategories: ['Surveying Tools', 'Drafting Gear', 'Materials'],
      color: 'from-navy-700 to-navy-800'
    },
    Electronics: {
      name: 'Electronics Technology',
      icon: CircuitBoard,
      description: 'Discover electronic components, communication devices, circuit boards, and testing equipment.',
      subCategories: ['Components', 'Devices', 'Testing Equipment'],
      color: 'from-gold-500 to-gold-600'
    },
    RAC: {
      name: 'Refrigeration and Air Conditioning',
      icon: Snowflake,
      description: 'Find HVAC equipment, refrigeration components, air conditioning systems, and thermal management tools.',
      subCategories: ['HVAC Systems', 'RAC Components', 'Tools'],
      color: 'from-navy-500 to-gold-500'
    },
    General: {
      name: 'General Supplies',
      icon: Package,
      description: 'Browse our collection of general academic supplies, stationery, books, college uniforms, and accessories.',
      subCategories: ['Stationery', 'Books', 'Clothing', 'Accessories'],
      color: 'from-academic-500 to-academic-600'
    },
  };

  const dept = departmentInfo[deptName];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductsByDepartment(deptName, selectedSubCategory);
        setProducts(data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [deptName, selectedSubCategory]);

  const toggleLike = (productId) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    // Add to cart logic here
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };

  if (!dept) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-academic-50 dark:bg-academic-900">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-burgundy-600 dark:text-burgundy-400 mb-4">Department Not Found</h1>
          <Link to="/" className="btn-academic inline-flex items-center space-x-2">
            <ArrowLeft className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
        </div>
      </div>
    );
  }

  const Icon = dept.icon;

  return (
    <div className="min-h-screen bg-academic-50 dark:bg-academic-900">
      {/* Department Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white via-academic-50 to-white dark:from-academic-900 dark:via-academic-800 dark:to-academic-900">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-burgundy-100 dark:bg-burgundy-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Back Button */}
            <div className="flex justify-start mb-6">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 text-academic-700 dark:text-academic-300 hover:text-burgundy-600 dark:hover:text-burgundy-400 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </Link>
            </div>

            {/* Department Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className={`absolute inset-0 bg-gradient-to-br ${dept.color} rounded-full blur-2xl opacity-50`}
                />
                <div className={`relative bg-gradient-to-br ${dept.color} p-8 rounded-2xl shadow-2xl border-4 border-white/20 dark:border-navy-800/50`}>
                  <Icon className="w-20 h-20 text-white" strokeWidth={1.5} />
                </div>
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(30, 58, 138, 0.3)',
                      '0 0 40px rgba(212, 175, 55, 0.5)',
                      '0 0 20px rgba(30, 58, 138, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 rounded-2xl"
                />
              </div>
            </motion.div>

            {/* Department Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="university-header mb-6"
            >
              {dept.name}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-academic-700 dark:text-academic-300 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              {dept.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Sub-Categories Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-academic-800 border-b-2 border-academic-200 dark:border-academic-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setSelectedSubCategory(null)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedSubCategory === null
                  ? 'bg-burgundy-600 text-white shadow-lg'
                  : 'academic-card text-academic-700 dark:text-academic-300 hover:border-burgundy-500 dark:hover:border-burgundy-500 hover:text-burgundy-600 dark:hover:text-burgundy-400'
              }`}
            >
              All Products
            </button>
            {dept.subCategories.map((subCat) => (
              <button
                key={subCat}
                onClick={() => setSelectedSubCategory(subCat)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedSubCategory === subCat
                    ? 'bg-burgundy-600 text-white shadow-lg'
                    : 'academic-card text-academic-700 dark:text-academic-300 hover:border-burgundy-500 dark:hover:border-burgundy-500 hover:text-burgundy-600 dark:hover:text-burgundy-400'
                }`}
              >
                {subCat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-academic-900">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-burgundy-600"></div>
              <p className="mt-4 text-academic-700 dark:text-academic-300">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-academic-700 dark:text-academic-300">No products found in this category.</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="group relative academic-card overflow-hidden transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden bg-academic-100 dark:bg-academic-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(product.id)}
                      className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-academic-800/90 rounded-full hover:bg-white dark:hover:bg-academic-700 transition-colors z-10 shadow-md"
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          likedProducts.has(product.id)
                            ? 'text-red-500 fill-red-500'
                            : 'text-academic-400'
                        }`}
                      />
                    </button>

                    {/* Discount Badge */}
                    {product.originalPrice > product.price && (
                      <div className="absolute top-4 left-4">
                        <span className="academic-badge">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                    )}

                    {/* Quick View & Add to Cart Buttons - Show on Hover */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <motion.button
                        onClick={() => setQuickViewProduct(product)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-white/95 dark:bg-academic-800/95 text-academic-900 dark:text-academic-50 rounded-md flex items-center space-x-2 shadow-lg hover:bg-white dark:hover:bg-academic-700 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">View</span>
                      </motion.button>
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn-academic flex items-center space-x-2 text-sm"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add to Cart</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-burgundy-600 dark:text-burgundy-400 font-semibold uppercase tracking-wide">{product.subCategory || product.category}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-cream-600 fill-cream-600" />
                        <span className="text-sm text-academic-600 dark:text-academic-400 font-medium">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-academic-900 dark:text-academic-50 mb-3 group-hover:text-burgundy-600 dark:group-hover:text-burgundy-400 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-academic-600 dark:text-academic-400 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-display font-bold text-burgundy-600 dark:text-burgundy-400">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-academic-500 dark:text-academic-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setQuickViewProduct(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-academic-800 border-2 border-burgundy-200 dark:border-burgundy-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setQuickViewProduct(null)}
                className="text-academic-600 dark:text-academic-400 hover:text-burgundy-600 dark:hover:text-burgundy-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              <div className="relative h-80 md:h-auto rounded-lg overflow-hidden shadow-lg bg-academic-100 dark:bg-academic-700">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-sm text-burgundy-600 dark:text-burgundy-400 font-semibold uppercase tracking-wide mb-2 block">
                  {quickViewProduct.subCategory || quickViewProduct.category}
                </span>
                <h2 className="text-3xl font-display font-bold text-academic-900 dark:text-academic-50 mb-4">
                  {quickViewProduct.name}
                </h2>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(quickViewProduct.rating)
                            ? 'text-cream-600 fill-cream-600'
                            : 'text-academic-300 dark:text-academic-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-academic-600 dark:text-academic-400">
                    {quickViewProduct.rating} ({quickViewProduct.reviews} reviews)
                  </span>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-display font-bold text-burgundy-600 dark:text-burgundy-400">₹{quickViewProduct.price.toLocaleString()}</span>
                  {quickViewProduct.originalPrice > quickViewProduct.price && (
                    <span className="text-2xl text-academic-500 dark:text-academic-500 line-through ml-3">
                      ₹{quickViewProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-academic-700 dark:text-academic-300 mb-6">
                  {quickViewProduct.description}
                </p>
                <div className="flex gap-4">
                  <motion.button
                    onClick={() => handleAddToCart(quickViewProduct)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-academic flex-1 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </motion.button>
                  <motion.button
                    onClick={() => toggleLike(quickViewProduct.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-academic-secondary p-3 rounded-lg transition-all"
                  >
                    <Heart
                      className={`w-6 h-6 ${
                        likedProducts.has(quickViewProduct.id)
                          ? 'text-red-500 fill-red-500'
                          : 'text-burgundy-600 dark:text-burgundy-400'
                      }`}
                    />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default DepartmentPage;

