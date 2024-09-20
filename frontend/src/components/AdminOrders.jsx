import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader';
import SubHeading from './SubHeading';
import { Button } from './ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { clearError, deleteAdminOrders, getAdminOrders } from '@/store/Slice/adminSlice';
import MetaData from '@/Layout/MetaData';

const AdminOrders = () => {
    const { orders, isLoading, error } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const handleDeleteOrder=(id)=>{
        dispatch(deleteAdminOrders(id))
    }

    useEffect(() => {
        dispatch(getAdminOrders());
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
        <div className='py-4 text-text2 min-h-[90vh] h-full '>
            <MetaData title="Your Orders"/>
            {orders && orders.length === 0 ?
                <div className=' flex flex-col w-full h-[80vh] justify-center items-center'>
                    <h1 className='text-6xl font-bold mb-5 text-center'>No orders</h1>
                    <Link to="/admin/products"><Button className="bg-secondary2 text-white hover:bg-secondary3"><ArrowLeft className='mr-3' />Your Products</Button></Link>
                </div> : <> <SubHeading subHeading={"Your Orders"} />
                    <div className='grid grid-cols-4 sm:grid-cols-5 w-full p-4 shadow-all-sides rounded-md mb-6'>
                        <p className='sm:col-span-2'>Status</p>
                        <p className='text-center'>Items Qty</p>
                        <p className='text-end'>Price</p>
                        <p className='text-end'>Actions</p>
                    </div>
                    <div className='space-y-5'>
                        {
                            orders && orders.map((order) => {
                                return (
                                    <div key={order._id} className=' relative grid grid-cols-4 sm:grid-cols-5 items-center w-full p-4 pt-8 shadow-all-sides rounded-md'>
                                        <p className=' absolute top-2 left-4'>Order ID: #{order._id}</p>
                                        <p className='sm:col-span-2 font-semibold'>{order.orderStatus}</p>
                                        <p className='text-center'>{order.orderItems.length}</p>
                                        <p className='text-end'>₹{order.totalPrice}</p>
                                        <p className='text-end flex justify-end gap-2'><Edit onClick={() => { navigate(`/admin/processorder/${order._id}`) }} className='hover:text-green-500 cursor-pointer' /> <Trash2 onClick={() => { handleDeleteOrder(order._id) }} className='hover:text-red-500 cursor-pointer' /></p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>}
        </div>
    )
}

export default AdminOrders
