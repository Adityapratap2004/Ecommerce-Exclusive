import React from 'react'
import SubHeading from './SubHeading'
import MetaData from '@/Layout/MetaData'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const ConfirmOrder = () => {
    const { user } = useSelector(state => state.user);
    const shippingInfo = useSelector(state => state.cart.shippingInfo);
    const cart = useSelector(state => state.cart.cartItems);
    const naviagte=useNavigate();
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const shippingCharges = subtotal > 1000 ? 0 : 200;
    const tax = subtotal * 0.18;
    const totalPrice = subtotal + tax + shippingCharges;
    const proceedToPayment = () => {
        const data = {
          subtotal,
          shippingCharges,
          tax,
          totalPrice,
        };
    
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        naviagte("/process/payment");
      };
    return (
        <div className='w-full h-full mt-10'>
            <MetaData title="confirm order" />
            <SubHeading subHeading={"Confirm Order"} />
            <div className='flex flex-col md:flex-row my-7 w-full gap-6 text-text2'>
                <div className=' md:w-3/4  shadow-all-sides rounded-md px-5 py-7'>
                    <div>
                        <h1 className='text-xl font-semibold '>Shipping Details</h1>
                        <div className='sm:pl-5 pt-4'>
                            <p>Name: {user.name}</p>
                            <p>Phone No: {shippingInfo.phoneNo}</p>
                            <p>Address: {address} </p>
                        </div>
                    </div>
                    <div>
                        <h1 className='text-xl font-semibold mt-7'>Your Cart Items</h1>
                        <div className='sm:pl-5 pt-4 flex flex-col space-y-3'>
                            {
                                cart.map((cartItem) => {
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
                    <h1 className='text-xl font-semibold text-center'>Order Summary</h1>

                    <div className='sm:pl-5 pt-4 py-5 border-t-2 border-b-2 mt-10'>
                        <div className='flex justify-between'>
                            <span>Subtotal</span> <span>₹{subtotal}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Shipping Charge</span> <span>₹{shippingCharges}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>GST: </span> <span>₹{tax.toFixed(2)}</span>
                        </div>
                    </div>
                    <div className='flex justify-between sm:pl-5 pt-4'>
                        <span>Total: </span> <span>₹{totalPrice}</span>
                    </div>
                    <div className='flex w-full my-10'>
                        <Button className="w-full bg-secondary2 hover:bg-secondary3 text-white " onClick={proceedToPayment}>Proceed To Payment</Button>
                    </div>
                </div>
            </div>

        </div >



    )
}

export default ConfirmOrder
