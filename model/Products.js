const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String, required: true },
    qty: { type: String, required: true },
    unit: { type: String, required: true },
    images: { type: String, },
    userId: { type: mongoose.Types.ObjectId, ref:"auth", required: true }
})
module.exports = mongoose.model("products", userSchema)