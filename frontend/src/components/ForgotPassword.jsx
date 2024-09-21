import React, { useEffect, useState } from 'react'
import SubHeading from './SubHeading';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, clearSendLink, passwordRestLink } from '@/store/Slice/userSlice';
import toast from 'react-hot-toast';
import Loader from './Loader';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const { isLoading, error, sendLink } = useSelector(state => state.user);
    const [email, setEmail] = useState("");

    const handleForgotEmail = (e) => {
        e.preventDefault();
        dispatch(passwordRestLink(email));
    }

    useEffect(() => {
        if (sendLink) {
            toast.success("Password reset link is sent to your email");
            dispatch(clearSendLink());
        }
        if (error) {
            toast.error(error);
            dispatch(clearError());
        }

    }, [sendLink, error]);

    if(isLoading) return <Loader/>

    return (
        <div className='w-full h-[100vh] flex justify-center items-center' >
            <div className='w-[80%]  '>

                <div className=' flex flex-col shadow-all-sides w-full justify-evenly items-center p-5 sm:p-10'>
                    <h3 className='text-xl py-8'>Forgot password</h3>
                    <form onSubmit={handleForgotEmail} className='flex w-full sm:w-1/2 flex-col gap-y-11'>
                        <div className='flex flex-col'>
                            <label className='py-2'>Email</label>
                            <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Your Email' type="email" className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm ' />

                        </div>
                        <Button className=" bg-secondary2 hover:bg-secondary3 text-white">Send Email For Password Reset Link</Button>
                        <div className='flex justify-end'>
                            <Link to="/" className='hover:underline text-text2 underline-offset-1 '>Back to Home</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
