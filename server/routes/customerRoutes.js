const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

const SEED_CUSTOMERS = [
    { id: 'CUST-001', name: 'Alice Johnson', email: 'alice@example.com', role: 'Student', status: 'active', joinDate: '2024-01-15', orders: 5 },
    { id: 'CUST-002', name: 'Bob Smith', email: 'bob@example.com', role: 'Faculty', status: 'active', joinDate: '2023-11-20', orders: 12 },
    { id: 'CUST-003', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Student', status: 'inactive', joinDate: '2024-02-10', orders: 0 },
];

router.get('/', async (req, res) => {
    try {
        let customers = await Customer.find();
        if (customers.length === 0) {
            await Customer.insertMany(SEED_CUSTOMERS);
            customers = await Customer.find();
        }
        res.json({
            data: customers,
            meta: { total: customers.length, page: 1, limit: 10 }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
