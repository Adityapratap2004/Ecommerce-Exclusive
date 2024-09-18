const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//create Product --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    const imagesLink = await Promise.all(images.map(async (image) => {
        try {
            const isBase64 = image.startsWith("data:image/");
            const r = await cloudinary.v2.uploader.upload(image, {
                folder: "products",
                resource_type: isBase64 ? "image" : "auto" // auto handles both URLs and base64
            });
            return {
                public_id: r.public_id,
                url: r.secure_url
            };
        } catch (err) {
            console.error(err)
        }
    }));
    
    req.body.images = imagesLink
    req.body.user = req.user.id;

    if(req.body.discount!=0){
        const dPrice=Number(req.body.price)-Number(req.body.price)*Number(req.body.discount)/100;
        req.body.discountPrice= dPrice;       
    }

  

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

//Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {

    const resultPerPage = 8
    // const productCount = await Product.countDocuments();

    const apifeatures = new ApiFeatures(Product.find(), req.query).search().filter();
    let products = await apifeatures.query.clone();
    let filteredProductsCount = products.length;


    apifeatures.pagination(resultPerPage);
    products = await apifeatures.query;
    console.log(filteredProductsCount)

    res.status(200).json({
        success: true,
        products,
        // productCount,
        resultPerPage,
        filteredProductsCount
    })
})

//get All products Admin
exports.getAdminProducts = catchAsyncErrors(async (req, res) => {

    const products = await Product.find();
    res.status(200).json({
        success: true,
        products,
    })
})

//Product details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})


//Update Product --Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    
    let product = await Product.findById(req.params.id);
    
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    let images = [];

    if (typeof req.body.images === 'string') {
        images.push(req.body.images);  // For single image
    } else {
        images = req.body.images;  // Multiple images
    }



    if (images && images.length > 0) {
        // Destroy old images if new ones are provided
        await Promise.all(product.images.map(async (img) => {
            if (img.public_id) {
                await cloudinary.v2.uploader.destroy(img.public_id);
            }
        }));

        // Upload new images
        const imagesLink = await Promise.all(images.map(async (img) => {
            const result = await cloudinary.v2.uploader.upload(img, {
                folder: "products"
            });
            return {
                public_id: result.public_id,
                url: result.secure_url
            };
        }));

        req.body.images = imagesLink;
    }



    if(req.body.discount!=0){
        const dPrice=Number(req.body.price)-Number(req.body.price)*Number(req.body.discount)/100;
        req.body.discountPrice= dPrice;   

    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, { 
        new: true, 
        runValidators: true, 
        useFindAndModify: false 
    });

    res.status(200).json({
        success: true,
        product
    });
});


//Delete Product --Admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    await Promise.all(
        product.images.map(image =>
          cloudinary.v2.uploader.destroy(image.public_id)
        )
      );
      

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
})

//Create new review or Update the review

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {


    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }


    let avg = 0;
    product.reviews.forEach(rev => {
        avg += rev.rating;
    })



    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Review added successfully"
    })

})


//Get All Reviews of a product

exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    if (!product) {
        return next(new ErrorHandler("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//Delete Review

exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    let reviewExist = false;
    let toDelReview;

    const reviews = product.reviews.filter((rev) => {
        if (rev._id.toString() === req.query.id.toString()) {
            reviewExist = true;
            toDelReview = rev;
        }
        return rev._id.toString() !== req.query.id.toString();
    });

    if (!reviewExist) {
        return next(new ErrorHandler("Review not found", 404));
    }

    // Calculate the new average rating
    const numOfReviews = product.numOfReviews - 1;
    const newRatings = numOfReviews === 0 ? 0 : ((product.ratings * product.numOfReviews) - toDelReview.rating) / numOfReviews;

    // Update the product with the new reviews, ratings, and number of reviews
    product.reviews = reviews;
    product.ratings = newRatings;
    product.numOfReviews = numOfReviews;

    await product.save();

    res.status(200).json({
        success: true,
        message: "Review deleted successfully"
    });
});