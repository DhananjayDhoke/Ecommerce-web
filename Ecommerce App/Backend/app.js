const express = require("express");
const cookieParser =require("cookie-parser")
const app = express()
app.use(express.json())
app.use(cookieParser())
// routes 
 const product = require("./routes/productRoutes")
 const user = require("./routes/userRoutes")
 const order = require("./routes/orderRoutes")
 app.use("/api/v1",product)
 app.use("/api/v1",user)
 app.use("/api/v1",order)


module.exports = app