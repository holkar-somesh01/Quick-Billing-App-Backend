const asyncHandler = require("express-async-handler")
const { checkEmpty } = require("../utils/CheackEmpty")
const upload = require("../utils/upload")
const Products = require("../model/Products")
const cloudinary = require("../utils/cloudinary.config")



exports.GetAllProducts = asyncHandler(async (req, res) => {
    const userId= req.params.id
    const result = await Products.find({userId:userId})
    res.json({ message: "Produts Fetch Success", result })
})

exports.AddProduct = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: "File upload error", error: err.message });
        }
        const { name, price, desc, qty, unit,userId} = req.body;
        const { isError, error } = checkEmpty({ name, price, desc, qty, unit });
        if (isError) {
            return res.status(401).json({ message: "All Fields Required", error: error });
        }
        let images=''
        if (req.file) {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path)
            images = secure_url
        }
        await Products.create({ name, price, desc, qty, unit, images: images,userId: userId })
        res.json({ message: "Product Successfully Added" })
    })
})

exports.UpdateProduct = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        const { isError, error } = checkEmpty(req.body)
        if (isError) {
            return res.status(401).json({ message: "All Fields Required ", error: error })
        }
        console.log(req.file);
        
        const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        await Products.findByIdAndUpdate(req.params.id, {...req.body, images:secure_url})
        res.json({ message: "Product SuccessFully Updated" })
    })
})

exports.DeleteProdcut = asyncHandler(async (req, res) => {
    await Products.findByIdAndDelete(req.params.id)
    res.json({ message: "Product SuccessFully Deleted." })
})