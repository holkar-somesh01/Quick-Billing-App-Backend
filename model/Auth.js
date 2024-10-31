const mongoose = require("mongoose")

const authSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: String, },
    active: { type: Boolean, default: true },
    otp: { type: String, }
})
module.exports = mongoose.model("auth", authSchema)