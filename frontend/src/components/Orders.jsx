import { clearError, getOrders } from '@/store/Slice/orderSlice';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader';
import SubHeading from './SubHeading';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import MetaData from '@/Layout/MetaData';

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
            <MetaData title="Orders"/>
            {orders.length === 0 ?
                <div className=' flex flex-col w-full h-[80vh] justify-center items-center'>
                    <h1 className='text-6xl font-bold mb-5 text-center'>You have not placed any orders yet</h1>
                    <Link to="/products"><Button className="bg-secondary2 text-white hover:bg-secondary3"><ArrowLeft className='mr-3' />  Buy Products</Button></Link>
                </div> : <> <SubHeading subHeading={"Your orders"} />
                    <div className='grid grid-cols-3  w-full p-4 shadow-all-sides rounded-md mb-6'>
                        {/* <p className='sm:col-span-2'>Order ID</p> */}
                        <p className='text-start '>Status</p>
                        <p className='text-center'>Item Qty</p>
                        <p className='text-end'>Amount</p>
                    </div>
                    <div className='space-y-5'>
                        {
                            orders.map((order) => {
                                return (
                                    <Link to={`/account/order/${order._id}`} key={order._id} className='relative grid grid-cols-3 items-center w-full p-4 pt-8 shadow-all-sides rounded-md'>
                                        <p className=' absolute top-2 left-4'>#{order._id}</p>
                                        <p className='text-start'>{order.orderStatus}</p>
                                        <p className='text-center'>{order.orderItems.length}</p>
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
