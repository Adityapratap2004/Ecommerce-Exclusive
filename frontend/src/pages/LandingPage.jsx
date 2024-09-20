import Banner from '@/components/Banner'
import BestSellingProducts from '@/components/BestSellingProducts'
import FlashSale from '@/components/FlashSale'
import Loader from '@/components/Loader'
import MetaData from '@/Layout/MetaData'
import { fetchProducts } from '@/store/Slice/productSlice'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'


const LadingPage = () => {
    const dispatch = useDispatch();
    const { products, isLoading, error } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        dispatch(fetchProducts());
    }, [dispatch, error])



    if (isLoading) {
        return <Loader />
    }
    return (
        <main className=' space-y-24'>
            <MetaData title={"Exclusive"} />
           
            <Banner />
            {/* <FlashSale products={products}/> */}
            <BestSellingProducts products={products} />
            {/* features */}
            <div className=' grid sm:grid-cols-3 space-y-20 sm:space-y-0   pb-20'>
                <div className='flex flex-col  items-center'>
                    <div className='bg-black rounded-full p-3 items-center justify-center border-8 border-gray-200'><img src="/icon-delivery.png" /></div>
                    <h1 className=' uppercase font-bold'>Free And Fast delivery</h1>
                    <p className='text-text2 text-sm'>Free delivery for all orders over ₹2000</p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='bg-black rounded-full p-3 items-center justify-center border-8 border-gray-200'><img src="/Icon-Customer service.png" /></div>
                    <h1 className=' uppercase font-bold'>Free And Fast delivery</h1>
                    <p className='text-text2 text-sm'>Free delivery for all orders over ₹2000</p>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='bg-black rounded-full p-3 items-center justify-center border-8 border-gray-200'><img src="/Icon-secure.png" /></div>
                    <h1 className=' uppercase font-bold'>Free And Fast delivery</h1>
                    <p className='text-text2 text-sm'>Free delivery for all orders over ₹2000</p>
                </div>
            </div>
            
        </main>
    )
}

export default LadingPage
