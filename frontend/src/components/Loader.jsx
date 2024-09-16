import React from 'react'

const Loader = ({full=true}) => {
  return (
    <div className={`flex flex-col gap-y-8 items-center justify-center ${full?'fixed inset-0 bg-white':'h-full w-full'}`}>
        <div className='animate-spin h-40 w-40 border-b-4 border-black rounded-full'></div> 
        {/* <div className='text-secondary2 text-lg'>Page is loading ....</div>      */}
    </div>
  )
}

export default Loader
