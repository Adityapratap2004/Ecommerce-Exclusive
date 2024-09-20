import React, { useEffect, useState } from 'react'
import SubHeading from './SubHeading'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './ui/button';
import { clearError, clearIsUpdate, updateUser } from '@/store/Slice/userSlice';
import Loader from './Loader';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MetaData from '@/Layout/MetaData';




const EditProfile = () => {

    const { user,isLoading,error,isUpdated } = useSelector(state => state.user);
    const [userData,setUserData]=useState({name:user.name,email:user.email})
    const [avatar,setAvatar]=useState();
    const [avatarPreview,setAvatarPreview]=useState(user.avatar.url);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    
    const handleChange=(e)=>{
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUserData({...userData,[e.target.name]:e.target.value})
        }
      
    }

    const handleUpdateProfile=(e)=>{
        e.preventDefault();
        const newForm=new FormData();
        newForm.set("name",userData.name);
        newForm.set("email",userData.email);
        newForm.set("avatar",avatar);
        dispatch(updateUser(newForm));
    }

    useEffect(()=>{
        if(isUpdated){
           toast.success("Profile Updated Successfully");
           dispatch(clearIsUpdate());
           navigate("/account")           
        }

    },[isUpdated]);

    useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearError())
        }
      }, [error]);


    if(isLoading) return <Loader/>

    return (
        <div className='w-full h-full' >
            <SubHeading subHeading={"Edit Your Profile"} />
            <MetaData title="Edit Profile"/>
            <div className='flex flex-col sm:flex-row shadow-lg w-full justify-evenly items-center p-5 sm:p-10'>
                <img src={avatarPreview} className=' rounded-full w-1/4 h-1/3' />
                <form  onSubmit={handleUpdateProfile} className='flex w-full sm:w-1/2 flex-col gap-y-11'>
                    <div className='flex flex-col'>
                        <label className='py-2'>Name</label>
                        <input value={userData.name} name="name" type="text" onChange={handleChange} required  className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm focus:text-black ' />
                      
                    </div>
                    <div className='flex flex-col'>
                        <label className='py-2'>Email</label>
                        <input value={userData.email} name="email" type="email" onChange={handleChange} required  className=' text-text2 bg-secondary h-10 px-2 w-full  outline-none border-none rounded-sm focus:text-black ' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='py-2'>Profile Image</label>
                        <input type="file" name="avatar" accept="image/*" onChange={handleChange} className=' text-text2 bg-secondary h-10 px-2 w-full  outline-none border-none rounded-sm ' />
                    </div>
                    <Button className=" bg-secondary2 hover:bg-secondary3 text-white">Update Profile</Button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
