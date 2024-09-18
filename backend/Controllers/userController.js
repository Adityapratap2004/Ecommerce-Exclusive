const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto = require('crypto')
const cloudinary = require('cloudinary')


//Register a user

exports.registerUser = catchAsyncErrors(async (req, res, next) => {

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });
    const { name, email, password } = req.body;
    console.log("Regisster user")

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    });

    sendToken(user, 201, res);
});


exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //Checking if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email & password", 400));
    }

    //Finding user in database
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    //Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);


    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 200, res);
})


exports.logout = catchAsyncErrors(async (req, res) => {

    const options = {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: 'none',
        secure: true,

    }

    res.status(200).cookie("token", "sfdghgers", options).json({
        success: true,
        message: "Logged out"
    })
})


exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    //Get reset passowrd token

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${process.env.FRONT_END_URL}/password/reset/${resetToken}`
    const message = `Your password reset token is as follows:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, then ignore it.`

    try {
        await sendEmail({
            email: user.email,
            subject: " Password Recovery",
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email} successfully`
        })

    }
    catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }


})

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //Hash URL token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler("Password reset token is invalid or has been expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    //Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
})

//update user password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
})


//Update profile 

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true,
        user
    })
})



//get user details

exports.getUserDetails = catchAsyncErrors(async (req, res) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})



//Get all users (admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

//get single user
exports.getUserDetailsAdmin = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user
    })
})



//update user profile (admin)

exports.updateProfileAdmin = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    res.status(200).json({
        success: true
    })
})


//delete user (admin)

exports.deleteUserAdmin = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User does not found with id: ${req.params.id}`));
    }
    //Remove avatar from cloudinary-TODO
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        message: "User delted successfully"
    })
})


exports.getMonthlyUsers = catchAsyncErrors(async (req, res) => {

    const currentDate = new Date(Date.now());
    const currentMonth = currentDate.getMonth() + 1; // Get the current month (1 for Jan, 12 for Dec)
    const currentYear = currentDate.getFullYear(); // Get the current year
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Get the previous month
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear; // Handle year change for January

    const userData = await User.aggregate([
        {
            // Match only users created in the current and previous months
            $match: {
                $or: [
                    {
                        $and: [
                            { $expr: { $eq: [{ $month: "$createdAt" }, currentMonth] } },
                            { $expr: { $eq: [{ $year: "$createdAt" }, currentYear] } }
                        ]
                    },
                    {
                        $and: [
                            { $expr: { $eq: [{ $month: "$createdAt" }, previousMonth] } },
                            { $expr: { $eq: [{ $year: "$createdAt" }, previousYear] } }
                        ]
                    }
                ]
            }
        },
        {
            // Group users by month and year
            $group: {
                _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } }, // Group by both month and year
                newUsers: { $sum: 1 } // Count the number of new users
            }
        },
        {
            // Sort by year and month in ascending order
            $sort: { "_id.year": 1, "_id.month": 1 },
        }
    ]);

    // Find the total users for the current month and previous month
    const currentMonthUsers = userData.find(
        (data) => data._id.month === currentMonth && data._id.year === currentYear
    );
    const previousMonthUsers = userData.find(
        (data) => data._id.month === previousMonth && data._id.year === previousYear
    );

    // Calculate total number of users (combined) for both months
    const totalUsers =
        (currentMonthUsers ? currentMonthUsers.newUsers : 0) +
        (previousMonthUsers ? previousMonthUsers.newUsers : 0);

    res.status(200).json({
        success: true,
        currentMonthUsers: {
            month: currentMonth,
            newUsers: currentMonthUsers ? currentMonthUsers.newUsers : 0
        },
        previousMonthUsers: {
            month: previousMonth,
            newUsers: previousMonthUsers ? previousMonthUsers.newUsers : 0
        },
        totalUsers: totalUsers // Combined new users for current and previous month
    });

});

