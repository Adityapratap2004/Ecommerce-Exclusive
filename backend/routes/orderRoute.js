const express=require('express');
const { isAuthorised, authorizeRole } = require('../middleware/auth');
const { newOrder, getSingleorder, myOrders, getAllOrders, updateOrderStatus, deleteOrder } = require('../Controllers/orderController');
const router=express.Router();

router.route('/order/new').post(isAuthorised,newOrder)
router.route('/order/:id').get(isAuthorised,getSingleorder);
router.route('/orders/me').get(isAuthorised,myOrders);

router.route('/admin/orders').get(isAuthorised,authorizeRole('admin'),getAllOrders);
router.route('/admin/order/:id')
    .put(isAuthorised,authorizeRole('admin'),updateOrderStatus)
    .delete(isAuthorised,authorizeRole('admin'),deleteOrder)


module.exports=router