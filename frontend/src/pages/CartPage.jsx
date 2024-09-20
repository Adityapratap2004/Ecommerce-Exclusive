import SubHeading from '@/components/SubHeading'
import { Button } from '@/components/ui/button';
import MetaData from '@/Layout/MetaData';
import { addItemsToCart, removeCartItem } from '@/store/Slice/cartSlice';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
    const cart = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const handleRemove = (cartItemId) => {
        dispatch(removeCartItem(cartItemId))
    }

    const decreaseCount = (cartItem) => {
        if (cartItem.quantity === 1) return
        cartItem = { ...cartItem, quantity: cartItem.quantity - 1 };
        dispatch(addItemsToCart(cartItem));
    }
    const increaseCount = (cartItem) => {
        if (cartItem.quantity === cartItem.stock) return;
        cartItem = { ...cartItem, quantity: cartItem.quantity + 1 };
        dispatch(addItemsToCart(cartItem))

    }

    const handleCheckOut=()=>{
        navigate("/login?redirect=shipping");
    }

    return (
        <div className='py-10 text-text2 min-h-[90vh] '>
            <MetaData title="Cart"/>
            {cart.length === 0 ?
                <div className=' flex flex-col w-full h-[80vh] justify-center items-center'>
                    <h1 className='text-6xl font-bold mb-5 text-center'>No Items in The Cart</h1>
                    <Link to="/products"><Button className="bg-secondary2 text-white hover:bg-secondary3"><ArrowLeft className='mr-3' />  Back to Products</Button></Link>
                </div> : <> <SubHeading subHeading={"Cart"} />
                    <div className='grid grid-cols-4 sm:grid-cols-5 w-full p-4 shadow-all-sides rounded-md mb-6'>
                        <p className='col-span-3'>Product</p>
                        <p className='hidden sm:block text-center'>Quantity</p>
                        <p className='text-end'>Sub total</p>
                    </div>
                    <div className='space-y-5'>
                        {
                            cart.map((cartItem) => {
                                return (<div key={cartItem._id} className='grid grid-cols-4 sm:grid-cols-5 items-center w-full p-4 shadow-all-sides rounded-md'>
                                    <div className='col-span-3 flex items-center gap-6'>
                                        <div>
                                            <img src={cartItem.image} alt="product img" className=' h-16' />
                                        </div>
                                        <div>
                                            <p className='text-black  font-medium'>{cartItem.name}</p>
                                            <p>${cartItem.price}</p>
                                            <p className=' cursor-pointer text-secondary2' onClick={() => { handleRemove(cartItem._id) }}>Remove</p>
                                        </div>
                                    </div>
                                    <div className='hidden sm:flex items-center justify-center *:h-12'>
                                        <Button className=" w-10 border rounded-none rounded-l-md bg-white text-text2 hover:text-text1 hover:bg-secondary2 text-lg md:text-2xl" onClick={() => { decreaseCount(cartItem) }}>-</Button>
                                        <span className='w-10  flex justify-center items-center border '>{cartItem.quantity}</span>
                                        <Button className=" w-10 border rounded-none rounded-r-md bg-white text-text2 hover:text-text1 hover:bg-secondary2 text-lg md:text-2xl" onClick={() => { increaseCount(cartItem) }}>+</Button>
                                    </div>
                                    <div className='text-end'>${cartItem.quantity * cartItem.price}</div>
                                </div>)
                            })
                        }
                    </div>
                    <div className='flex flex-row w-full justify-between px-4 my-10'>
                        <Button className="bg-secondary2 text-white hover:bg-secondary3 px-10" onClick={handleCheckOut} >Check Out <ArrowRight className='ml-3'/></Button>
                        <div className='text-lg font-semibold'>Subtotal: <span className='ml-3 text-secondary2'>{`₹${cart.reduce(
                            (acc,item)=>acc+item.quantity*item.price,0)}`}
                        </span></div>
                    </div>


                </>}


        </div>
    )
}

export default CartPage
