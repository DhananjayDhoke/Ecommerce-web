
const app = require("./app")

const connectDB =require("./config/connectDB")

const dotenv = require ("dotenv")

dotenv.config({path:"Backend/config/config.env"})
app.listen(process.env.PORT,async()=>{

    await connectDB()
    console.log(`listning on http://localhost:${process.env.PORT}`)
})