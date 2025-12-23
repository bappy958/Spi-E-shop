import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Ruler, CircuitBoard, Wind, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';

const Department = () => {
  const { deptName } = useParams();

  const departmentInfo = {
    CST: {
      name: 'Computer Science & Technology',
      icon: Cpu,
      description: 'Explore our comprehensive collection of computer components, microcontrollers, sensors, and development boards. Perfect for students and professionals working on embedded systems, IoT projects, and computer engineering applications.',
      products: 156,
      color: 'from-gold to-gold-600'
    },
    Civil: {
      name: 'Civil Technology',
      icon: Ruler,
      description: 'Browse through construction materials, surveying instruments, drafting tools, and measurement equipment. Essential resources for civil engineering projects, structural analysis, and construction management.',
      products: 98,
      color: 'from-royal-blue-600 to-royal-blue-700'
    },
    Electronics: {
      name: 'Electronics Technology',
      icon: CircuitBoard,
      description: 'Discover electronic components, communication devices, circuit boards, and testing equipment. Ideal for electronics engineering, telecommunications, and digital systems development.',
      products: 134,
      color: 'from-gold to-royal-blue-700'
    },
    RAC: {
      name: 'Refrigeration and air conditioning technology',
      icon: Wind,
      description: 'Find HVAC equipment, refrigeration components, air conditioning systems, and thermal management tools. Essential for refrigeration engineering and climate control applications.',
      products: 87,
      color: 'from-royal-blue-600 to-gold'
    },
  };

  const dept = departmentInfo[deptName];

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
        {/* Animated Background */}
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center mb-6"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-burgundy-200 dark:bg-burgundy-800 rounded-full blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-br from-burgundy-600 to-burgundy-700 p-6 rounded-full shadow-2xl">
                  <Icon className="w-16 h-16 text-white" />
                </div>
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

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="formal-card max-w-xs">
                <div className="text-4xl font-display font-bold text-burgundy-600 dark:text-burgundy-400 mb-2">{dept.products}+</div>
                <div className="text-academic-600 dark:text-academic-400 font-medium">Available Products</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Department Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-academic-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-academic-900 dark:text-academic-50">
              {dept.name} Products
            </h2>
            <div className="section-divider w-24 mx-auto mb-6"></div>
            <p className="text-academic-700 dark:text-academic-300 text-lg">
              Browse our curated selection of {dept.name.toLowerCase()} equipment and components
            </p>
          </motion.div>

          {/* Filtered Product Grid - You can filter products by department here */}
          <ProductGrid department={deptName} />
        </div>
      </section>
    </div>
  );
};

export default Department;

