const mongoose = require("mongoose");


const connectDB = ()=>{
    return mongoose.connect(process.env.URL)
}

module.exports = connectDB