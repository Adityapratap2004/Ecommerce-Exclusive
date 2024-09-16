import React from 'react'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className=' flex flex-col w-full h-[85vh] justify-center items-center'>
      <h1 className='text-6xl font-bold mb-7 text-text2 text-center '>Order has been Placed Successfully</h1>
      <Link to="/order"><Button className="bg-secondary2 text-white hover:bg-secondary3 px-10">View Order</Button></Link>
    </div>
  )
}

export default Success
