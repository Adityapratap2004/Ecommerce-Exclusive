import React, { useEffect, useState } from 'react'
import SubHeading from './SubHeading'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './ui/button';
import { changePassword, clearError, clearIsUpdate } from '@/store/Slice/userSlice';
import toast from 'react-hot-toast';
import Loader from './Loader';




const ChangePassword = () => {

    const dispatch=useDispatch();
    const { isLoading,isUpdated,error } = useSelector(state => state.user);
    const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");

    const handleChangePassword=(e)=>{
        e.preventDefault();
        dispatch(changePassword({oldPassword,newPassword,confirmPassword}));
    }

    useEffect(()=>{
        if(isUpdated){
            toast.success("Password is Updated Successfully");
            dispatch(clearIsUpdate());
        }
        if(error){
            toast.error(error);
            dispatch(clearError());
        }

    },[isUpdated,error])

    

    if(isLoading){
        return <Loader/>
    }
    return (
        <div className='w-full h-full' >
            <SubHeading subHeading={"Change Password"} />
            <div className='flex flex-col sm:flex-row shadow-lg w-full justify-evenly items-center p-5 sm:p-10'>
               
                <form onSubmit={handleChangePassword} className='flex w-full sm:w-1/2 flex-col gap-y-11'>
                    <div className='flex flex-col'>
                        <label className='py-2'>Old Password</label>
                        <input value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}} placeholder='Enter Old Password' type="password" className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm ' />
                      
                    </div>
                    <div className='flex flex-col'>
                        <label className='py-2'>New Password</label>
                        <input value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} placeholder='Enter New Password' type="password" className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm ' />
                      
                    </div>
                    <div className='flex flex-col'>
                        <label className='py-2'>Confirm Password</label>
                        <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder='Confirm New Password' type="password" className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm ' />
                    </div>
                    <Button className=" bg-secondary2 hover:bg-secondary3 text-white">Change Password</Button>
                    
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
