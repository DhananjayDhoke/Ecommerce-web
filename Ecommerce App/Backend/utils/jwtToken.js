const sendToken = (user,statuscode,res)=>{
    const token = user.getJWTToken();
    // option for cookiess

    const options  = {
        expaires : new Date(Date.now()+process.env.COOKIES_EXPAIRE*24*60*60*1000),
        httpOnly:true,

    }
    res.status(statuscode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    })


}
module.exports = sendToken;