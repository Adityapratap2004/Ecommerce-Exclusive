import { User } from 'lucide-react'
import React from 'react'
import ReactStars from 'react-stars'

const ReviewCard = ({review}) => {
  return (
    <div className=' border-2  p-8 flex flex-col items-center shadow-sm '>
        <User/>
        <p>{review.name}</p>              
        <ReactStars size={24} value={review.rating || 0} edit={false} color2="#FFAD33" />
        <span>{review.comment} </span>
    </div>
  )
}

export default ReviewCard
