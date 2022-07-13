
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")
const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        minLength:[3,'Name sould have more than 4 charectr'],
        maxLength:[30,'Name sould not execed 30 charectr'],
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,'Name sould have more than 8 Charecter'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            //required:true
           },
           url:{
            type:String,
            //required:true
           }
    },

    role:{
        type:String,
        default:"user"
    },
    
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
        
    },
    resetPasswordToken:String,
    resetPasswordExpair:Date,
    
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

// JWT TOKEN
userSchema.methods.getJWTToken =  function(){
 return  jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPAIR})
}

//compair password
  
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password)
   }

// genrating password reset token
 userSchema.methods.getResetPasswordToken = function (){
    // genrating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // hashing and adding resetPasswordToken to userSchema

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpair = Date.now()+ 15*60*1000;

    return resetToken;
 }  
module.exports= mongoose.model("User",userSchema)

