const jwt = require("jsonwebtoken")

exports.userProtected = (req, res, next) => {
    const { admin } = req.cookies

    if (!req.cookies.admin) { return res.status(401).json({ message: "No Cookie Found" }) }
    jwt.verify(admin, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({ message: "JWT Error", error: err.message })
        }
        req.loggedInUser = decode.userID
        next()
    })

}