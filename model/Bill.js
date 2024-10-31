const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item: { type: String, required: true },
    qty: { type: String, required: true },
    unit: { type: String, required: true },
    price: { type: String, required: true },
    discount: { type: String, required: true },
    images: { type: [String] },
    amount: { type: String, required: true },
    total: { type: String, required: true }
});

const billSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    mobile: { type: String, required: true },
    date: { type: String, },
    shopAddress: { type: String, required: true },
    productData: [itemSchema]
});

module.exports = mongoose.model('bills', billSchema)