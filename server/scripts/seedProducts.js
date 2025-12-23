require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/database');

const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Sample products data
    const products = [
      // CST Products
      {
        name: 'Arduino Uno R3 Microcontroller',
        description: 'Essential microcontroller for embedded systems and IoT projects.',
        price: 899.00,
        originalPrice: 1099.00,
        image: 'https://images.unsplash.com/photo-1563770094207-f9d2520ce32c?w=500',
        category: 'CST',
        department: 'Computer Science & Technology',
        subCategory: 'Computer Components',
        rating: 4.8,
        reviews: 156,
        stock: 50
      },
      {
        name: 'Raspberry Pi 4 Model B',
        description: 'Powerful single-board computer for development and prototyping.',
        price: 3499.00,
        originalPrice: 3999.00,
        image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500',
        category: 'CST',
        department: 'Computer Science & Technology',
        subCategory: 'Computer Components',
        rating: 4.9,
        reviews: 234,
        stock: 30
      },
      {
        name: 'Intel Core i7 Processor',
        description: 'High-performance processor for advanced computing needs.',
        price: 24999.00,
        originalPrice: 27999.00,
        image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddbb56?w=500',
        category: 'CST',
        department: 'Computer Science & Technology',
        subCategory: 'Hardware',
        rating: 4.7,
        reviews: 89,
        stock: 20
      },
      {
        name: '16GB DDR4 RAM Module',
        description: 'High-speed memory module for enhanced system performance.',
        price: 3999.00,
        originalPrice: 4499.00,
        image: 'https://images.unsplash.com/photo-1562976540-5500dd9f2019?w=500',
        category: 'CST',
        department: 'Computer Science & Technology',
        subCategory: 'Hardware',
        rating: 4.6,
        reviews: 112,
        stock: 45
      },
      {
        name: 'Visual Studio Code License',
        description: 'Professional code editor for software development.',
        price: 0,
        originalPrice: 0,
        image: 'https://images.unsplash.com/photo-1599658880436-125054692c67?w=500',
        category: 'CST',
        department: 'Computer Science & Technology',
        subCategory: 'Software',
        rating: 4.9,
        reviews: 500,
        stock: 999
      },
      {
        name: 'DHT22 Temperature & Humidity Sensor',
        description: 'Digital sensor for environmental monitoring.',
        price: 299.00,
        originalPrice: 399.00,
        image: 'https://images.unsplash.com/photo-1555449382-799054481255?w=500',
        category: 'CST',
        department: 'Computer Science & Technology',
        subCategory: 'Sensors',
        rating: 4.6,
        reviews: 89,
        stock: 100
      },
      {
        name: 'Ultrasonic Distance Sensor HC-SR04',
        description: 'Ultrasonic sensor for distance measurement.',
        price: 149.00,
        originalPrice: 199.00,
        image: 'https://images.unsplash.com/photo-1555449382-799054481255?w=500',
        category: 'CST',
        department: 'Computer Science & Technology',
        subCategory: 'Sensors',
        rating: 4.7,
        reviews: 112,
        stock: 80
      },
      // Civil Products
      {
        name: 'Theodolite Surveying Instrument',
        description: 'Precision instrument for angle measurement in surveying.',
        price: 15999.00,
        originalPrice: 18999.00,
        image: 'https://images.unsplash.com/photo-1501769214405-5e5ee5125a02?w=500',
        category: 'Civil',
        department: 'Civil Technology',
        subCategory: 'Surveying Tools',
        rating: 4.7,
        reviews: 34,
        stock: 15
      },
      {
        name: 'Total Station',
        description: 'Advanced surveying equipment for accurate measurements.',
        price: 89999.00,
        originalPrice: 99999.00,
        image: 'https://images.unsplash.com/photo-1585241971714-d89047971790?w=500',
        category: 'Civil',
        department: 'Civil Technology',
        subCategory: 'Surveying Tools',
        rating: 4.9,
        reviews: 28,
        stock: 10
      },
      {
        name: 'Drafting Board Set',
        description: 'Professional drafting board for technical drawings.',
        price: 2999.00,
        originalPrice: 3499.00,
        image: 'https://images.unsplash.com/photo-1530962386121-1d54f0a28f86?w=500',
        category: 'Civil',
        department: 'Civil Technology',
        subCategory: 'Drafting Gear',
        rating: 4.5,
        reviews: 45,
        stock: 25
      },
      {
        name: 'Technical Drawing Set',
        description: 'Complete set of drafting tools and instruments.',
        price: 899.00,
        originalPrice: 1099.00,
        image: 'https://images.unsplash.com/photo-1530962386121-1d54f0a28f86?w=500',
        category: 'Civil',
        department: 'Civil Technology',
        subCategory: 'Drafting Gear',
        rating: 4.6,
        reviews: 67,
        stock: 40
      },
      {
        name: 'Cement Bag (50kg)',
        description: 'High-quality cement for construction projects.',
        price: 399.00,
        originalPrice: 449.00,
        image: 'https://images.unsplash.com/photo-1586864388991-fa6fa39f4a55?w=500',
        category: 'Civil',
        department: 'Civil Technology',
        subCategory: 'Materials',
        rating: 4.4,
        reviews: 120,
        stock: 200
      },
      {
        name: 'Steel Reinforcement Bars',
        description: 'Reinforcement bars for concrete structures.',
        price: 599.00,
        originalPrice: 699.00,
        image: 'https://images.unsplash.com/photo-1586864388991-fa6fa39f4a55?w=500',
        category: 'Civil',
        department: 'Civil Technology',
        subCategory: 'Materials',
        rating: 4.5,
        reviews: 89,
        stock: 150
      },
      // Electronics Products
      {
        name: 'Digital Multimeter Pro',
        description: 'An essential tool for electrical circuit analysis and troubleshooting.',
        price: 1299.00,
        originalPrice: 1599.00,
        image: 'https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=500',
        category: 'Electronics',
        department: 'Electronics Technology',
        subCategory: 'Testing Equipment',
        rating: 4.8,
        reviews: 67,
        stock: 35
      },
      {
        name: 'Oscilloscope 100MHz Digital',
        description: 'Advanced digital oscilloscope for waveform analysis.',
        price: 12999.00,
        originalPrice: 14999.00,
        image: 'https://images.unsplash.com/photo-1580894742597-df7bc476515f?w=500',
        category: 'Electronics',
        department: 'Electronics Technology',
        subCategory: 'Testing Equipment',
        rating: 4.9,
        reviews: 45,
        stock: 12
      },
      // RAC Products
      {
        name: 'Refrigeration Compressor Unit',
        description: 'A fundamental component for practical training in RAC systems.',
        price: 8999.00,
        originalPrice: 10999.00,
        image: 'https://images.unsplash.com/photo-1457459686225-c7b4097f5d43?w=500',
        category: 'RAC',
        department: 'Refrigeration and Air Conditioning',
        subCategory: 'RAC Components',
        rating: 4.8,
        reviews: 23,
        stock: 18
      }
    ];

    // Insert products
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
