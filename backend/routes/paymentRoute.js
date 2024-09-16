const express=require("express")
const router=express.Router();
const {isAuthorised} =require("../middleware/auth");
const { processPayment, sendStripeApiKey } = require("../Controllers/paymentController");


router.route("/payment/process").post(isAuthorised,processPayment)
router.route("/stripeapikey").get(isAuthorised,sendStripeApiKey)

module.exports=router;