const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../models/orderModels");
const Product = require('../models/productModel')
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
  if (req.body.status !== "Delivered" && req.body.status !== "Shipped") {
    console.log(req.body.status);
    return next(new ErrorHandler("Invalid input", 404));
  }


  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 404));
  }

  if (req.body.status === 'Shipped') {
    order.orderItems.forEach(async (item) => {
      await updateStock(item.product, item.quantity);
    });

  }

  order.orderStatus = req.body.status;

  if ((req.body.status === "Delivered")) {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    status: req.body.status,
    message: `Status has been set to ${req.body.status}`,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
}


//Delte order

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


exports.getMonthlyRenvenue = catchAsyncErrors(async (req, res) => {

  const currentDate = new Date(Date.now());
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const salesData = await Order.aggregate([
    {
      // Match only orders from the current year
      $match: {
        $expr: { $eq: [{ $year: "$createdAt" }, currentYear] },
      },
    },
    {
      // Group by month and calculate total sales for each month
      $group: {
        _id: { month: { $month: "$createdAt" } }, // Group by month
        totalSales: { $sum: "$totalPrice" }, // Sum of totalPrice for each month
      },
    },
    {
      // Sort by month in ascending order
      $sort: { "_id.month": 1 },
    },
  ]);

  const currentMonthSales = salesData.find((data) => data._id.month === currentMonth);
  const prevMonthSales = salesData.find((data) => data._id.month === currentMonth - 1);

  res.status(200).json({
    success: true,
    monthlySales: salesData.map((data) => ({
      month: data._id.month,
      totalSales: data.totalSales,
    })),
    currentMonthSales: currentMonthSales ? currentMonthSales.totalSales : 0, // Sales for the current month, or 0 if none
    prevMonthSales: prevMonthSales ? prevMonthSales.totalSales : 0,
  });

});


exports.getMonthlySales = catchAsyncErrors(async (req, res) => {

  const currentDate = new Date(Date.now());
  const currentMonth = currentDate.getMonth() + 1; // Get the current month (1 for Jan, 12 for Dec)
  const currentYear = currentDate.getFullYear(); // Get the current year
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Get the previous month
  const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear; // Handle year change for January

  const salesData = await Order.aggregate([
    {
      // Match only orders from the current year (or previous year if dealing with January)
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
      // Group by month and calculate total sales and total number of sales (based on orderItems.length)
      $group: {
        _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } }, // Group by both month and year
        totalSalesValue: { $sum: "$totalPrice" }, // Sum total sales value for the month
        totalSalesNumber: { $sum: { $size: "$orderItems" } }, // Count the total number of sales (orderItems.length)
      }
    },
    {
      // Sort by year and month in ascending order
      $sort: { "_id.year": 1, "_id.month": 1 },
    }
  ]);

  // Find the total sales for the current month and previous month
  const currentMonthSales = salesData.find(
    (data) => data._id.month === currentMonth && data._id.year === currentYear
  );
  const previousMonthSales = salesData.find(
    (data) => data._id.month === previousMonth && data._id.year === previousYear
  );

  // Calculate total sales number (combined) for both months
  const totalSalesNumber =
    (currentMonthSales ? currentMonthSales.totalSalesNumber : 0) +
    (previousMonthSales ? previousMonthSales.totalSalesNumber : 0);

  res.status(200).json({
    success: true,
    currentMonthSales: {
      month: currentMonth,
      totalSalesValue: currentMonthSales ? currentMonthSales.totalSalesValue : 0,
      totalSalesNumber: currentMonthSales ? currentMonthSales.totalSalesNumber : 0,
    },
    previousMonthSales: {
      month: previousMonth,
      totalSalesValue: previousMonthSales ? previousMonthSales.totalSalesValue : 0,
      totalSalesNumber: previousMonthSales ? previousMonthSales.totalSalesNumber : 0,
    },
    totalSalesNumber: totalSalesNumber // Combined total sales number for current and previous month
  });

});

exports.getRecentOrders = catchAsyncErrors(async (req, res) => {
  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email avatar');

    res.status(200).json({
      success: true,
      recentOrders
    });

})




