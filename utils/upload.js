const multer = require("multer")
const path = require("path")

const billStorage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    }
})
const upload = multer({ storage: billStorage }).single("images")
module.exports = upload