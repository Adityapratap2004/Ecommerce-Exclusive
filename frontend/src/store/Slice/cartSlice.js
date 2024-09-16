import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely parse localStorage data
const loadStateFromLocalStorage = () => {
  try {
    const cartData = localStorage.getItem("cartItems");
    return cartData ? { cartItems: JSON.parse(cartData) } : { cartItems: [] };
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return { cartItems: [] }; // Fallback to default state if parsing fails
  }
};

// Initialize the state from localStorage or set an empty array if it doesn't exist
// const initialState = loadStateFromLocalStorage();

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
    }
  },
});

export const { addItemsToCart, removeCartItem, saveShippingInfo } = cartSlice.actions;

export default cartSlice.reducer;
