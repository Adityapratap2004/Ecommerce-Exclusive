import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { clearError, loginUser, registerUser } from '@/store/Slice/userSlice';
import {  LockIcon, MailIcon, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const LoginSingup = () => {

    const {d,isLoading,error,isAuthenticated}=useSelector(state=>state.user);
    const [page, setPage] = useState('login');
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({ name: "", email: "", password: "", avatar: "" });
    const { name, email, password } = user;

    const dispatch=useDispatch();
    const navigate=useNavigate();
    

    const [avatar, setAvatar] = useState("/Profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }

    const handleRegister=(e)=>{
        e.preventDefault();
        const myForm = new FormData();
       

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(registerUser(myForm));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({loginEmail,loginPassword}));
    }

    const  [searchParmas,setSearchParmas]=useSearchParams();
    const redirect=searchParmas.get("redirect")?`/${searchParmas.get("redirect")}`:"/";

    useEffect(()=>{
        if(error){
            toast.error(error);
            dispatch(clearError());
        }

        if(isAuthenticated){
            navigate(redirect);
        }
        
    },[error,isAuthenticated,redirect]);

    if(isLoading) return <Loader/>
    return (
        <div className='  h-[100vh] w-[100vw] flex items-center justify-center'>
            <div className=' w-full h-full md:w-[50%] md:h-[85%] lg:w-[30%]  bg-white overflow-hidden relative shadow-all-sides rounded-md '>
                <div className='flex  *:h-16 '>
                    <button className=' w-full   ' onClick={() => { setPage('login') }}>LOGIN</button>
                    <button className='w-full ' onClick={() => setPage('register')}>REGISTER</button>
                </div>
                <div className={`flex w-1/2 h-1 bg-secondary3 transition-all duration-300  ${page === 'login' ? '' : ' translate-x-[100%]'} `}></div>

                <form onSubmit={handleLogin} className={`flex flex-col w-full h-[calc(100%-64px)] *:w-full p-8 items-center justify-evenly transition-all duration-300 ${page === 'login' ? '' : '-translate-x-[100%]'}`}>
                    <div className=' relative'>
                        <MailIcon className='absolute top-4 left-2' />
                        <input
                            className=' pl-10 h-14 w-full ring-1 ring-black outline-none border-none rounded-sm '
                            type="email"
                            placeholder="Email"
                            required
                            value={loginEmail}
                            onChange={(e) => { setLoginEmail(e.target.value) }}
                        />
                    </div>
                    <div className='relative'>
                        <LockIcon className='absolute top-4 left-2' />
                        <input
                            className=' pl-10 h-14 w-full ring-1 ring-black outline-none border-none rounded-sm'
                            type="password"
                            placeholder="Password"
                            required
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex justify-end'>
                        <Link to="/password/forgot" className=' text-text2 hover:underline'>Forgot Passsword?</Link>
                    </div>
                    <Button className="h-14 bg-secondary2 hover:bg-secondary3 text-lg ">Login</Button>
                </form>
                <form onSubmit={handleRegister} className={`flex flex-col w-full h-[calc(100%-64px)] *:w-full p-8 items-center justify-evenly -translate-y-[100%] transition-all duration-300  ${page === 'register' ? '-translate-x-0' : ' -translate-x-[100%]'}  `}>
                    <div className='relative'>
                        <User className='absolute top-4 left-2' />
                        <input
                            className=' pl-10 h-14 w-full ring-1 ring-black outline-none border-none rounded-sm'
                            type="text"
                            placeholder="Name"
                            required
                            name="name"
                            value={name}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div className=' relative'>
                        <MailIcon className='absolute top-4 left-2' />
                        <input
                            className=' pl-10 h-14 w-full ring-1 ring-black outline-none border-none rounded-sm'
                            type="email"
                            placeholder="Email"
                            required
                            name="email"
                            value={email}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div className='relative'>
                        <LockIcon className='absolute top-4 left-2' />
                        <input
                            className=' pl-10 h-14 w-full ring-1 ring-black outline-none border-none rounded-sm '
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                            value={password}
                            onChange={registerDataChange}
                        />
                    </div>
                    <div className='flex items-center gap-4'>
                        <img src={avatarPreview} alt="Avtar Preview" className='w-14 rounded-full overflow-hidden'  />
                        <div>
                            <input
                                className='hidden'
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
                                id='file-upload'

                            />
                            <label htmlFor="file-upload" className="cursor-pointer bg-gray-400 text-white py-2 px-4 rounded-md">
                                Upload File
                            </label>
                        </div>

                    </div>
                    <Button className="h-14 bg-secondary2 hover:bg-secondary3 text-lg ">Register</Button>
                </form>

                <Link to="/" className='text-text2 absolute bottom-3 left-7 hover:underline '>Back to Home</Link>

            </div>
        </div>
    )
}

export default LoginSingup
