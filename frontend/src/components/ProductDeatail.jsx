import { addReview, clearError, clearSuccess, getProductDetails } from '@/store/Slice/productDetailSlice';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom';
import Loader from './Loader';
import ReactStars from 'react-stars';
import { Button } from './ui/button';
import { ArrowLeftSquare, Heart, RefreshCcw, Truck } from 'lucide-react';
import ReviewCard from './ReviewCard';
import SubHeading from './SubHeading';
import MetaData from '@/Layout/MetaData';
import { addItemsToCart } from '@/store/Slice/cartSlice';


const ProductDeatail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { productDetails, isLoading, error, success } = useSelector(state => state.productDetail);
  

  const [open, setOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleReview = async (e) => {
    e.preventDefault();

    const r = {
      rating: Number(reviewRating),
      comment,
      productId: id
    }
    dispatch(addReview(r));
    setComment(""); 
    setOpen(false); 
  }



  const [count, setCount] = useState(1);
  const decreaseCount = () => {
    if (count <= 1) {
      toast.error("Product count can not be decreased")
      return;
    }
    setCount(count => count - 1);
  }

  const increaseCount = () => {
    if (productDetails.stock === count) return;
    setCount(count => count + 1);
  }

  const handleAddToCart = (productDetail) => {
    productDetail = { ...productDetail, quantity: count };
    productDetail.image = productDetail.images[0].url;
    dispatch(addItemsToCart(productDetail))
    toast.success("Producted Added to Cart")
  }

  useEffect(() => {
    if (success) {
      toast.success("Review added");
      setOpen(false);
      setComment("");
      setReviewRating(5);
      dispatch(clearSuccess());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, success])

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError())
    }
  }, [dispatch, error]);





  if (isLoading) {
    return <Loader />
  }

  return (<>
    <MetaData title={`${productDetails?.name ? productDetails.name : "product details"}`} />
    {productDetails ? <>
      <div className='flex flex-col md:flex-row w-full my-10 items-center'>
        <div className='w-full flex flex-col-reverse md:flex-row '>
          <div className='hidden md:flex md:flex-col justify-center gap-4'>
            {
              Array(4).fill().map((_, index) => (
                <div key={index} className='bg-secondary0 p-4 rounded-md'>
                  <img src={productDetails?.images[0]?.url} alt="product img" className='w-28' />
                </div>
              ))
            }
          </div>
          <div className='w-full md:flex-1 flex items-center justify-center rounded-md bg-secondary0 md:ml-10 md:mr-20 overflow-hidden'>
            <img src={productDetails?.images[0]?.url} alt="product img" className='w-[100%] md:w-[70%] hover:scale-105 md:hover:scale-125 overflow-hidden duration-150 cursor-pointer' />
          </div>
        </div>
        <div className='md:w-[50%] mt-8 md:mt-0 space-y-2'>
          <h1 className='text-4xl font-semibold'>{productDetails.name}</h1>
          <div className='flex gap-4 items-center'>
            <ReactStars size={24} value={productDetails.ratings || 0} edit={false} color2="#FFAD33" />
            <span>({productDetails.numOfReviews || 0} Reviews)</span>
            <span className='border-l-2 pl-4'>
              In Stock
            </span>
          </div>
          <h2 className='text-3xl'>${productDetails.price}</h2>
          <p className='py-4 border-b-2'>{productDetails.description} </p>

          <div className='py-4 flex gap-4 md:gap-8'>
            <div className='flex *:h-14'>
              <Button className="border rounded-none rounded-l-md bg-white text-text2 hover:text-text1 hover:bg-secondary2 text-lg md:text-2xl" onClick={decreaseCount}>-</Button>
              <span className='w-10 md:w-16 flex justify-center items-center border '>{count}</span>
              <Button className="border rounded-none rounded-r-md bg-white text-text2 hover:text-text1 hover:bg-secondary2 text-lg md:text-2xl" onClick={increaseCount}>+</Button>
            </div>
            <Button className="bg-secondary2 hover:bg-secondary3 h-14 text-lg w-auto md:w-40" onClick={() => { handleAddToCart(productDetails) }} disabled={productDetails.stock < 1} >Add to Cart</Button>
            {/* <Button className="h-14 bg-white hover:bg-white text-text2 border-gray-300 border"><Heart /></Button> */}
          </div>
          <div className='w-full border-2  rounded-md '>
            <div className='flex items-center border-b p-4 gap-4'>
              <Truck />
              <div >
                <h3 className='text-lg'>Free Delivery</h3>
                <p className='text-sm underline'>Enter your postal code fro Delivery Availabality</p>
              </div>
            </div>
            <div className='border-t items-center flex p-4 gap-4'>
              <RefreshCcw />
              <div>
                <h3 className='text-lg'>Return Delivery</h3>
                <p className='text-sm'>Free30 Days Delivery Returns. <span className='underline'>Details</span></p>
              </div>
            </div>
          </div>
          <div className=' pt-4'>
            <Button className="bg-secondary2 hover:bg-secondary3 h-14  text-lg w-auto md:w-40" onClick={() => setOpen(!open)} >Add Review</Button>
          </div></div>
      </div>

      <div className='py-5'>

        <SubHeading subHeading="Reviews" />
        <div className='grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {
            productDetails.numOfReviews >= 1 ?

            productDetails.reviews.map((review) => {
              return <ReviewCard key={review._id} review={review} />

            }) :
            <div>
                <h3 className='text-lg font-semibold text-center text-text2'>No Reviews yet</h3>
              </div>

          }
        </div>
      </div>
    </> : <>
      <div className='w-full text-center my-48 text-lg text-text2'>
        <p>This product is not avilable</p>
        <Link to="/">
          <Button className="my-3 bg-secondary2 hover:bg-secondary3 ">
            <ArrowLeftSquare className='mr-1' /> Go to Home
          </Button>
        </Link>

      </div>

    </>
    }
    {
      open && <div className='fixed flex items-center justify-center top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.2)] '>
        <div className='bg-white p-5 rounded-md shadow-all-sides'>
          <SubHeading subHeading="Add review" />
          <form id="form" onSubmit={handleReview}>
            <div>
              <span className='text-text2 '>Add Rating</span>
              <ReactStars size={24} value={reviewRating} onChange={(value) => { setReviewRating(value) }} color2="#FFAD33" />
            </div>
            <div className='flex flex-col my-5'>
              <span className='text-text2 mb-3 '>Add Comment</span>
              <textarea required placeholder='Please give your review' value={comment} onChange={(e) => { setComment(e.target.value) }} className=' text-text2 w-80 px-2 py-3  bg-secondary outline-none border-none rounded-sm ' />
            </div>
          </form>
          <div className='flex gap-5 justify-end mt-5'>
            <Button variant="outline" onClick={() => setOpen(!open)}>
              Cancel
            </Button>
            <Button form="form" type="submit" className="bg-secondary2 hover:bg-secondary3 text-white">
              Submit
            </Button>

          </div>


        </div>
      </div>
    }


  </>
  )
}


export default ProductDeatail
