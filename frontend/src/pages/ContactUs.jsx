import { LetterTextIcon, MailIcon, PhoneCall } from 'lucide-react'
import React from 'react'
import { Button } from '../components/ui/button'
import MetaData from '@/Layout/MetaData'

const ContactUs = () => {
    return (
        <div className='w-full flex gap-10 flex-col-reverse md:flex-row py-20 text-text2'>
            <MetaData title="Contact Us"/>
            <div className=' shadow-all-sides rounded-md  text-sm '>
                <div className=' p-5 space-y-1 border-b-2'>
                    <div className='flex gap-3 items-center mb-2'><div className='bg-secondary2 text-white rounded-full p-2'><PhoneCall /></div> <h4 className='text-black font-semibold text-base'>Call To Us</h4></div>
                    <p>We are available 24/7, 7 days a week.</p>
                    <p>Phone: +91 9191919191</p>
                </div>
                <div className='p-5 space-y-1'>
                    <div className='flex gap-3 items-center mb-2'><div className='bg-secondary2 text-white rounded-full p-2'> <MailIcon /></div> <h4 className='text-black font-semibold text-base'>Write To US</h4></div>
                    <p>Fill out our form and we will contact you within 24 hours.</p>
                    <p>Emails:customer@exculsive</p>
                    <p>Emails:support@exclusive.com</p>
                </div>
            </div>
            <form className='shadow-all-sides h-auto w-full rounded-md p-5 space-y-3' >
                <div className='flex gap-2 flex-col sm:flex-row'>
                    <input placeholder='Your Name' className='text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm' />
                    <input placeholder='Your Email' className='text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm' />
                    <input placeholder='Your Phone' className='text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm' />
                </div>
                
                    <textarea placeholder='Your Message' className='text-text2 h-[60%]  p-2 w-full bg-secondary outline-none border-none rounded-sm' />
                
                <div className="flex justify-end">
                    <Button className="bg-secondary2 hover:bg-secondary3">Send Message</Button>
                </div>
            </form>
        </div>
    )
}

export default ContactUs
