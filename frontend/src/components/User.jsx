import React, { useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { Link, useNavigate } from 'react-router-dom'
import { LayoutDashboard, User2Icon, LogOut, HomeIcon, ShoppingCart, PhoneCall, Headset, AppWindow } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/Slice/userSlice';




const User = ({ user, isAuthenticated }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    
    const handlUser = () => {
        if (!isAuthenticated) {
            navigate("/login");
        } else {
            setIsOpen(!isOpen);
        }
        setIsOpen(!isOpen);
    }

    function Logout() {
        dispatch(logoutUser());
    }

    function DashBoard() {
        navigate("/admin");
    }
    function Account() {
        navigate("/account");
    }

    const userControls = [


        {
            icon: <User2Icon strokeWidth={1.5} />,
            fuc: "Account",
            onClick: Account,

        },
        {
            icon: <LogOut strokeWidth={1.5} />,
            fuc: "Logout",
            onClick: Logout,

        },
    ]

    const nav_link=[
        {
            id:1,
            nav:"Home",
            link:"/",
            icon:<HomeIcon strokeWidth={1.5}/>
        },
        {
            id:2,
            nav:"Products",
            link:"/products",
            icon:<ShoppingCart strokeWidth={1.5} />
        },{
            id:3,
            nav:"About",
            link:"/about",
            icon:<AppWindow strokeWidth={1.5}/>
        },
        {
            id:4,
            nav:"Contact Us",
            link:"/contactus",
            icon:<Headset strokeWidth={1.5}/>
        }
    ]
    



    return (
        <div className=' relative'>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <div className=' rounded-full' onClick={handlUser}>
                            {
                                user?.avatar ? <img src={user.avatar.url} alt="user" className="h-8 rounded-full" /> :
                                    <img src="/Profile.png" alt="user" className="h-8 rounded-full" />}
                        </div>
                        <TooltipContent>
                            <p>{isAuthenticated ? user.name : 'login'}</p>
                        </TooltipContent>
                    </TooltipTrigger>
                </Tooltip>
            </TooltipProvider>
            <div className='absolute'>
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                        <button className='transparent'></button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        {
                            nav_link.map((nav) => {
                                return <DropdownMenuItem className="block md:hidden" key={nav.id}><Link to={nav.link} className=' flex  w-40 gap-4 cursor-pointer'>{nav.icon}<p>{nav.nav}</p></Link></DropdownMenuItem>
                            })
                        }
                        {user && user.role === "admin" && <DropdownMenuItem ><div onClick={DashBoard} className=' flex w-40 gap-4 cursor-pointer'>{<LayoutDashboard strokeWidth={1.5} />}<p>DashBoard</p></div></DropdownMenuItem>}
                        {
                            userControls.map((controls, idx) => {
                                return <DropdownMenuItem key={idx}><div onClick={controls.onClick} className=' flex w-40 gap-4 cursor-pointer'>{controls.icon}<p>{controls.fuc}</p></div></DropdownMenuItem>
                            })
                        }


                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </div>
    )
}

export default User
