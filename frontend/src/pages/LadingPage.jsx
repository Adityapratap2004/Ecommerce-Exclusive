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
        if(error){
            toast.error(error);
        }
        dispatch(fetchProducts());
    }, [dispatch,error])

   

    if (isLoading) {
        return <Loader/>
    }
    return (
        <main className=' space-y-24'>
            <MetaData title={"Exclusive"} />
            <Banner />
            {/* <FlashSale products={products}/> */}
            <BestSellingProducts products={products}/>
        </main>
    )
}

export default LadingPage
