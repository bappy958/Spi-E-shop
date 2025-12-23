import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Eye, Star, Heart } from 'lucide-react';

const ProductGrid = ({ department }) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState(new Set());

  // Institute product data
  const allProducts = [
    {
      id: 1,
      name: 'Arduino Uno R3 Microcontroller',
      price: 899.00,
      originalPrice: 1099.00,
      rating: 4.8,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1563770094207-f9d2520ce32c?w=500',
      category: 'CST',
      department: 'Computer Science & Technology'
    },
    {
      id: 2,
      name: 'Raspberry Pi 4 Model B',
      price: 3499.00,
      originalPrice: 3999.00,
      rating: 4.9,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500',
      category: 'CST',
      department: 'Computer Science & Technology'
    },
    {
      id: 3,
      name: 'DHT22 Temperature & Humidity Sensor',
      price: 299.00,
      originalPrice: 399.00,
      rating: 4.6,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1555449382-799054481255?w=500',
      category: 'CST',
      department: 'Computer Science & Technology'
    },
    {
      id: 4,
      name: 'Ultrasonic Distance Sensor HC-SR04',
      price: 149.00,
      originalPrice: 199.00,
      rating: 4.7,
      reviews: 112,
      image: 'https://images.unsplash.com/photo-1555449382-799054481255?w=500',
      category: 'CST',
      department: 'Computer Science & Technology'
    },
    {
      id: 5,
      name: 'Digital Multimeter Pro',
      price: 1299.00,
      originalPrice: 1599.00,
      rating: 4.8,
      reviews: 67,
      image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=500',
      category: 'Electronics',
      department: 'Electronics Technology'
    },
    {
      id: 6,
      name: 'Oscilloscope 100MHz Digital',
      price: 12999.00,
      originalPrice: 14999.00,
      rating: 4.9,
      reviews: 45,
      image: 'https://images.unsplash.com/photo-1580894742597-df7bc476515f?w=500',
      category: 'Electronics',
      department: 'Electronics Technology'
    },
    {
      id: 7,
      name: 'Theodolite Surveying Instrument',
      price: 15999.00,
      originalPrice: 18999.00,
      rating: 4.7,
      reviews: 34,
      image: 'https://images.unsplash.com/photo-1501769214405-5e5ee5125a02?w=500',
      category: 'Civil',
      department: 'Civil Technology'
    },
    {
      id: 8,
      name: 'Refrigeration Compressor Unit',
      price: 8999.00,
      originalPrice: 10999.00,
      rating: 4.8,
      reviews: 23,
      image: 'https://images.unsplash.com/photo-1457459686225-c7b4097f5d43?w=500',
      category: 'RAC',
      department: 'Refrigeration and Air Conditioning'
    },
  ];

  // Filter products by department if provided
  const products = department
    ? allProducts.filter(product => product.category === department)
    : allProducts;

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

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-academic-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-academic-900 dark:text-academic-50">
            Department Products
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-lg text-academic-700 dark:text-academic-300 max-w-2xl mx-auto">
            Explore equipment and components for all institute departments
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{
                y: -5,
                transition: { duration: 0.3 }
              }}
              className="group relative academic-card overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-academic-100 dark:bg-academic-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Discount Badge */}
                <div className="absolute top-4 left-4">
                  <span className="academic-badge">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>

                {/* Like Button */}
                <motion.button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-academic-800/90 rounded-full hover:bg-white dark:hover:bg-academic-700 transition-colors z-10 shadow-md"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Heart
                    className={`w-5 h-5 transition-colors ${likedProducts.has(product.id)
                        ? 'text-burgundy-600 fill-burgundy-600'
                        : 'text-academic-400'
                      }`}
                  />
                </motion.button>

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
                  <span className="text-xs text-burgundy-600 dark:text-burgundy-400 font-semibold uppercase tracking-wide">
                    {product.category}
                  </span>
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
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-display font-bold text-burgundy-600 dark:text-burgundy-400">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-academic-500 dark:text-academic-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-academic-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-burgundy-200 dark:border-burgundy-700 shadow-2xl"
              >
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="relative h-96 rounded-xl overflow-hidden bg-academic-100 dark:bg-academic-700">
                    <img
                      src={quickViewProduct.image}
                      alt={quickViewProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="text-3xl font-display font-bold text-academic-900 dark:text-academic-50 mb-4">
                      {quickViewProduct.name}
                    </h2>
                    <div className="mb-2">
                      <span className="text-sm text-burgundy-600 dark:text-burgundy-400 font-semibold uppercase tracking-wide">{quickViewProduct.category} - {quickViewProduct.department}</span>
                    </div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < Math.floor(quickViewProduct.rating)
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
                      <span className="text-2xl text-academic-500 dark:text-academic-500 line-through ml-3">
                        ₹{quickViewProduct.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-academic-700 dark:text-academic-300 mb-6">
                      High-quality equipment for {quickViewProduct.department}. Perfect for laboratory experiments and academic projects.
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
                      <button
                        onClick={() => setQuickViewProduct(null)}
                        className="btn-academic-secondary px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductGrid;

