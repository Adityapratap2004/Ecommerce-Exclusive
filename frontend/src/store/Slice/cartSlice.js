import { createSlice } from "@reduxjs/toolkit";



const initialState={
  cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
  shippingInfo:localStorage.getItem("shippingInfo")?JSON.parse(localStorage.getItem("shippingInfo")):{},
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemsToCart: (state, action) => {
      const product ={
        _id:action.payload._id,
        name:action.payload.name,
        quantity:action.payload.quantity,
        price:action.payload.price,
        image:action.payload.image,
        product:action.payload._id
      } 

      const isItemExist = state.cartItems.find((i) => i._id === product._id);

      if (isItemExist) {
        state.cartItems = state.cartItems.map((i) =>
          i._id === isItemExist._id ? product : i
        );
      } else {
        state.cartItems.push(product);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingInfo:(state,action)=>{
      state.shippingInfo=action.payload;
      localStorage.setItem("shippingInfo",JSON.stringify(state.shippingInfo));
    },
    clearCart:(state,action)=>{
      state.cartItems=[],
      localStorage.removeItem("cartItems");
    }
  },
});

export const { addItemsToCart, removeCartItem, saveShippingInfo,clearCart } = cartSlice.actions;

export default cartSlice.reducer;
