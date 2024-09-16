
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AppLayout from './Layout/AppLayout'
import LadingPage from './pages/LadingPage'
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

function App() {

  const [stripeApiKey, setStripeApiKey] = useState("");
  const getStripeApiKey = async() => {
    const { data } =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stripeapikey`,{withCredentials:true});
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
          <Route index element={<LadingPage />} />
          <Route path="/product/:id" element={<ProductDeatail />} />
          <Route path="/products" element={<Product />} />
          <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder /></ProtectedRoute>} />
          {stripeApiKey && <Route path="/process/payment" element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)} ><Payment /></Elements></ProtectedRoute>} />}
          <Route path="/success" element={<ProtectedRoute><Success/></ProtectedRoute>} />
          <Route path="/account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>}>
            <Route index element={<Profile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="orders" element={<Orders />} />
            <Route path="order/:id" element={<OrderDetails />} />
          </Route>
          <Route path="/shipping" element={<Shipping />} />
        </Route>
        <Route path="/login" element={<LoginSingup />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
