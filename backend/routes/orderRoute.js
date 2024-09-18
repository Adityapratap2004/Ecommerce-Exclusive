const express=require('express');
const { isAuthorised, authorizeRole } = require('../middleware/auth');
const { newOrder, getSingleorder, myOrders, getAllOrders, updateOrderStatus, deleteOrder, getMonthlySales, getMonthlyRenvenue, getRecentOrders } = require('../Controllers/orderController');
const router=express.Router();

router.route('/order/new').post(isAuthorised,newOrder)
router.route('/order/:id').get(isAuthorised,getSingleorder);
router.route('/orders/me').get(isAuthorised,myOrders);

router.route('/admin/orders').get(isAuthorised,authorizeRole('admin'),getAllOrders);
router.route('/admin/order/:id')
    .put(isAuthorised,authorizeRole('admin'),updateOrderStatus)
    .delete(isAuthorised,authorizeRole('admin'),deleteOrder)

router.route('/admin/monthlyrevenue').get(isAuthorised,authorizeRole('admin'),getMonthlyRenvenue);
router.route('/admin/monthlysales').get(isAuthorised,authorizeRole('admin'),getMonthlySales);
router.route('/admin/recentOrders').get(isAuthorised,authorizeRole('admin'),getRecentOrders);


module.exports=router