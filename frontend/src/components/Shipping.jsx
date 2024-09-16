import React, { useState } from 'react'
import { Country, State, City } from 'country-state-city';
import SubHeading from './SubHeading';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from './ui/button';
import MetaData from '@/Layout/MetaData';
import toast from 'react-hot-toast';
import { saveShippingInfo } from '@/store/Slice/cartSlice';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {

  const shippingInfo = useSelector(state => state.cart.shippingInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [shippingDetails, setShippingDetails] = useState({ address: shippingInfo.address, city: shippingInfo.city, pinCode: shippingInfo.pinCode, phoneNo: shippingInfo.phoneNo, country: shippingInfo.country, state: shippingInfo.state });
  const handleOnchage = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  }
  const handleShippingDetials = (e) => {
    e.preventDefault();

    if (shippingDetails.phoneNo < 10 || shippingDetails.phoneNo.length > 10) {
      toast.error("Phone Number should be 10 digits");
      return;
    }
    dispatch(saveShippingInfo(shippingDetails));
    navigate("/order/confirm")

  }

  return (
    <div className='w-full h-full mt-10' >
      <MetaData title="shipping details" />

      <SubHeading subHeading={"Shipping Detiails"} />
      <div className='flex flex-col my-7 sm:flex-row shadow-all-sides rounded-md w-full justify-evenly items-center p-5 sm:p-10'>

        <form onSubmit={handleShippingDetials} className='flex w-full sm:w-1/2 flex-col gap-y-5'>
          <div className='flex flex-col'>
            <label className='py-2'>Address</label>
            <input required value={shippingDetails.address} name="address" type="text" onChange={handleOnchage} placeholder='Enter Your Address' className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm ' />
          </div>
          <div className='flex flex-col'>
            <label className='py-2'>City</label>
            <input required value={shippingDetails.city} name="city" onChange={handleOnchage} placeholder='Enter New Password' type="text" className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm ' />
          </div>
          <div className='flex flex-col'>
            <label className='py-2'>Pin Code</label>
            <input required value={shippingDetails.pinCode} name='pinCode' onChange={handleOnchage} placeholder='Confirm New Password' type="number" className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm ' />
          </div>
          <div className='flex flex-col'>
            <label className='py-2'>Phone No</label>
            <input required size="10" value={shippingDetails.phoneNo} name="phoneNo" onChange={handleOnchage} placeholder='Confirm New Password' type="number" className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm ' />
          </div>
          <div className='flex flex-col'>
            <label className='py-2'>Country</label>
            <select required value={shippingDetails.country} name="country" onChange={handleOnchage} placeholder='Enter New Password' type="text" className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm '>
              <option value="">Country</option>
              {

                Country &&
                (
                  Country.getAllCountries().map((items) => {
                    return <option key={items.isoCode} value={items.isoCode}>
                      {items.name}
                    </option>
                  }))
              }
            </select>
          </div>
          {
            shippingDetails.country &&
            <div className='flex flex-col'>
              <label className='py-2'>State</label>
              <select required value={shippingDetails.state} name="state" onChange={handleOnchage} placeholder='Enter New Password' type="text" className=' text-text2 h-10 px-2 w-full bg-secondary outline-none border-none rounded-sm '>
                <option value="">State</option>
                {
                  State &&
                  State.getStatesOfCountry(shippingDetails.country).map((item) => {
                    return <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  })
                }
              </select>
            </div>
          }
          <Button className=" bg-secondary2 hover:bg-secondary3 text-white">Continue</Button>

        </form>
      </div>

    </div>
  )
}

export default Shipping
