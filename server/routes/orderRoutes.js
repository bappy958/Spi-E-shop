const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Mock Data for Seeding
const SEED_ORDERS = [
    { id: 'ORD-001', customer: 'John Doe', amount: 120.50, status: 'completed', date: '2024-03-15', items: 3 },
    { id: 'ORD-002', customer: 'Jane Smith', amount: 75.00, status: 'pending', date: '2024-03-16', items: 1 },
    { id: 'ORD-003', customer: 'Michael Brown', amount: 250.00, status: 'processing', date: '2024-03-16', items: 5 },
    { id: 'ORD-004', customer: 'Sarah Wilson', amount: 95.20, status: 'completed', date: '2024-03-14', items: 2 },
    { id: 'ORD-005', customer: 'David Lee', amount: 110.00, status: 'cancelled', date: '2024-03-13', items: 1 },
];

router.get('/', async (req, res) => {
    try {
        let orders = await Order.find();
        if (orders.length === 0) {
            await Order.insertMany(SEED_ORDERS);
            orders = await Order.find();
        }

        // Wrap in { data, meta } structure
        res.json({
            data: orders,
            meta: { total: orders.length, page: 1, limit: 10 }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
