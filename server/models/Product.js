const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true }, // PROD-001
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  status: { type: String, required: true, enum: ['in_stock', 'low_stock', 'out_of_stock'] }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
