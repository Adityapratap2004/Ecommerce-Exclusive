import React from 'react'
import { footer_link } from '@/assets/data'
import Footer_Column from './Footer_Column';

const { support, account, Quick_Link } = footer_link;

const Footer = () => {
  return (
    <footer className='bg-black' >
      <div className='container flex justify-between flex-wrap gap-y-4  py-6 text-text1 text-sm'>

        <Footer_Column heading="Support" list={support} />
        <Footer_Column heading="Account" list={account} />
        <Footer_Column heading="Quick Link" list={Quick_Link} />
        <section className="min-w-[250px] md:min-w-[0px] mx-auto sm:mx-0">
          <h3 className='text-xl font-semibold'>
            Download App
          </h3>
          <p className='my-3'>
            Save $3 with App New User Only
          </p>
          <div className='flex gap-x-2'>
            <img src="/Qrcode 1.svg" alt="qr coe" />
            <div className='flex flex-col justify-between gap-y-1.5'>
              <img src="/GooglePlay.svg" alt="google play" />
              <img src="/AppStore.svg" alt="app store" />
            </div>
          </div>
        </section>
      </div>
      <div className='border-t border-gray-700 text-slate-700 text-xs '>
        <p className='text-center py-5'>
        © Copyright Exclusive 2024.All right reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
