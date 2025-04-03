const router = require("express").Router()
const { userProtected } = require("../middleware/Protected")
const productController = require("./../controller/product.controller")
router
    .get("/fetch-post/:id", productController.GetAllProducts)
    .post("/add-post", userProtected, productController.AddProduct)
    .put("/update-post/:id", productController.UpdateProduct)
    .delete("/delete-post/:id", productController.DeleteProdcut)

module.exports = router