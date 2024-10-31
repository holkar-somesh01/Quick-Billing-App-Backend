const asyncHandler = require("express-async-handler")
const validator = require("validator")
const { checkEmpty } = require("../utils/CheackEmpty")
const Customer = require("../model/Customer")
const bcrypt = require("bcryptjs")

exports.RegisterCustomer = asyncHandler(async (req, res) => {
    const { name, email, mobile, address } = req.body
    const userId = req.loggedInUser

    const { isError, error } = checkEmpty({ name, mobile, userId })
    if (isError) {
        return res.status(401).json({ message: "All Fields Required", error: error })
    }
    if (!validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ message: "In Valid Mobile" })
    }
    await Customer.create({ name, email, mobile, address, userId })
    res.json({ message: "Customer Register Success" })
})

exports.FetchAllCustomers = asyncHandler(async (req, res) => {
    const userId = req.loggedInUser
    const result = await Customer.find({ userId })
    res.json({ message: "Customer Fetch Success", result })
})