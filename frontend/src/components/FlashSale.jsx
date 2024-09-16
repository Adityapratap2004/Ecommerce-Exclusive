import React from 'react'
import SubHeading from './SubHeading'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import ProductCard from './ProductCard'

const FlashSale = ({products}) => {
    return (
        <div >
            <SubHeading subHeading="todays" />
            <Carousel className="w-full">
                <div className='flex justify-between'>
                    <h1 className='text-6xl font-semibold mb-6'>Flash Sales</h1>
                    <div className='flex '>
                        <CarouselPrevious className=" top-8 left-auto right-16 bg-secondary0" />
                        <CarouselNext className=" top-8 right-2  bg-secondary0" />
                    </div>
                </div>
                <CarouselContent className="flex gap-2 sm:gap-5" >
                    {
                        products && products.map((product) => {
                            return <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/5" key={product._id}><ProductCard product={product} /></CarouselItem>
                        })
                    }
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default FlashSale
