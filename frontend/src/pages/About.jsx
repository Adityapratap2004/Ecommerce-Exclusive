import MetaData from '@/Layout/MetaData'
import React from 'react'

const About = () => {
    return (
        <div className='py-20'>
             <MetaData title="About" />
            <div className=' flex-col-reverse flex md:flex-row mb-10 gap-10'>
                <div className=" flex flex-col justify-center ">
                    <h1 className=' text-4xl font-semibold mb-5'>Our Story</h1>
                    <p className=' text-text2'>
                        Launced in 2024, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by
                        wide range of tailored marketing, data and service solutions,
                        Exclusive has 10,500 sallers and 300 brands and serves 3
                        millioons customers across the region.
                    </p>
                    <p className=' text-text2'>
                        Exclusive has more than 1 Million products to offer, growing at a very fast.
                        Exclusive offers a diverse assotment in categories ranging
                        from consumer.
                    </p>
                </div>
                <div className=''>
                    <img src="/Side Image.png" alt="about us page image" className='w-full'/>
                </div>
            </div>
            
        </div>
    )
}

export default About
