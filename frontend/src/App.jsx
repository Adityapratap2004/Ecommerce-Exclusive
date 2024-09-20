
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './Layout/AppLayout'
import LandingPage from './pages/LandingPage'
import { Toaster } from 'react-hot-toast'
import ProductDeatail from './components/ProductDeatail'
import Product from './pages/Product'
import LoginSingup from './pages/LoginSingup'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loadUser } from './store/Slice/userSlice'
import store from './store/store'
import AccountPage from './pages/AccountPage'
import Profile from './components/Profile'
import ProtectedRoute from './pages/ProtectedRoute'
import EditProfile from './components/EditProfile'
import ChangePassword from './components/ChangePassword'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
import CartPage from './pages/CartPage'
import Shipping from './components/Shipping'
import ConfirmOrder from './components/ConfirmOrder'
import Payment from './components/Payment'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import Success from './components/success'
import Orders from './components/Orders'
import OrderDetails from './components/OrderDetails'
import Admin from './pages/Admin'
import AdminProducts from './components/AdminProducts'
import DashBoard from './components/DashBoard'
import CreateProducts from './components/CreateProducts'
import UpdateProducts from './components/UpdateProducts'
import AdminOrders from './components/AdminOrders'
import ProcessAdminOrder from './components/ProcessAdminOrder'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import Page404 from './components/Page404'

function App() {

  const [stripeApiKey, setStripeApiKey] = useState("");
  const getStripeApiKey = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stripeapikey`, { withCredentials: true });
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();

  }, [])

  return (

    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="/product/:id" element={<ProductDeatail />} />
          <Route path="/products" element={<Product />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/contactus" element={<ContactUs/>}/>
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
          {stripeApiKey && <Route path="/process/payment" element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)} ><Payment /></Elements></ProtectedRoute>} />}
          <Route path="/shipping" element={<ProtectedRoute><Shipping /></ProtectedRoute>} />
          <Route path="/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>}>
            <Route index element={<Profile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:id" element={<OrderDetails />} />
          </Route>
          <Route path="/admin" element={<ProtectedRoute isAdmin={true}><Admin /></ProtectedRoute>}>
            <Route index element={<DashBoard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="createproduct" element={<CreateProducts />} />
            <Route path="editproduct/:id" element={<UpdateProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="processorder/:id" element={<ProcessAdminOrder />} />
          </Route>

        </Route>
        <Route path="/login" element={<LoginSingup />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="*" element={<Page404/>}/>
      </Routes>

    </BrowserRouter>
  )
}

export default App
