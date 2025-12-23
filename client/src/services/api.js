import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch products by department
export const getProductsByDepartment = async (deptName, subCategory = null) => {
  try {
    const params = { dept: deptName }; // Use 'dept' parameter as per backend API
    if (subCategory) {
      params.subCategory = subCategory;
    }
    const response = await api.get('/products', { params });
    
    // Backend returns { success: true, products: [...], pagination: {...} }
    if (response.data.success && response.data.products) {
      return {
        products: response.data.products,
        total: response.data.pagination?.total || response.data.products.length
      };
    }
    
    return { products: [], total: 0 };
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return mock data if backend is not available
    return getMockProducts(deptName, subCategory);
  }
};

// Mock data for development (fallback when backend is not available)
const getMockProducts = (deptName, subCategory = null) => {
  const allMockProducts = {
    CST: [
      {
        id: 1,
        name: 'Arduino Uno R3 Microcontroller',
        price: 899.00,
        originalPrice: 1099.00,
        rating: 4.8,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop',
        category: 'CST',
        subCategory: 'Computer Components',
        department: 'Computer Science & Technology',
        description: 'Essential microcontroller board for embedded systems and IoT projects. Perfect for students learning programming and electronics.'
      },
      {
        id: 2,
        name: 'Raspberry Pi 4 Model B (8GB)',
        price: 3499.00,
        originalPrice: 3999.00,
        rating: 4.9,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop',
        category: 'CST',
        subCategory: 'Computer Components',
        department: 'Computer Science & Technology',
        description: 'Powerful single-board computer with 8GB RAM for development, prototyping, and educational projects.'
      },
      {
        id: 3,
        name: 'Intel Core i7-12700K Processor',
        price: 24999.00,
        originalPrice: 27999.00,
        rating: 4.7,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop',
        category: 'CST',
        subCategory: 'Hardware',
        department: 'Computer Science & Technology',
        description: 'High-performance 12th generation processor with 12 cores for advanced computing and programming tasks.'
      },
      {
        id: 4,
        name: '16GB DDR4 RAM Module (3200MHz)',
        price: 3999.00,
        originalPrice: 4499.00,
        rating: 4.6,
        reviews: 112,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop',
        category: 'CST',
        subCategory: 'Hardware',
        department: 'Computer Science & Technology',
        description: 'High-speed DDR4 memory module for enhanced system performance and multitasking capabilities.'
      },
      {
        id: 5,
        name: 'NVIDIA GeForce RTX 3060 Graphics Card',
        price: 32999.00,
        originalPrice: 36999.00,
        rating: 4.8,
        reviews: 145,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop',
        category: 'CST',
        subCategory: 'Hardware',
        department: 'Computer Science & Technology',
        description: 'Powerful graphics card for gaming, video editing, and GPU-accelerated computing applications.'
      },
      {
        id: 6,
        name: '500GB NVMe SSD (Samsung 980)',
        price: 4999.00,
        originalPrice: 5999.00,
        rating: 4.9,
        reviews: 201,
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop',
        category: 'CST',
        subCategory: 'Hardware',
        department: 'Computer Science & Technology',
        description: 'Ultra-fast NVMe solid-state drive for lightning-quick boot times and data access.'
      },
      {
        id: 7,
        name: 'Visual Studio Code Professional License',
        price: 0,
        originalPrice: 0,
        rating: 4.9,
        reviews: 500,
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=500&fit=crop',
        category: 'CST',
        subCategory: 'Software',
        department: 'Computer Science & Technology',
        description: 'Professional code editor with extensive extensions for software development and programming.'
      },
      {
        id: 8,
        name: 'DHT22 Temperature & Humidity Sensor',
        price: 299.00,
        originalPrice: 399.00,
        rating: 4.6,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'CST',
        subCategory: 'Sensors',
        department: 'Computer Science & Technology',
        description: 'Digital temperature and humidity sensor with high accuracy for environmental monitoring projects.'
      },
      {
        id: 9,
        name: 'Ultrasonic Distance Sensor HC-SR04',
        price: 149.00,
        originalPrice: 199.00,
        rating: 4.7,
        reviews: 112,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'CST',
        subCategory: 'Sensors',
        department: 'Computer Science & Technology',
        description: 'Ultrasonic sensor for distance measurement from 2cm to 400cm, ideal for robotics projects.'
      },
      {
        id: 10,
        name: 'PIR Motion Sensor Module',
        price: 199.00,
        originalPrice: 249.00,
        rating: 4.5,
        reviews: 78,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'CST',
        subCategory: 'Sensors',
        department: 'Computer Science & Technology',
        description: 'Passive infrared motion detection sensor for security systems and automation projects.'
      },
      {
        id: 11,
        name: 'ESP32 Development Board',
        price: 599.00,
        originalPrice: 799.00,
        rating: 4.8,
        reviews: 167,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop',
        category: 'CST',
        subCategory: 'Computer Components',
        department: 'Computer Science & Technology',
        description: 'WiFi and Bluetooth enabled microcontroller for IoT applications and wireless projects.'
      },
      {
        id: 12,
        name: 'RGB LED Strip (5m)',
        price: 899.00,
        originalPrice: 1199.00,
        rating: 4.4,
        reviews: 95,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'CST',
        subCategory: 'Hardware',
        department: 'Computer Science & Technology',
        description: 'Addressable RGB LED strip with 300 LEDs for creative lighting projects and displays.'
      },
    ],
    Civil: [
      {
        id: 13,
        name: 'Digital Theodolite Surveying Instrument',
        price: 15999.00,
        originalPrice: 18999.00,
        rating: 4.7,
        reviews: 34,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=500&fit=crop',
        category: 'Civil',
        subCategory: 'Surveying Tools',
        department: 'Civil Technology',
        description: 'Precision digital theodolite for accurate angle measurement in surveying and construction projects.'
      },
      {
        id: 14,
        name: 'Total Station (Electronic)',
        price: 89999.00,
        originalPrice: 99999.00,
        rating: 4.9,
        reviews: 28,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=500&fit=crop',
        category: 'Civil',
        subCategory: 'Surveying Tools',
        department: 'Civil Technology',
        description: 'Advanced electronic total station with laser distance measurement for professional surveying.'
      },
      {
        id: 15,
        name: 'Auto Level Surveying Instrument',
        price: 12999.00,
        originalPrice: 14999.00,
        rating: 4.6,
        reviews: 42,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=500&fit=crop',
        category: 'Civil',
        subCategory: 'Surveying Tools',
        department: 'Civil Technology',
        description: 'Automatic leveling instrument for precise height measurement in construction and surveying.'
      },
      {
        id: 16,
        name: 'Measuring Tape (50m)',
        price: 899.00,
        originalPrice: 1099.00,
        rating: 4.5,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500&h=500&fit=crop',
        category: 'Civil',
        subCategory: 'Surveying Tools',
        department: 'Civil Technology',
        description: 'Professional-grade steel measuring tape with 50-meter length for construction measurements.'
      },
      {
        id: 17,
        name: 'Drafting Board Set (A1 Size)',
        price: 2999.00,
        originalPrice: 3499.00,
        rating: 4.5,
        reviews: 45,
        image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500&h=500&fit=crop',
        category: 'Civil',
        subCategory: 'Drafting Gear',
        department: 'Civil Technology',
        description: 'Professional drafting board with parallel bar for technical drawings and architectural plans.'
      },
      {
        id: 18,
        name: 'Technical Drawing Set (12 Pieces)',
        price: 899.00,
        originalPrice: 1099.00,
        rating: 4.6,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500&h=500&fit=crop',
        category: 'Civil',
        subCategory: 'Drafting Gear',
        department: 'Civil Technology',
        description: 'Complete set of drafting tools including compass, protractor, rulers, and templates.'
      },
      {
        id: 19,
        name: 'T-Square (60cm)',
        price: 499.00,
        originalPrice: 699.00,
        rating: 4.4,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=500&h=500&fit=crop',
        category: 'Civil',
        subCategory: 'Drafting Gear',
        department: 'Civil Technology',
        description: 'Precision T-square for drawing parallel lines and right angles in technical drawings.'
      },
      {
        id: 20,
        name: 'Portland Cement (50kg Bag)',
        price: 399.00,
        originalPrice: 449.00,
        rating: 4.4,
        reviews: 120,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Civil',
        subCategory: 'Materials',
        department: 'Civil Technology',
        description: 'High-quality Portland cement for construction projects, concrete mixing, and masonry work.'
      },
      {
        id: 21,
        name: 'Steel Reinforcement Bars (12mm)',
        price: 599.00,
        originalPrice: 699.00,
        rating: 4.5,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Civil',
        subCategory: 'Materials',
        department: 'Civil Technology',
        description: 'High-tensile steel reinforcement bars for concrete structures and construction projects.'
      },
      {
        id: 22,
        name: 'Coarse Aggregate (20mm)',
        price: 299.00,
        originalPrice: 349.00,
        rating: 4.3,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Civil',
        subCategory: 'Materials',
        department: 'Civil Technology',
        description: 'Crushed stone aggregate for concrete mixing and construction applications.'
      },
      {
        id: 23,
        name: 'Sand (Fine Aggregate)',
        price: 249.00,
        originalPrice: 299.00,
        rating: 4.3,
        reviews: 78,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Civil',
        subCategory: 'Materials',
        department: 'Civil Technology',
        description: 'Fine sand for concrete mixing, plastering, and construction applications.'
      },
      {
        id: 24,
        name: 'Brick (Standard Size)',
        price: 8.00,
        originalPrice: 10.00,
        rating: 4.4,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Civil',
        subCategory: 'Materials',
        department: 'Civil Technology',
        description: 'Standard size clay brick for masonry construction and building projects.'
      },
    ],
    Electronics: [
      {
        id: 25,
        name: 'Digital Multimeter Pro (Fluke)',
        price: 12999.00,
        originalPrice: 15999.00,
        rating: 4.8,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Electronics',
        subCategory: 'Testing Equipment',
        department: 'Electronics Technology',
        description: 'Professional digital multimeter for voltage, current, and resistance measurement.'
      },
      {
        id: 26,
        name: 'Digital Oscilloscope (100MHz)',
        price: 12999.00,
        originalPrice: 14999.00,
        rating: 4.9,
        reviews: 45,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Electronics',
        subCategory: 'Testing Equipment',
        department: 'Electronics Technology',
        description: 'High-performance digital oscilloscope for waveform analysis and signal measurement.'
      },
      {
        id: 27,
        name: 'Function Generator (20MHz)',
        price: 8999.00,
        originalPrice: 10999.00,
        rating: 4.7,
        reviews: 34,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Electronics',
        subCategory: 'Testing Equipment',
        department: 'Electronics Technology',
        description: 'Signal generator for producing various waveforms for circuit testing and analysis.'
      },
      {
        id: 28,
        name: 'Logic Analyzer (8 Channel)',
        price: 4999.00,
        originalPrice: 5999.00,
        rating: 4.6,
        reviews: 28,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Electronics',
        subCategory: 'Testing Equipment',
        department: 'Electronics Technology',
        description: 'Digital logic analyzer for debugging digital circuits and microcontroller projects.'
      },
      {
        id: 29,
        name: 'Resistor Kit (500 Pieces)',
        price: 499.00,
        originalPrice: 699.00,
        rating: 4.7,
        reviews: 123,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Electronics',
        subCategory: 'Components',
        department: 'Electronics Technology',
        description: 'Comprehensive resistor kit with various values for electronics projects and experiments.'
      },
      {
        id: 30,
        name: 'Capacitor Kit (200 Pieces)',
        price: 599.00,
        originalPrice: 799.00,
        rating: 4.6,
        reviews: 98,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Electronics',
        subCategory: 'Components',
        department: 'Electronics Technology',
        description: 'Assorted capacitor kit with ceramic, electrolytic, and film capacitors.'
      },
      {
        id: 31,
        name: 'LED Assortment Pack (200 Pieces)',
        price: 399.00,
        originalPrice: 549.00,
        rating: 4.5,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Electronics',
        subCategory: 'Components',
        department: 'Electronics Technology',
        description: 'Mixed LED pack with various colors and sizes for electronics projects.'
      },
      {
        id: 32,
        name: 'Transistor Kit (100 Pieces)',
        price: 699.00,
        originalPrice: 899.00,
        rating: 4.6,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Electronics',
        subCategory: 'Components',
        department: 'Electronics Technology',
        description: 'Assorted transistor kit with NPN, PNP, and MOSFET transistors.'
      },
      {
        id: 33,
        name: 'Breadboard (830 Points)',
        price: 199.00,
        originalPrice: 299.00,
        rating: 4.8,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Electronics',
        subCategory: 'Components',
        department: 'Electronics Technology',
        description: 'Solderless breadboard for prototyping circuits without soldering.'
      },
      {
        id: 34,
        name: 'Jumper Wires Set (140 Pieces)',
        price: 299.00,
        originalPrice: 399.00,
        rating: 4.7,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Electronics',
        subCategory: 'Components',
        department: 'Electronics Technology',
        description: 'Male-to-male, male-to-female, and female-to-female jumper wires for breadboard connections.'
      },
      {
        id: 35,
        name: 'Arduino Nano Development Board',
        price: 499.00,
        originalPrice: 699.00,
        rating: 4.7,
        reviews: 145,
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop',
        category: 'Electronics',
        subCategory: 'Devices',
        department: 'Electronics Technology',
        description: 'Compact Arduino Nano board for space-constrained projects and embedded applications.'
      },
      {
        id: 36,
        name: 'Relay Module (4 Channel)',
        price: 399.00,
        originalPrice: 549.00,
        rating: 4.5,
        reviews: 78,
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop',
        category: 'Electronics',
        subCategory: 'Devices',
        department: 'Electronics Technology',
        description: '4-channel relay module for controlling high-voltage devices with low-voltage signals.'
      },
    ],
    RAC: [
      {
        id: 37,
        name: 'Refrigeration Compressor Unit (1 HP)',
        price: 8999.00,
        originalPrice: 10999.00,
        rating: 4.8,
        reviews: 23,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
        category: 'RAC',
        subCategory: 'RAC Components',
        department: 'Refrigeration and Air Conditioning',
        description: 'Hermetic compressor unit for refrigeration systems and air conditioning applications.'
      },
      {
        id: 38,
        name: 'Evaporator Coil (1.5 Ton)',
        price: 6999.00,
        originalPrice: 8499.00,
        rating: 4.7,
        reviews: 19,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
        category: 'RAC',
        subCategory: 'RAC Components',
        department: 'Refrigeration and Air Conditioning',
        description: 'Aluminum fin evaporator coil for efficient heat exchange in AC systems.'
      },
      {
        id: 39,
        name: 'Condenser Unit (Split AC)',
        price: 14999.00,
        originalPrice: 17999.00,
        rating: 4.6,
        reviews: 31,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
        category: 'RAC',
        subCategory: 'HVAC Systems',
        department: 'Refrigeration and Air Conditioning',
        description: 'Outdoor condenser unit for split air conditioning systems.'
      },
      {
        id: 40,
        name: 'Refrigerant Gas (R-410A)',
        price: 1999.00,
        originalPrice: 2499.00,
        rating: 4.5,
        reviews: 45,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
        category: 'RAC',
        subCategory: 'RAC Components',
        department: 'Refrigeration and Air Conditioning',
        description: 'Environmentally friendly R-410A refrigerant for modern AC and refrigeration systems.'
      },
      {
        id: 41,
        name: 'Capillary Tube Set',
        price: 299.00,
        originalPrice: 399.00,
        rating: 4.4,
        reviews: 56,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
        category: 'RAC',
        subCategory: 'RAC Components',
        department: 'Refrigeration and Air Conditioning',
        description: 'Copper capillary tubes for refrigerant flow control in refrigeration systems.'
      },
      {
        id: 42,
        name: 'Thermostat (Digital)',
        price: 1299.00,
        originalPrice: 1699.00,
        rating: 4.6,
        reviews: 78,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
        category: 'RAC',
        subCategory: 'HVAC Systems',
        department: 'Refrigeration and Air Conditioning',
        description: 'Digital programmable thermostat for precise temperature control in HVAC systems.'
      },
      {
        id: 43,
        name: 'AC Filter (Washable)',
        price: 399.00,
        originalPrice: 549.00,
        rating: 4.5,
        reviews: 134,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
        category: 'RAC',
        subCategory: 'RAC Components',
        department: 'Refrigeration and Air Conditioning',
        description: 'Reusable air filter for air conditioning units to improve air quality.'
      },
      {
        id: 44,
        name: 'Refrigeration Gauge Set',
        price: 2999.00,
        originalPrice: 3999.00,
        rating: 4.7,
        reviews: 42,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
        category: 'RAC',
        subCategory: 'Tools',
        department: 'Refrigeration and Air Conditioning',
        description: 'Professional manifold gauge set for measuring pressure in refrigeration systems.'
      },
      {
        id: 45,
        name: 'Vacuum Pump (1/4 HP)',
        price: 4999.00,
        originalPrice: 6499.00,
        rating: 4.6,
        reviews: 28,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
        category: 'RAC',
        subCategory: 'Tools',
        department: 'Refrigeration and Air Conditioning',
        description: 'Rotary vane vacuum pump for evacuating air and moisture from refrigeration systems.'
      },
      {
        id: 46,
        name: 'Refrigerant Recovery Unit',
        price: 19999.00,
        originalPrice: 24999.00,
        rating: 4.8,
        reviews: 15,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
        category: 'RAC',
        subCategory: 'Tools',
        department: 'Refrigeration and Air Conditioning',
        description: 'Portable refrigerant recovery unit for safe removal and storage of refrigerants.'
      },
      {
        id: 47,
        name: 'Expansion Valve (TXV)',
        price: 1499.00,
        originalPrice: 1999.00,
        rating: 4.5,
        reviews: 34,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
        category: 'RAC',
        subCategory: 'RAC Components',
        department: 'Refrigeration and Air Conditioning',
        description: 'Thermostatic expansion valve for precise refrigerant flow control in AC systems.'
      },
      {
        id: 48,
        name: 'AC Duct Insulation (1m)',
        price: 499.00,
        originalPrice: 699.00,
        rating: 4.4,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=500&h=500&fit=crop',
        category: 'RAC',
        subCategory: 'HVAC Systems',
        department: 'Refrigeration and Air Conditioning',
        description: 'Thermal insulation material for air conditioning ducts to prevent energy loss.'
      },
    ],
    General: [
      {
        id: 49,
        name: 'Ballpoint Pen (Pack of 10)',
        price: 99.00,
        originalPrice: 149.00,
        rating: 4.6,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Stationery',
        department: 'General Supplies',
        description: 'Smooth-writing ballpoint pens with blue ink, perfect for daily note-taking and assignments.'
      },
      {
        id: 50,
        name: 'Gel Pen Set (12 Colors)',
        price: 199.00,
        originalPrice: 299.00,
        rating: 4.7,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Stationery',
        department: 'General Supplies',
        description: 'Vibrant gel pen set with 12 different colors for creative writing and highlighting.'
      },
      {
        id: 51,
        name: 'Textbook - Engineering Mathematics',
        price: 599.00,
        originalPrice: 799.00,
        rating: 4.5,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Books',
        department: 'General Supplies',
        description: 'Comprehensive engineering mathematics textbook for polytechnic students.'
      },
      {
        id: 52,
        name: 'Reference Book - Technical Drawing',
        price: 499.00,
        originalPrice: 699.00,
        rating: 4.6,
        reviews: 67,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Books',
        department: 'General Supplies',
        description: 'Essential reference guide for technical drawing and engineering graphics.'
      },
      {
        id: 53,
        name: 'Writing Pad (A4 Size, 100 Sheets)',
        price: 149.00,
        originalPrice: 199.00,
        rating: 4.5,
        reviews: 178,
        image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Stationery',
        department: 'General Supplies',
        description: 'High-quality A4 writing pad with ruled lines, ideal for class notes and assignments.'
      },
      {
        id: 54,
        name: 'Drawing Pad (A3 Size, 50 Sheets)',
        price: 299.00,
        originalPrice: 399.00,
        rating: 4.6,
        reviews: 45,
        image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Stationery',
        department: 'General Supplies',
        description: 'Premium drawing pad with thick paper for technical drawings and sketches.'
      },
      {
        id: 55,
        name: 'Spiral Notebook (200 Pages)',
        price: 199.00,
        originalPrice: 249.00,
        rating: 4.7,
        reviews: 267,
        image: 'https://images.unsplash.com/photo-1532619675605-1ede6c9ed2d7?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Stationery',
        department: 'General Supplies',
        description: 'Durable spiral-bound notebook with ruled pages for organized note-taking.'
      },
      {
        id: 56,
        name: 'Lab Notebook (100 Pages)',
        price: 249.00,
        originalPrice: 349.00,
        rating: 4.6,
        reviews: 98,
        image: 'https://images.unsplash.com/photo-1532619675605-1ede6c9ed2d7?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Stationery',
        department: 'General Supplies',
        description: 'Professional lab notebook with numbered pages for experiments and observations.'
      },
      {
        id: 57,
        name: 'College Uniform - Shirt (White)',
        price: 599.00,
        originalPrice: 799.00,
        rating: 4.5,
        reviews: 145,
        image: 'https://images.unsplash.com/photo-1594938291221-94f18ab4d1e3?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Clothing',
        department: 'General Supplies',
        description: 'Official college uniform shirt in white color, comfortable cotton fabric.'
      },
      {
        id: 58,
        name: 'College Uniform - Pant (Navy Blue)',
        price: 699.00,
        originalPrice: 899.00,
        rating: 4.6,
        reviews: 134,
        image: 'https://images.unsplash.com/photo-1594938291221-94f18ab4d1e3?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Clothing',
        department: 'General Supplies',
        description: 'Official college uniform pant in navy blue, durable and well-fitted.'
      },
      {
        id: 59,
        name: 'College Uniform - Full Set',
        price: 1199.00,
        originalPrice: 1499.00,
        rating: 4.7,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1594938291221-94f18ab4d1e3?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Clothing',
        department: 'General Supplies',
        description: 'Complete college uniform set including shirt and pant with institute logo.'
      },
      {
        id: 60,
        name: 'College ID Card Holder',
        price: 49.00,
        originalPrice: 79.00,
        rating: 4.4,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Accessories',
        department: 'General Supplies',
        description: 'Durable ID card holder with lanyard for college identification card.'
      },
      {
        id: 61,
        name: 'Calculator (Scientific)',
        price: 899.00,
        originalPrice: 1199.00,
        rating: 4.8,
        reviews: 167,
        image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6b620?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Stationery',
        department: 'General Supplies',
        description: 'Advanced scientific calculator for engineering and mathematics calculations.'
      },
      {
        id: 62,
        name: 'Geometry Box Set',
        price: 299.00,
        originalPrice: 399.00,
        rating: 4.5,
        reviews: 112,
        image: 'https://images.unsplash.com/photo-1583484963886-cfe2bff2945f?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Stationery',
        department: 'General Supplies',
        description: 'Complete geometry box with compass, protractor, ruler, and other drawing tools.'
      },
      {
        id: 63,
        name: 'File Folder (A4 Size)',
        price: 99.00,
        originalPrice: 149.00,
        rating: 4.4,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=500&h=500&fit=crop',
        category: 'General',
        subCategory: 'Stationery',
        department: 'General Supplies',
        description: 'Sturdy file folder for organizing documents and assignment papers.'
      },
    ],
  };

  let products = allMockProducts[deptName] || [];
  
  if (subCategory) {
    products = products.filter(p => p.subCategory === subCategory);
  }
  
  return { products, total: products.length };
};

export default api;
