const express=require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminProducts } = require("../Controllers/productController");
const { isAuthorised, authorizeRole } = require("../middleware/auth");
const router=express.Router();

router.route("/product").get(getAllProducts);
router.route("/admin/products").get(isAuthorised,authorizeRole('admin'),getAdminProducts);
router.route("/admin/product/new").post(isAuthorised,authorizeRole('admin'),createProduct)
router.route("/admin/product/:id").put(isAuthorised,authorizeRole('admin'),updateProduct).delete(isAuthorised,authorizeRole('admin'),deleteProduct)
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthorised,createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthorised,deleteReview);


module.exports=router