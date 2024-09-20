import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'
import MetaData from '@/Layout/MetaData'

const Page404 = () => {
  return (
    <div className=' flex flex-col w-full h-[100vh] justify-center items-center'>
      <MetaData title="Page Not Found"/>
      <h1 className='text-6xl font-bold mb-5 text-center'>404 Not Found</h1>
      <Link to="/"><Button className="bg-secondary2 text-white hover:bg-secondary3"><ArrowLeft className='mr-3' />  Back to Home</Button></Link>
    </div>
  )
}

export default Page404
