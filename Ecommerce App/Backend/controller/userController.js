
const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
exports.registerUser= async(req,res,next)=>{
  try{
       const {name,email,password}  = req.body;

       const user = await User.create({name,email,password,
        avtar:{public_id:"sample id",url:"profilepic"}})

        sendToken(user,201,res)  

  }
  catch(e){
    res.send({message:e.message})
  }
}

exports.loginUser = async(req,res)=>{
   try{
      const {email,password} = req.body;
     
      if(!email || !password){
        return res.status(400).json({message:"please enter email and Password"})
      }
      const user = await User.findOne({email}).select("+password")

      if(!user){
        return res.status(401).json({message:"Invalid email or Password"})

      }
      const isPasswordMatch = await user.comparePassword(password);

      if(!isPasswordMatch){
        return res.status(401).json({message:"Invalid email or Password"})

      }
       sendToken(user,201,res)  
   }
   catch(e){
      return res.json({message:e.message})
   }
}

// user logout 
exports.logoutUser = async(req,res)=>{
  
  try{
    res.cookie("token",null,{expires:new Date(Date.now()),httpOnly:true})

    return res.status(200).json({
      success:true,
      message:"Logged Out",
    })
  }
  catch(e){
    return res.json({message:e.message})
  }
 

}

// for forget password 

exports.forgetPassword = async(req,res,next)=>{

  const user = await User.findOne({email:req.body.email});
  
  
  if(!user){
     return res.status(404).json({
      message:"user not found"
     })
  }

  // get resetpasword token 

  const resetToken = user.getResetPasswordToken();
 
  await user.save({validateBeforeSave:false});

  const resetPasswordUrl =`${req.protocal}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

  const message =`Your Password Reset Token is :-\n\n ${resetPasswordUrl} \n\n if you have not request then,
  please ingnore it `;

  try {
    await sendEmail({
      email:user.email,
      subject:"passwors recovery",
      message,
    })
    res.status(200).json({
      success:true,
      message:`Email sent to ${user.email} succesesfully`,
    })
  } catch (e) {
    user.ResetPasswordToken =undefined;
    user.resetPasswordExpair = undefined;

    await user.save({validateBeforeSave:false});
    return res.status(500).json({
      message:e.message
    })
  }
}

// reset pasword ;

exports.ResetPassword = async(req,res,next)=>{

  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

  const user = await User.findOne({resetPasswordToken,resetPasswordExpair:{$gt:Date.now()}});

  if(!user){
    return res.status(400).json({
     message:"reset password token is invalid or has been expired"
    })
 }
 if(req.body.password !==req.body.confirmPasswod){
  return res.status(400).json({
    message:"passwod does not match"
 })
}
   user.password = req.body.password;
   user.ResetPasswordToken =undefined;
    user.resetPasswordExpair = undefined;

    await user.save();

    sendToken(user,200,res)
}


// get user details when he is logged in

exports.getUserDetailes = async(req,res,next)=>{
   
  const user = await User.findById(req.user.id);
   
  res.status(200).json({
    success:true,
    user,
  })

}

// update pasword ;

exports.updatePassword = async(req,res,next)=>{
   
  const user = await User.findById(req.user.id).select("+password");
  
   const isPasswordMatch = await user.comparePassword(req.body.oldPassword);
   
   if(!isPasswordMatch){
     return res.status(400).json({message:"Old Pasword Is Incorrect"})
     
      }
      if(req.body.newPassword !== req.body.confirmPassword){
        return res.status(400).json({message:"Password Does not Match"})
        
      }
     
        user.password = req.body.newPassword ;
        await user.save();
        sendToken(user,201,res) 
 

}

// update profile ;

exports.updateProfile = async(req,res,next)=>{

  const newUserData ={
    name: req.body.name,
    email: req.body.email
  }
   
  const user = await User.findByIdAndUpdate(req.user.id,newUserData,
    {new:true,runValidators:true,useFindAndModify:false});
   
  res.status(200).json({
    success:true,
    user,
  })

}

// get all user

exports.getAllUsers= async(req,res,next)=>{
  try{
    const user = await User.find();

    res.status(200).json({
      success:true,
      user,
    }) 
        
  }
  catch(e){
    res.send({message:e.message})
  }
}

// for admin get user by id 


exports.getSingalUser= async(req,res,next)=>{
  try{
    const user = await User.findById(req.params.id);
    
    if(!user){
      return res.status(400).json({message:`user is not found bu id : ${req.params.id}`})
    }
   
    res.status(200).json({
      success:true,
      user,
    }) 
        
  }
  catch(e){
    res.send({message:e.message})
  }
}

// update user Role;

exports.updateUserRole = async(req,res,next)=>{

 try{
  const newUserData ={
    name: req.body.name,
    email: req.body.email,
    role:req.body.role
  }
   
  const user = await User.findByIdAndUpdate(req.params.id,newUserData,
    {new:true,runValidators:true,useFindAndModify:false});
   
    if(!user){
      return res.status(400).json({message:`user is not found buy id : ${req.params.id}`})
    }
   
  return res.status(200).json({
    success:true,
    user,
  })
 }
 catch(e){
    return res.json({message:e.message})
 }

}

// delete user by admin ;
exports.deleteUser = async(req,res,next)=>{

  try{ 
   const user = await User.findById(req.params.id)
    
     if(!user){
       return res.status(400).json({message:`user is not found buy id : ${req.params.id}`})
     }
    
     await user.remove()
   return res.status(200).json({
     success:true,
    message:"user deleted sucsessfully"
   })
  }
  catch(e){
     return res.json({message:e.message})
  }
 
 }
