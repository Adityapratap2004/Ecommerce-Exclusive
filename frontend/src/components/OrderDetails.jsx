import MetaData from '@/Layout/MetaData'
import { clearError, getSingleOrder } from '@/store/Slice/orderSlice';

import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import Loader from './Loader';
import SubHeading from './SubHeading';

const OrderDetails = () => {
    const {id}=useParams();
    const dispatch=useDispatch();
    const {order,error,isLoading}=useSelector(state=>state.order);
    const address = order.shippingInfo ?`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`:"N/A";

    useEffect(()=>{
        dispatch(getSingleOrder(id));
    },[])

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearError());
        }
    },[error])

    if(isLoading) return <Loader/>
  return (
   
   <div className='w-full h-full mt-5'>
            <MetaData title={`Order #${id}`} />
            <SubHeading subHeading={`Order #${id}`} />
            <div className='flex flex-col md:flex-row my-7 w-full gap-6 text-text2'>
                <div className=' md:w-3/4  shadow-all-sides rounded-md px-5 py-7'>
                    <div>
                        <h1 className='text-xl font-semibold '>Shipping Details</h1>
                        <div className='sm:pl-5 pt-4'>
                            <p>Name: {order?.user?.name}</p>
                            <p>Phone No: {order?.shippingInfo?.phoneNo}</p>
                            <p>Address: {address} </p>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-xl font-semibold mt-7'>Order Items</h1>
                        <div className='sm:pl-5 pt-4 flex flex-col space-y-3'>
                            {
                               order?.orderItems && order.orderItems.map((cartItem) => {
                                    return <Link key={cartItem._id} to={`/product/${cartItem._id}`}>
                                        <div className='flex justify-between items-center' key={cartItem._id}>
                                            <div className='flex items-center gap-4'>
                                                <img src={cartItem.image} alt="product image" className='h-14' />
                                                <p className='text-lg font-medium'>{cartItem.name}</p>
                                            </div>
                                            <div>
                                                {cartItem.quantity} X ₹{cartItem.price} = <span className='text-lg font-medium'>₹{cartItem.quantity * cartItem.price}</span>
                                            </div>
                                        </div>
                                    </Link>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className='shadow-all-sides rounded-md flex-grow  p-5'>
                    <h1 className='text-xl font-semibold text-center'>Payment</h1>

                    <div className=' pt-4 py-5 border-t-2 border-b-2 mt-10'>
                        <div className='flex justify-between'>
                            <span>Payment Status</span> <span className=' capitalize'>{order?.paymentInfo?.status}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Order Status</span> <span>{order?.orderStatus}</span>
                        </div>
                    </div>
                    <div className='flex justify-between pt-4'>
                        <span>Total: </span> <span>₹{order?.totalPrice}</span>
                    </div>
                    
                </div>
            </div>

        </div >
  )
}

export default OrderDetails
