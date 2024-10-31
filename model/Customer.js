const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, },
    mobile: { type: Number, required: true },
    address: { type: String, },
    userId: { type: mongoose.Types.ObjectId, ref:"auth", required: true }
})
module.exports = mongoose.model("customer", userSchema)