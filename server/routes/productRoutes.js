const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const SEED_PRODUCTS = [
  { id: 'PROD-001', name: 'Lab Microscope X200', category: 'Equipment', price: 1250.00, stock: 15, status: 'in_stock' },
  { id: 'PROD-002', name: 'Safety Goggles', category: 'Safety', price: 25.00, stock: 150, status: 'in_stock' },
  { id: 'PROD-003', name: 'Arduino Starter Kit', category: 'Electronics', price: 85.00, stock: 45, status: 'in_stock' },
  { id: 'PROD-004', name: 'Chemical Beaker Set', category: 'Glassware', price: 45.00, stock: 8, status: 'low_stock' },
  { id: 'PROD-005', name: 'Soldering Iron Station', category: 'Electronics', price: 120.00, stock: 0, status: 'out_of_stock' },
];

router.get('/', async (req, res) => {
  try {
    let products = await Product.find();
    if (products.length === 0) {
      await Product.insertMany(SEED_PRODUCTS);
      products = await Product.find();
    }
    res.json({
      data: products,
      meta: { total: products.length, page: 1, limit: 10 }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
