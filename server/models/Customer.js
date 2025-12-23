const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    id: { type: String, required: true }, // CUST-001
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: 'Student' },
    status: { type: String, default: 'active' },
    joinDate: { type: String, required: true },
    orders: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
