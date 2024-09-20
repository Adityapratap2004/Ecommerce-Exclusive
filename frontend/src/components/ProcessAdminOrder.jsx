import MetaData from '@/Layout/MetaData';
import { clearError, clearMessage, getAdminSingleOrder, updateAdminOrder } from '@/store/Slice/adminSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import SubHeading from './SubHeading';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import Loader from './Loader';

const ProcessAdminOrder = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { order, error, isLoading ,message} = useSelector(state => state.admin);
    const address = order.shippingInfo ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}` : "N/A";

    const [status, setStatus] = useState("");
    const processOrder=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("status",status);
        dispatch(updateAdminOrder({myForm,id}));
    }
    useEffect(() => {
        dispatch(getAdminSingleOrder(id));
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
        if(message){
            toast.success(message);
            dispatch(clearMessage());
        }
    }, [error,message])

    if (isLoading) return <Loader />
    return (
        <div className='w-full h-full mt-5'>
            <MetaData title={`Order #${id}`} />
            <SubHeading subHeading={`Order #${id}`} />
            <div className='flex flex-col md:flex-row my-7 w-full gap-6 text-text2'>
                <div className=' md:w-3/4  shadow-all-sides rounded-md px-5 py-7'>
                    <div>
                        <h1 className='text-xl font-semibold '>Shipping Details</h1>
                        <div className='sm:pl-5 pt-4'>
                            <p>Name: {order.user?.name}</p>
                            <p>Phone No: {order.shippingInfo?.phoneNo}</p>
                            <p>Address: {address} </p>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-xl font-semibold mt-7 '>Payment Details</h1>
                        <div className='sm:pl-5 pt-4'>
                            <p>Payment Status: <span className=' capitalize'>{order?.paymentInfo?.status}</span></p>
                            <p>Amount Pais: ₹{order?.totalPrice}</p>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-xl font-semibold mt-7 '>Order Status</h1>
                        <div className='sm:pl-5 pt-4'>
                            <p>{order?.orderStatus}</p>
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
                    <h1 className='text-xl font-semibold text-center'>Process Order</h1>
                    <form className='my-5' onSubmit={processOrder}>
                        <select  onChange={(e) => { setStatus(e.target.value) }} className='text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm '>
                            <option value="">Choose Category</option>
                            {
                                order.orderStatus === "Processing" && (
                                    <option value="Shipped">Shipped</option>
                                )
                            }
                            {
                                order.orderStatus==="Shipped" && (
                                    <option value="Delivered">Delivered</option>
                                )
                            }
                        </select>
                        <Button className="w-full bg-secondary2  hover:bg-secondary3 text-white my-5 ">Process</Button>
                    </form>



                </div>
            </div>

        </div >
    )
}

export default ProcessAdminOrder
