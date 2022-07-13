const jwt = require("jsonwebtoken");
const User =require("../model/userModel")

exports.isAuthenticate = async(req,res,next)=>{
  try{
    const {token} = req.cookies;
    if(!token){
      return res.status(401).send({message:"Please Login"})
    }
    
    const decodeData = jwt.verify(token,process.env.JWT_SECRET)
 
    req.user = await User.findById(decodeData.id)
    next()
  }
  catch(e){
    res.send({message:e.message})
  }
}
exports.authorizeRole =(...roles)=>{
  return (req,res,next)=>{
    console.log(req.user.role)
    if(!roles.includes(req.user.role)){
      return next(
        res.json({Role:`${req.user.role} is not allows to access this resources`})
      )
    }
    next();
  }
}