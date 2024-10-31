const router = require("express").Router()
const { userProtected } = require("../middleware/Protected")
const billController = require("./../controller/bill.controller")

router
    .post("/create-bill", userProtected, billController.CreateBill)

module.exports = router