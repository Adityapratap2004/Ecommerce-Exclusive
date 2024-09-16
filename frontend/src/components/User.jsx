import React, { useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { useNavigate } from 'react-router-dom'
import { LayoutDashboard, User2Icon,LogOut } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/Slice/userSlice';
;


const User = ({ user, isAuthenticated }) => {

    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const handlUser = () => {
        if (!isAuthenticated) {
            navigate("/login");
        }else{
        setIsOpen(!isOpen);
        }
        setIsOpen(!isOpen);
    }

    function Logout (){
        dispatch(logoutUser());
    }

    function DashBoard(){
        navigate("/dashboard");
    }
    function Account(){
        navigate("/account");
    }

    const userControls=[
        
        {
            icon:<LayoutDashboard strokeWidth={1.5}/>,
            fuc:"DashBoard",
            onClick:DashBoard,
            link:"/",
        },
        {
            icon:<User2Icon strokeWidth={1.5}/>,
            fuc:"Account",
            onClick:Account,
            link:"/",
        },
        {
            icon: <LogOut strokeWidth={1.5}/>,
            fuc:"Logout",
            onClick:Logout,
            link:"/",
        },
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
                            userControls.map((controls,idx)=>{
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
