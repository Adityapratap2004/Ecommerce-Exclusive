const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User=require("../models/userModel");

exports.isAuthorised=catchAsyncErrors(async(req,res,next)=>{

    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("Please login to access resource",401));
    }

    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decodedData.id);

    next();

})

exports.authorizeRole=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`,403));
        }
        next();
    }

    
}