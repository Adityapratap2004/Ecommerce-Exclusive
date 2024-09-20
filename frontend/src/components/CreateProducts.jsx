import React, { useEffect, useState } from 'react'
import SubHeading from './SubHeading'
import { Button } from './ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { clearSuccess, createProduct } from '@/store/Slice/adminSlice'
import { categories } from '@/assets/data'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import MetaData from '@/Layout/MetaData'

const CreateProducts = () => {

    const {isLoading,isSuccess,error}=useSelector(state=>state.admin)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const handleCreateProduct = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("discount",discount);
        myForm.set("stock", stock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(createProduct(myForm));
        

    }
    const handleImageChange=(e)=>{
        const files=Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file)=>{
            const reader=new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2){
                    setImagesPreview((old)=>[...old,reader.result]);
                    setImages((old)=>[...old,reader.result]);
                }
            }
            reader.readAsDataURL(file);
        })
    }

    useEffect(()=>{
        if(error){
            toast.error(error);
        }
        if(isSuccess){
            toast.success("Product added  successfully");
            dispatch(clearSuccess());
            navigate("/admin/products");
        }
    },[error,isSuccess]);

    return (
        <div className='w-full h-full py-4 ' >
            <SubHeading subHeading={"Create Products"} />
            <MetaData title="Create Products"/>
            <form onSubmit={handleCreateProduct} className='flex flex-col sm:flex-row shadow-all-sides rounded-md w-full justify-evenly items-center p-5 sm:p-10'>
                <div className='w-full sm:w-1/2'>
                {
                    imagesPreview.length!==0 ? <div className='grid grid-cols-2 gap-2'>
                        {
                            imagesPreview.map((img,ind)=>(
                                <img key={ind} src={img} alt="Product imgaes" className='rounded-sm'/>
                            ))
                        }
                    </div> :<div className='flex justify-center '> <label className=' text-2xl font-semibold text-text2 cursor-pointer' htmlFor="images" >Add Images</label></div>
                }
                </div>
                <div  className='flex w-full sm:w-1/2 flex-col gap-y-4'>
                    <input type="file" name="avatar" accept='image/*' onChange={handleImageChange} id="images"   multiple className='hidden'/>
                    <div className='flex flex-col'>
                        <label className='py-2'>Product Name</label>
                        <input name="name" type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder='Enter product name' required className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm focus:text-black ' />

                    </div>
                    <div className='flex flex-col'>
                        <label className='py-2'>Description</label>
                        <input name="description" type="text" onChange={(e)=>{setDescription(e.target.value)}} placeholder='Enter the description of the product' required className=' text-text2 bg-secondary h-10 px-2 w-full  outline-none border-none rounded-sm focus:text-black ' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='py-2'>Price</label>
                        <input name="price" type="number"  onChange={(e)=>{setPrice(e.target.value)}} placeholder="Enter the price of the product" required className=' text-text2 bg-secondary h-10 px-2 w-full  outline-none border-none rounded-sm focus:text-black ' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='py-2'>Discount Percentage</label>
                        <input name="discount" value={discount} type="number" onChange={(e)=>{setDiscount(e.target.value)}} placeholder='Enter the discount %' required className=' text-text2 bg-secondary h-10 px-2 w-full  outline-none border-none rounded-sm focus:text-black ' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='py-2'>Category</label>
                        <select value={category} onChange={(e)=>{setCategory(e.target.value)}} required className=' text-text2 bg-secondary h-10 px-2 w-full  outline-none border-none rounded-sm focus:text-black '>
                            <option value="">Choose category</option>
                            {
                                categories.map((cat,ind)=>{
                                    return <option key={ind} value={cat}>{cat}</option>
                                })
                            }
                        </select>
                        
                    </div>
                    <div className='flex flex-col'>
                        <label className='py-2'>Stock</label>
                        <input name="stock" type="number" onChange={(e)=>{setStock(e.target.value)}} placeholder='Enter the stocks of the product' required className=' text-text2 bg-secondary h-10 px-2 w-full  outline-none border-none rounded-sm focus:text-black ' />
                    </div>
                    
                    <Button disabled={isLoading} type="submit" className=" bg-secondary2 hover:bg-secondary3 text-white">Create Product</Button>
                </div>
            </form>
        </div>
    )
}

export default CreateProducts
