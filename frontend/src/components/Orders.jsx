import { clearError, getOrders } from '@/store/Slice/orderSlice';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader';
import SubHeading from './SubHeading';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Orders = () => {
    const { orders, isLoading, error } = useSelector(state => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOrders());
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }
    }, [error])

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='py-4 text-text2 min-h-[90vh] '>
            {orders.length === 0 ?
                <div className=' flex flex-col w-full h-[80vh] justify-center items-center'>
                    <h1 className='text-6xl font-bold mb-5 text-center'>You have not placed any orders yet</h1>
                    <Link to="/products"><Button className="bg-secondary2 text-white hover:bg-secondary3"><ArrowLeft className='mr-3' />  Buy Products</Button></Link>
                </div> : <> <SubHeading subHeading={"Your orders"} />
                    <div className='grid grid-cols-4 sm:grid-cols-5 w-full p-4 shadow-all-sides rounded-md mb-6'>
                        <p className='sm:col-span-2'>Order ID</p>
                        <p className='text-center'>Status</p>
                        <p className='text-end'>Item Qty</p>
                        <p className='text-end'>Amount</p>
                    </div>
                    <div className='space-y-5'>
                        {
                            orders.map((order) => {
                                return (
                                    <Link to={`/account/order/${order._id}`} key={order._id} className='grid grid-cols-4 sm:grid-cols-5 items-center w-full p-4 shadow-all-sides rounded-md'>
                                        <p className='sm:col-span-2'>#{order._id}</p>
                                        <p className='text-center'>{order.orderStatus}</p>
                                        <p className='text-end'>{order.orderItems.length}</p>
                                        <p className='text-end'>₹{order.totalPrice}</p>
                                    </Link>
                                )
                            })
                        }
                    </div>


                </>}


        </div>
    )
}

export default Orders
