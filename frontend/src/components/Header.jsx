import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { nav_link } from '@/assets/data'
import { Input } from './ui/input'
import { Heart, Search, ShoppingBagIcon } from 'lucide-react'
import User from './User'
import { useSelector } from 'react-redux'



const Header = () => {

    const {user,isAuthenticated}=useSelector(state=>state.user);

    const navigate=useNavigate();
    const [keyword,setKeyword]=useState("");
    const handleSearch=()=>{
        navigate(`/products?keyword=${keyword}`)        
    }
    return (
        <header className='border-b-2'>
            <div className='container flex  w-full justify-between items-center py-4 '>

                <h1 className=' text-3xl font-extrabold'><Link to="/">Exclusive</Link></h1>
                <nav className='hidden relative top-1  md:flex'>
                    {
                        nav_link.map((link) => {
                            return <Link to={link.link} key={link.id}><Button variant="link" className="text-base decoration-slate-300">{link.nav}</Button></Link>
                        })
                    }
                </nav>
                <section className='flex items-center gap-5'>
                    <div className=' relative hidden sm:block'>
                        <Input type="text" placeholder="What are you looking for?" className=" focus-visible:ring-0 border-non bg-secondary0 w-60" value={keyword} onChange={(e)=>{setKeyword(e.target.value)}} />
                        <Search strokeWidth={1.5} className='absolute top-2 right-4 cursor-pointer' onClick={handleSearch} />
                    </div>
                    <div className='flex gap-5 *:cursor-pointer items-center'>
                        <Heart strokeWidth={1.5} />
                        <Link to="/cart"><ShoppingBagIcon strokeWidth={1.5} /></Link>
                        <User user={user} isAuthenticated={isAuthenticated}/>
                    </div>
                
                </section>
            </div>
        </header>

    )
}

export default Header
