const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")
const express = require("express")
require("dotenv").config()

const app = express()
app.use(cookieParser())

app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())
app.use(express.static("dist"))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/bill", require("./routes/bill.routes"))
app.use("/api/customer", require("./routes/customer.routes"))
app.use("/api/product", require("./routes/product.routes"))
app.use("/api/bill-mail", require("./routes/pdfBill.routes"))

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
    res.status(404).json({ message: "Resource Not Found" })
})
app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: `SERVER ERROR ${err.message}` })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log(`SERVER RUNNING 🏃‍♀️`))
})