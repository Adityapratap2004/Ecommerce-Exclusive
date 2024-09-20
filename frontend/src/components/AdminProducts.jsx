import { clearError, clearMessage, clearSuccess, deleteProduct, getAllAdminProducts } from '@/store/Slice/adminSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import SubHeading from './SubHeading';
import { ArrowLeft, Delete, Edit, Trash2 } from 'lucide-react';
import Loader from './Loader';
import toast from 'react-hot-toast';
import MetaData from '@/Layout/MetaData';

const AdminProducts = () => {
    
    const dispatch=useDispatch();
    const {products,error,isLoading,isSuccess,message}=useSelector(state=>state.admin)

    const navigate=useNavigate();
    


    const handleDeleteProduct=(id)=>{
        dispatch(deleteProduct(id));
    }

    useEffect(()=>{
        dispatch(getAllAdminProducts());
    },[dispatch]);

    useEffect(()=>{
        if(isSuccess && message){
            toast.success(message);
            dispatch(clearMessage());
            dispatch(clearSuccess());
        }
    },[isSuccess]);

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearError())
        }

    },[error]);


    if(isLoading) return <Loader/>    
    return (
        <div className='py-4 text-text2 min-h-[90vh] h-full '>
            <MetaData title="Product List"/>
            {products && products.length === 0 ?
                <div className=' flex flex-col w-full h-[80vh] justify-center items-center'>
                    <h1 className='text-6xl font-bold mb-5 text-center'>You have not created a Product yet</h1>
                    <Link to="/admin/createproduct"><Button className="bg-secondary2 text-white hover:bg-secondary3"><ArrowLeft className='mr-3' />Create Products</Button></Link>
                </div> : <> <SubHeading subHeading={"Your Products"} />
                    <div className='grid grid-cols-4 sm:grid-cols-5 w-full p-4 shadow-all-sides rounded-md mb-6'>
                        <p className='sm:col-span-2'>Name</p>
                        <p className='text-center'>Stock</p>
                        <p className='text-end'>Price</p>
                        <p className='text-end'>Actions</p>
                    </div>
                    <div className='space-y-5'>
                        {
                           products && products.map((product) => {
                                return (
                                    <div key={product._id} className=' relative grid grid-cols-4 sm:grid-cols-5 items-center w-full p-4 pt-8 shadow-all-sides rounded-md'>
                                        <p className=' absolute top-2 left-4'>Product ID: #{product._id}</p>
                                        <p className='sm:col-span-2 font-semibold'>{product.name}</p>
                                        <p className='text-center'>{product.stock}</p>
                                        <p className='text-end'>₹{product.price}</p>
                                        <p className='text-end flex justify-end gap-2'><Edit onClick={()=>{navigate(`/admin/editproduct/${product._id}`)}} className='hover:text-green-500 cursor-pointer'/> <Trash2 onClick={()=>{handleDeleteProduct(product._id)}} className='hover:text-red-500 cursor-pointer'/></p>
                                    </div>
                                )
                            })
                        }
                    </div>
                 

                </>}


        </div>
    )
}

export default AdminProducts
