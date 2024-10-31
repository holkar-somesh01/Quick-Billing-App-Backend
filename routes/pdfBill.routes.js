
const pdfController = require("../controller/pdfBill.controller")
const { userProtected } = require("../middleware/Protected")

const router = require("express").Router()

router
    .post("/send-bill", pdfController.BillMail)
    
module.exports = router