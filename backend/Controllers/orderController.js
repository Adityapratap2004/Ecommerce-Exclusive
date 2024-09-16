const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../models/orderModels");
const Product=require('../models/productModel')
const ErrorHandler = require("../utils/errorhandler");

//new orders

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
   
  const {
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//get Single Order
exports.getSingleorder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user Orders

exports.myOrders = catchAsyncErrors(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders -admin

exports.getAllOrders = catchAsyncErrors(async (req, res) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update Order Status --Admin
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delovered") {
    return next(new ErrorHandler("You have already delivered this order", 404));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });
  order.orderStatus = req.body.status;

  if ((req.body.status === "Delivered")) {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: `Status has been set to ${req.body.status}`,
  });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({ validateBeforeSave: false });
}


//Delte order
//Order stock negative mai jaa raha hai usko bhi dekhna hai

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await Order.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: "Order has been deleted successfully",
    });
  });
  