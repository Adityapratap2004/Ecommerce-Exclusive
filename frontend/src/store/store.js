import {configureStore} from "@reduxjs/toolkit";
import productSlice from "./Slice/productSlice";
import productDetailSlice from "./Slice/productDetailSlice";
import userSlice from "./Slice/userSlice";
import cartSlice from "./Slice/cartSlice";
import orderSlice from "./Slice/orderSlice";
import adminSlice from "./Slice/adminSlice";

const store=configureStore({
  reducer:{
    products:productSlice,
    productDetail:productDetailSlice,
    user:userSlice,
    cart:cartSlice,
    order:orderSlice,
    admin:adminSlice

  }
})

export default store;