import React, { useEffect, useRef } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { categories } from '@/assets/data'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Banner = () => {

  return (
    <section className=' flex w-full *:pt-10'>
      {/* side bar */}
      <div className=' sm:w-1/3 md:w-1/4 lg:w-1/6 border-r-2 hidden sm:block'>
        <ScrollArea className="  sm:h-[200px] md:h-[300px] lg:h-[400px] rounded-md mr-4"  >
          <h1 className='text-lg mb-3'>Categories</h1>
          <ul className='space-y-1 pl-2'>
            {
              categories.map((cat,index)=>{
                return <li key={index}> <Link  to={`/products?category=${cat}`}><Button className="text-text2 bg-transparent hover:bg-secondary3 hover:text-white">{cat}</Button></Link></li>
              })
            }
          </ul>
        </ScrollArea>
      </div>
      <div className='flex w-full  justify-center  sm:pl-10' >
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}


        >
          <CarouselContent className="flex justify-between" >
            <CarouselItem ><img src="/Carousel.svg" className='w-full' /></CarouselItem>
            <CarouselItem><img src="/Carousel.svg" className='w-full' /></CarouselItem>
            <CarouselItem><img src="/Carousel.svg" className='w-full' /></CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

export default Banner
