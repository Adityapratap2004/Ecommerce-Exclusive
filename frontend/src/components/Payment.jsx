import MetaData from '@/Layout/MetaData';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useRef, useState } from 'react'
import SubHeading from './SubHeading';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { clearError, clearSuccess, createOrder } from '@/store/Slice/orderSlice';
import { clearCart } from '@/store/Slice/cartSlice';

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };
    const dispatch=useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useSelector(state => state.user);
    const {success,error}=useSelector(state=>state.order)
    const shippingInfo = useSelector(state => state.cart.shippingInfo)
    const cartItems = useSelector(state => state.cart.cartItems)
    const navigate = useNavigate();
    const ref = useRef(null);
    console.log(shippingInfo);
    const order={
        shippingInfo,
        orderItems:cartItems,
        itemsPrice:orderInfo.subtotal,
        taxPrice:orderInfo.tax,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice
    }

    const submitPayment = async (e) => {
        e.preventDefault();
        ref.current.disabled = true

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/payment/process`,
                paymentData,
                { withCredentials: true }
            )

            const client_secret = data.client_secret;
            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }
                }
            })

            if (result.error) {
                ref.current.disabled = false
                toast.error(result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    orderInfo.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    order.paymentInfo={
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status
                    }
                    dispatch(createOrder(order));                    
                } else {
                    toast.error("There's some issue while processing payment");
                }
            }

        } catch (error) {
            toast.error(error.response.data.message);
            ref.current.disabled = false
        }
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearError());
        }
        if(success){
            dispatch(clearSuccess());
            dispatch(clearCart());
            sessionStorage.removeItem('orderInfo');
            navigate("/success");
        }

    },[error,success]);

    return (
        <div>
            <MetaData title="Payment" />
            <SubHeading subHeading={"Payment"} />
            <div className='flex flex-col my-7 sm:flex-row shadow-all-sides rounded-md w-full justify-evenly items-center p-5 sm:p-10'>
                <form onSubmit={submitPayment} className='flex w-full sm:w-1/2 flex-col gap-y-5'>
                    <div className='flex flex-col'>
                        <label className='py-2'>Card Info</label>
                        <CardNumberElement required className=' text-text2 h-10 px-2 py-3 w-full bg-secondary outline-none border-none rounded-sm  ' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='py-2'>Expriry</label>
                        <CardExpiryElement required className=' text-text2 h-10 px-2 py-3 w-full bg-secondary outline-none border-none rounded-sm ' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='py-2'>Pin Code</label>
                        <CardCvcElement required className=' text-text2 h-10 px-2 py-3 w-full bg-secondary outline-none border-none rounded-sm ' />
                    </div>
                    <Button ref={ref} className=" bg-secondary2 hover:bg-secondary3 text-white">{`Pay - ₹${orderInfo && orderInfo.totalPrice}`} </Button>
                </form>
            </div>

        </div>
    )
}

export default Payment
