const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    id: { type: String, required: true }, // Keeping string ID to match mocks for now (e.g., ORD-001)
    customer: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, enum: ['completed', 'pending', 'processing', 'cancelled'] },
    date: { type: String, required: true }, // Storing as string for simplicity to match mock format YYYY-MM-DD
    items: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
