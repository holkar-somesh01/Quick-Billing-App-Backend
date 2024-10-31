const { userProtected } = require("../middleware/Protected")
const authController = require("../controller/auth.controller")

const router = require("express").Router()

router
    .post("/register-admin", authController.RegisterAdmin)
    .post("/login-admin", authController.LoginAdmin)
    .post("/admin-otp", authController.VerifyOTP)
    .post("/logout-admin", userProtected, authController.LogoutAdmin)

module.exports = router