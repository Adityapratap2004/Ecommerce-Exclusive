import React from 'react'
import SubHeading from './SubHeading'
import ProductCard from './ProductCard'

const BestSellingProducts = ({ products }) => {
    return (
        <div className='pb-10' >
            <SubHeading subHeading="This Month" />
            <h1 className='text-3xl sm:text-6xl font-semibold mb-6'>Best Selling Products</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 " >
                {
                    products && products.map((product) => {
                        return <ProductCard product={product} />
                    })
                }
            </div>
        </div>
    )
}

export default BestSellingProducts
