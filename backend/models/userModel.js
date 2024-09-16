const mongoose = require('mongoose');
const validator = require('validator');

const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [6, "Password should have more than 6 characters"],
        select: false  // by this field it will not be send when we will use find,findAll
    },
    avatar: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//JWT TOKEN

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//compare password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
        
}


//generating password reset token
userSchema.methods.getResetPasswordToken=function(){
    //generating token
    const resetToken=crypto.randomBytes(20).toString('hex');

    //hashing and add to userSchema

    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire=Date.now()+ 15*60*1000;

    return resetToken;

}


module.exports = mongoose.model("User", userSchema)