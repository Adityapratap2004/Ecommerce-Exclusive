import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
const accountOptions = [
    {
        name: "My Profile",
        link: "/account"
    },
    {
        name: "Edit Profile",
        link: "edit-profile"
    },
    {
        name: "Change Password",
        link: "change-password"
    },
    {
        name: "My Order",
        link: "orders"
    }
]

const AccountPage = () => {
     const {user}=useSelector(state=>state.user);
     const location=useLocation();
     console.log(location);

    return (
        <div className='flex w-full h-[90vh] '>
            <div className='py-4 space-y-2 pr-4 sm:w-1/3 md:w-1/4 lg:w-1/6 border-r-2 hidden sm:block h-full'>
               
                <h3 className='text-lg pt-6'>Your account</h3>
                <ul >
                    {
                        
                        accountOptions.map((opt, index) => {
                            const isActive = location.pathname === opt.link || location.pathname.split('/').filter(Boolean).pop()===opt.link;
                            return <li key={index}><Link to={opt.link} > <Button className={`w-full flex justify-start bg-transparent text-text2 ${isActive? 'bg-secondary2 text-white':''} hover:bg-secondary2 hover:text-white `} >{opt.name}</Button></Link></li>
                        })
                    }
                </ul>
            </div>
            <div className='sm:pl-5 py-5 w-full' >
                <Outlet />
            </div>
        </div>
    )
}

export default AccountPage
