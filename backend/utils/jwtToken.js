
//creating token and saving in cookie

const sendToken=(user,statusCode,res)=>{
    const token=user.getJwtToken();
    const options={
        expires:new Date(Date.now()+process.env.COOKIE_EXPIRES_TIME*24*60*60*1000),
        httpOnly:true,
        sameSite: 'Strict',
        secure:true,
       
    }
   
    res.status(statusCode).cookie("token",token,options).json({
        user,
        success:true,
        token
    })
}

module.exports=sendToken;