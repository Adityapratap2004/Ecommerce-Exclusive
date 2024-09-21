import React, { useEffect, useState } from 'react'
import SubHeading from './SubHeading';
import { Button } from './ui/button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, resetPassword} from '@/store/Slice/userSlice';
import toast from 'react-hot-toast';
import Loader from './Loader';

const ResetPassword = () => {

    const dispatch=useDispatch();
    const {isAuthenticated,isLoading,error}=useSelector(state=>state.user);
    const navigate=useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {token}=useParams();

    const handleForgotPassword = (e) => {
        e.preventDefault();
        dispatch(resetPassword({token,password,confirmPassword}))
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearError());
        }

        if(isAuthenticated){
            toast.success("Password have be changed");
            navigate("/");
        }

    },[error,isAuthenticated])

    if(isLoading) return <Loader/>

    return (
        <div className='w-full h-[100vh] flex justify-center items-center' >
            <div className='w-[80%]  '>

                <div className=' flex flex-col shadow-all-sides w-full justify-evenly items-center p-5 sm:p-10'>
                    <h3 className='text-xl py-8'>Forgot password</h3>
                                        
                            <form onSubmit={handleForgotPassword} className='flex w-full sm:w-1/2 flex-col gap-y-11'>
                                <div className='flex flex-col'>
                                    <label className='py-2'>New Password</label>
                                    <input value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter New Password' type="password" className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm ' />

                                </div>
                                <div className='flex flex-col'>
                                    <label className='py-2'>Confirm Password</label>
                                    <input value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder='Confirm New Password' type="password" className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm ' />
                                </div>
                                <Button className=" bg-secondary2 hover:bg-secondary3 text-white">Change Password</Button>
                                <div className='flex justify-end'>
                                    <Link to="/" className='hover:underline text-text2 underline-offset-1 '>Back to Home</Link>
                                </div>
                            </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
