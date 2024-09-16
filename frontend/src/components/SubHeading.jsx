import React from 'react'

const SubHeading = ({subHeading}) => {
    return (
        
            <div className='flex gap-3 items-center mb-6'>
                <div className=' w-5 h-10 rounded-sm bg-secondary2'>
                </div>
                <p className='text-secondary2 font-semibold'>{subHeading}</p>
            </div>
        
    )
}

export default SubHeading
