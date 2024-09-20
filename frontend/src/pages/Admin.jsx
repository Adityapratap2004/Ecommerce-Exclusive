import { Button } from '@/components/ui/button';
import MetaData from '@/Layout/MetaData';
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';

const adminOptions = [
    {
        name: "Dashboard",
        link: "/admin"
    },
    {
        name: "Products",
        link: "products"
    },
    {
        name: "Create Products",
        link: "createproduct"
    },
    {
        name: "Orders",
        link: "orders"
    },
    // {
    //     name: "User",
    //     link: "user"
    // },
    // {
    //     name: "Reviews",
    //     link: "reviews"
    // }
]

const Admin = () => {
    const location = useLocation();
    return (
        <div className='flex w-full min-h-[90vh] h-auto'>
           
            <div className='py-4  space-y-2 pr-4 sm:w-1/3 md:w-1/4 lg:w-1/6 border-r-2 hidden sm:block  h-auto'>
                <h3 className='text-lg pt-6'>Admin Panel</h3>
                <ul >
                    {

                        adminOptions.map((opt, index) => {
                            const isActive = location.pathname === opt.link || location.pathname.split('/').filter(Boolean).pop() === opt.link;
                            return <li key={index}><Link to={opt.link} > <Button className={`w-full flex justify-start bg-transparent text-text2 ${isActive ? 'bg-secondary2 text-white' : ''} hover:bg-secondary2 hover:text-white `} >{opt.name}</Button></Link></li>
                        })
                    }
                </ul>
            </div>
            <div className='sm:pl-5 py-5 w-full' >
                    <ul className='grid grid-cols-2 sm:hidden mb-5  gap-2'>
                        {

                            adminOptions.map((opt, index) => {
                                const isActive = location.pathname === opt.link || location.pathname.split('/').filter(Boolean).pop() === opt.link;
                                return <li key={index}><Link to={opt.link} > <Button className={`w-full  flex justify-start bg-transparent text-text2 ${isActive ? 'bg-secondary2 text-white' : 'outline outline-1'} hover:bg-secondary2 hover:text-white `} >{opt.name}</Button></Link></li>
                            })
                        }
                    </ul>
                

                <Outlet />
            </div>
        </div>
    )
}

export default Admin
