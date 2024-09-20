import MetaData from '@/Layout/MetaData'
import React, { useEffect, useState } from 'react'
import SubHeading from './SubHeading'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import SalesBarChart from './SalesBarChart';
import axios from 'axios';


// const dummyData = [
//   { month: "January", totalSales: 1500 },
//   { month: "February", totalSales: 2000 },
//   { month: "March", totalSales: 1800 },
//   { month: "April", totalSales: 2200 },
//   { month: "May", totalSales: 2400 },
//   { month: "June", totalSales: 3000 },
//   { month: "July", totalSales: 2800 },
//   { month: "August", totalSales: 3200 },
//   { month: "September", totalSales: 3100 },
//   { month: "October", totalSales: 3500 },
//   { month: "November", totalSales: 4000 },
//   { month: "December", totalSales: 4500 },
// ];

const DashBoard = () => {

  const [formattedSalesData, setFormattedSalesData] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [prevMonthRevenue, setPrevMonthRevenue] = useState(0);
  const [sales, setSales] = useState(0);
  const [prevSales, setPrevSales] = useState(0);
  const [userNumbers, setuserNumbers] = useState(0);
  const [prevUserNumbers, setPrevUserNumbers] = useState(0);
  const [recentOrder, setRecentOrder] = useState([]);

  function calculatePercentageChange(currentValue, prevValue) {
    if (prevValue === 0) {
      // Handle case where previous value is 0 to avoid division by zero
      return currentValue === 0 ? 0 : 100; // If both are 0, return 0%, otherwise return 100%
    }

    const change = ((currentValue - prevValue) / prevValue) * 100;

    return change.toFixed(2); // Return percentage change rounded to 2 decimal places
  }



  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  const getMontlyRevenue = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/monthlyrevenue`, {
        withCredentials: true
      })
     

      const fsalesData = data.monthlySales.map((data) => ({
        month: monthNames[data.month - 1], // Convert month number to name
        totalSales: data.totalSales,
      }));
      setFormattedSalesData(fsalesData);

    } catch (error) {
      console.log(error);
    }
  }

  const getMonthlySales = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/monthlysales`, {
        withCredentials: true
      })
      setRevenue(data.currentMonthSales.totalSalesValue);
      setPrevMonthRevenue(data.previousMonthSales.totalSalesValue);
      setSales(data.currentMonthSales.totalSalesNumber);
      setPrevSales(data.previousMonthSales.totalSalesNumber);

    } catch (error) {
      console.log(error);
    }
  }

  const getMonthlyUser = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/getCurrentMonthUser`, {
        withCredentials: true
      })
      setuserNumbers(data.currentMonthUsers.newUsers);
      setPrevUserNumbers(data.previousMonthUsers.newUsers);

    } catch (error) {
      console.log(error);
    }
  }

  const getRecentOrderes = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/recentOrders`, {
        withCredentials: true
      })
      setRecentOrder(data.recentOrders);
      console.log(recentOrder);
    } catch (error) {
      console.log(error);
    }
  }





  useEffect(() => {
    getMontlyRevenue();
    getMonthlySales();
    getMonthlyUser();
    getRecentOrderes();
  }, []);
  return (
    <div className='w-full h-full mt-4'>
      <MetaData title="Dashboard" />
      <SubHeading subHeading={"DashBoard"} />
      <div className='flex flex-col my-7 w-full gap-6 text-text2'>
        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          <Card className=" shadow-all-sides ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{revenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {calculatePercentageChange(revenue, prevMonthRevenue)}% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-all-sides">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{sales}</div>
              <p className="text-xs text-muted-foreground">
                {calculatePercentageChange(sales, prevSales)}% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-all-sides">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscriptions
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userNumbers}</div>
              <p className="text-xs text-muted-foreground">
                {calculatePercentageChange(userNumbers, prevUserNumbers)}% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className='flex flex-col md:flex-row w-full gap-5'>
          <Card className="w-full md:w-3/5 h-auto shadow-all-sides">
            <SalesBarChart data={formattedSalesData} />
          </Card>

          <Card className="w-full md:w-2/5 shadow-all-sides">
            <CardHeader>
              <CardTitle>Recent Sales</CardTitle>
              <CardDescription>
                You made 265 sales this month.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className=' space-y-2 text-text2'>
                {
                  recentOrder.length > 0 && recentOrder.map((order) => {
                    return <div key={order._id} className='flex justify-between items-center '>
                      <div className='flex items-center gap-2 text-sm'>
                        <img src={order.user.avatar.url} alt="user image" className=' w-8 h-8 rounded-full' />
                        <div>
                          <p>{order.user.name}</p>
                          <p>{order.user.email}</p>
                        </div>

                      </div>
                      <div>
                        ₹{order.totalPrice}
                      </div>
                    </div>
                  })
                }
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashBoard
