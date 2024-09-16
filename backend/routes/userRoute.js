const express=require('express');
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUsers, getUserDetailsAdmin, updateProfileAdmin, deleteUserAdmin } = require('../Controllers/userController');
const {isAuthorised, authorizeRole} =require("../middleware/auth");
const router=express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").post(logout);
router.route("/me").get(isAuthorised,getUserDetails)
router.route("/password/update").put(isAuthorised,updatePassword)
router.route("/me/update").put(isAuthorised,updateProfile)
router.route("/admin/users").get(isAuthorised,authorizeRole('admin'),getAllUsers);
router.route("/admin/user/:id")
            .get(isAuthorised,authorizeRole('admin'),getUserDetailsAdmin)
            .put(isAuthorised,authorizeRole('admin'),updateProfileAdmin)
            .delete(isAuthorised,authorizeRole('admin'),deleteUserAdmin)

module.exports=router;