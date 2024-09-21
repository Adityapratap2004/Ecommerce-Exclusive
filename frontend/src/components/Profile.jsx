import React from 'react'
import SubHeading from './SubHeading'
import { useSelector } from 'react-redux'
import MetaData from '@/Layout/MetaData';




const Profile = () => {

    const { user } = useSelector(state => state.user);
    return (
        <div className='w-full h-full' >
            <SubHeading subHeading={"Your Profile"} />
            <MetaData title="Profile"/>
            <div className='flex flex-col sm:flex-row shadow-all-sides rounded-md w-full justify-evenly items-center p-5 sm:p-10'>
                <img src={user.avatar.url} className=' rounded-full w-1/4 h-1/3' />
                <form className='flex w-full sm:w-1/2 flex-col gap-y-11'>
                    <div className='flex flex-col'>
                        <label className='py-2'>Name</label>
                        <input readOnly value={user.name} className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm ' />
                      
                    </div>
                    <div className='flex flex-col'>
                        <label className='py-2'>Email</label>
                        <input readOnly value={user.email} className=' text-text2 bg-secondary h-10 px-2 w-full  outline-none border-none rounded-sm ' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='py-2'>Joined On</label>
                        <input readOnly value={user.createdAt.substr(0,10)} className=' text-text2 bg-secondary h-10 px-2 w-full  outline-none border-none rounded-sm ' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile
