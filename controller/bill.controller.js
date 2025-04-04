const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/CheackEmpty")
const Bill = require("../model/Bill")
const upload = require("../utils/upload")
const cloudinary = require("../utils/cloudinary.config")
const validator = require("validator")

exports.CreateBill = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        const { customerName, mobile, productData, qty, unit, amount, date, total, discount, shopAddress, price } = req.body
        const { error, isError } = checkEmpty({ customerName, mobile, productData, qty, unit, amount, date, price })
        if (isError) {
            return res.status(401).json({ message: `All Fields Required ${error}` })
        }
        if (!validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(401).json({ message: "Please Enter Valid Number" })
        }
        const images = []
        for (const item of req.files) {
            const { secure_url } = await cloudinary.uploader.upload(item.path)
            images.push(secure_url)
        }
        productData[0].images = images
        await Bill.create({ customerName, mobile, productData, qty, unit, amount, date, total, discount, shopAddress, price })
        res.json({ message: "Customer Bill Create Success" })
    })
})




// Code Explanation Creation For Presentation  this project