import { categories } from '@/assets/data';
import Loader from '@/components/Loader';
import ProductCard from '@/components/ProductCard';
import SubHeading from '@/components/SubHeading'
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Slider } from '@/components/ui/slider';
import useThrottle from '@/hooks/useThrottle';
import MetaData from '@/Layout/MetaData';
import { clearErrorOfProducts, fetchProducts } from '@/store/Slice/productSlice';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ReactStars from 'react-stars';



const Product = () => {

  const dispatch = useDispatch();
  const { products,resultPerPage, isLoading, filteredProductsCount, error } = useSelector(state => state.products);
  const [keyword, setKeyword] = useSearchParams();
  const [subHeading, setSubHeading] = useState("Products")
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(keyword.get('category'));
  const [price, setPrice] = useState([0, 10000]);
  const [rating, setRating] = useState(0);

  const handleSlider = (value) => {
    setPrice(value)
  }
 
  // Throttled fetchProducts function
  const throttledFetchProducts = useThrottle(() => {
    dispatch(fetchProducts({ keyword, currentPage, rating, category, price }));
  }, 2000);




  useEffect(() => {
    keyword.get('keyword') ? setSubHeading(`Showing search result for ${keyword.get('keyword')}`) : setSubHeading('Products')

    dispatch(fetchProducts({ keyword, currentPage, rating, category, price }));
  }, [dispatch, keyword, currentPage, category, rating]);

  useEffect(() => {
    if (price[0] != 0 || price[1] != 10000) {
      keyword.get('keyword') ? setSubHeading(`Showing search result for ${keyword.get('keyword')}`) : setSubHeading('Products')
      throttledFetchProducts();
    }

  }, [price])

  useEffect(()=>{
    if(keyword.get('category')){
      keyword.delete('category');
      setKeyword(keyword);
    }
  })

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrorOfProducts());
    }
  }, [dispatch, error])


  if (isLoading) {
    return <Loader />
  }


  return (
    <>
      <MetaData title="Products" />
      <div className='flex gap-8'>
        <div className='py-4 space-y-2 pr-4 sm:w-1/3 md:w-1/4 lg:w-1/6 border-r-2 hidden sm:block'>
          <h3 className='text-lg'>Categories</h3>
          <ul >
            {
              categories.map((cat, index) => {
                return <li key={index}> <Button className={`w-full flex justify-start ${cat === category ? 'bg-secondary2 text-white' : 'bg-transparent text-text2'}  hover:bg-secondary2 hover:text-white `} onClick={(e) => { setCategory(cat) }}>{cat}</Button></li>
              })
            }
          </ul>

          <h3 className='text-lg py-2'> Range</h3>
          <p className='pb-1 text-text2 '>{` Price ₹${price[0]} - ₹${price[1]}`}</p>
          <Slider defaultValue={price} min={0} max={25000} step={100} onValueChange={handleSlider} />

          <h3 className='text-lg pt-4'>Rating</h3>
          <ReactStars size={24} value={rating} onChange={(value) => { setRating(Math.floor(value)) }} color2="#FFAD33" />

        </div>


        <div className='py-4 items-center min-h-[90vh] w-full'>
          <SubHeading subHeading={subHeading} />
          <div className='my-4 gap-x-4 gap-y-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {
              products && products.map((product) => {
                return <ProductCard key={product._id} product={product} />
              })
            }
          </div>


          {/* Pagination  */}
          <div>
            {resultPerPage < filteredProductsCount && <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => {
                    if (currentPage === 1) return
                    setCurrentPage(currentPage => currentPage - 1)
                  }
                  } className=" cursor-pointer" />
                </PaginationItem>
                {
                  Array(Math.ceil(filteredProductsCount / resultPerPage)).fill().map((_, indx) => {
                    return (<PaginationItem key={indx}>
                      <PaginationLink isActive={currentPage === indx + 1} >{indx + 1}</PaginationLink>
                    </PaginationItem>)
                  })
                }
                <PaginationItem>
                  <PaginationNext onClick={() => {
                    if (currentPage === Math.ceil(filteredProductsCount / resultPerPage)) return
                    setCurrentPage(currentPage => currentPage + 1)
                  }
                  } className=" cursor-pointer" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Product
