import axios from "axios";


import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";


const initialState = {
    products: [],
    orders: [],
    order:{},
    isLoading: false,
    error: null,
    isSuccess:false,
    message:"",


}

export const getAllAdminProducts = createAsyncThunk('admin/getAllAdminProducts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } =await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/products`, {
                withCredentials: true
            })
            return data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data)
            }
            else if (error.request) {
                return rejectWithValue({ message: "No response from server" });
            }
            else {
                return rejectWithValue({ message: error.message });
            }
        }
    }
)

export const createProduct = createAsyncThunk('admin/createProduct',
    async (product, { rejectWithValue }) => {
        try {
            const { data } =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/product/new`,
                product,
                {withCredentials: true}
        )
            return data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data)
            }
            else if (error.request) {
                return rejectWithValue({ message: "No response from server" });
            }
            else {
                return rejectWithValue({ message: error.message });
            }
        }
    }
)

export const deleteProduct = createAsyncThunk('admin/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            const { data } =await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/product/${id}`, {
                withCredentials: true
            })
            data.id=id;
            return data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data)
            }
            else if (error.request) {
                return rejectWithValue({ message: "No response from server" });
            }
            else {
                return rejectWithValue({ message: error.message });
            }
        }
    }
)

export const updateProduct = createAsyncThunk('admin/updateProduct',
    async (product, { rejectWithValue }) => {
        try {
            const { data } =await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/product/${product.id}`, 
                product.myForm,
                {
                    withCredentials: true
                })
                data.id=product.id;
                return data;
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data)
            }
            else if (error.request) {
                return rejectWithValue({ message: "No response from server" });
            }
            else {
                return rejectWithValue({ message: error.message });
            }
        }
    }
)

export const getAdminOrders = createAsyncThunk('order/getAdminOrders',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/orders`,
                {withCredentials:true}
            )
            return data;

        } catch (error) {

            if (error.response) {
                return rejectWithValue(error.response.data)
            }
            else if (error.request) {
                return rejectWithValue({ message: "No response from server" });
            }
            else {
                return rejectWithValue({ message: error.message });
            }

        }
    }
)

export const getAdminSingleOrder = createAsyncThunk('order/getSingleOrder',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/order/${id}`,
                {withCredentials:true}
            )
            return data;

        } catch (error) {

            if (error.response) {
                return rejectWithValue(error.response.data)
            }
            else if (error.request) {
                return rejectWithValue({ message: "No response from server" });
            }
            else {
                return rejectWithValue({ message: error.message });
            }

        }
    }
)

export const deleteAdminOrders = createAsyncThunk('order/deleteAdminOrders',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/admin/order/${id}`,
                {withCredentials:true}
            )
            data._id=id;
            return data;

        } catch (error) {

            if (error.response) {
                return rejectWithValue(error.response.data)
            }
            else if (error.request) {
                return rejectWithValue({ message: "No response from server" });
            }
            else {
                return rejectWithValue({ message: error.message });
            }

        }
    }
)

export const updateAdminOrder = createAsyncThunk('order/updateAdminOrder',
    async (order, { rejectWithValue }) => {
        try {
         
            const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/admin/order/${order.id}`,
                order.myForm,
                {withCredentials:true},
            )
            return data;

        } catch (error) {

            if (error.response) {
                return rejectWithValue(error.response.data)
            }
            else if (error.request) {
                return rejectWithValue({ message: "No response from server" });
            }
            else {
                return rejectWithValue({ message: error.message });
            }

        }
    }
)

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        clearError:(state)=>{
            state.error=null
        },
        clearSuccess:(state)=>{
            state.isSuccess=false
        },
        clearMessage:(state)=>{
            state.message=""
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getAllAdminProducts.pending, (state) => {
            state.isLoading = true,
            state.error = null
        })
        builder.addCase(getAllAdminProducts.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.error=null,
            state.products=action.payload.products
        })
        builder.addCase(getAllAdminProducts.rejected, (state) => {
            state.isLoading = false,
            state.error = action.payload?.message || 'Something went wrong'
        })


        builder.addCase(createProduct.pending, (state) => {
            state.isLoading = true,
            state.error = null,
            state.isSuccess=false
        })
        builder.addCase(createProduct.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.error=null,
            state.isSuccess=true,
            state.products=action.payload.products
        })
        builder.addCase(createProduct.rejected, (state,action) => {
            state.isLoading = false,
            state.isSuccess=false,
            state.error = action.payload?.message || 'Something went wrong'
        })


        builder.addCase(deleteProduct.pending, (state) => {
            state.isLoading = true,
            state.error = null,
            state.message="";
            state.isSuccess=false
        })
        builder.addCase(deleteProduct.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.error=null,
            state.isSuccess=true,
            state.message=action.payload.message;
            state.products = state.products.filter((prod) => prod._id !== action.payload.id); 
        })
        builder.addCase(deleteProduct.rejected, (state,action) => {
            state.isLoading = false,
            state.isSuccess=false,
            state.message="";
            state.error = action.payload?.message || 'Something went wrong'
        })


        builder.addCase(updateProduct.pending, (state) => {
            state.isLoading = true,
            state.error = null,
            state.isSuccess=false
        })
        builder.addCase(updateProduct.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.error=null,
            state.isSuccess=true,
            state.products=state.products.map((prod)=>{
                if(prod._id===action.payload.id){
                    return action.payload.product;
                }
                return prod;
            })
        })
        builder.addCase(updateProduct.rejected, (state,action) => {
            state.isLoading = false,
            state.isSuccess=false,
            state.error = action.payload?.message || 'Something went wrong'
        })



        builder.addCase(getAdminOrders.pending, (state) => {
            state.isLoading = true,
            state.error = null,
            state.isSuccess=false
        })
        builder.addCase(getAdminOrders.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.error=null,
            state.isSuccess=true,
            state.orders=action.payload.orders
        })
        builder.addCase(getAdminOrders.rejected, (state,action) => {
            state.isLoading = false,
            state.isSuccess=false,
            state.error = action.payload?.message || 'Something went wrong'
        })


        builder.addCase(deleteAdminOrders.pending, (state) => {
            state.isLoading = true,
            state.error = null,
            state.isSuccess=false
        })
        builder.addCase(deleteAdminOrders.fulfilled,(state,action)=>{
            state.isLoading=false,
            state.error=null,
            state.orders=state.orders.filter((prod)=>prod._id!=action.payload._id);
        })
        builder.addCase(deleteAdminOrders.rejected, (state,action) => {
            state.isLoading = false,
            state.error = action.payload?.message || 'Something went wrong'
        })



        builder.addCase(getAdminSingleOrder.pending, (state) => {
            state.error=null,
            state.isLoading=true,
            state.isSuccess=false
        })
        builder.addCase(getAdminSingleOrder.fulfilled, (state, action) => {
            state.order = action.payload.order,
            state.isLoading=false,
            state.isSuccess=true
        })
        builder.addCase(getAdminSingleOrder.rejected, (state, action) => {
            state.error = action.payload?.message || 'Something went wrong',
            state.isSuccess=false,
            state.isLoading=false
        })


        builder.addCase(updateAdminOrder.pending, (state) => {
            state.error=null,
            state.isLoading=true,
            state.message="",
            state.isSuccess=false
        })
        builder.addCase(updateAdminOrder.fulfilled, (state, action) => {
            state.order.orderStatus=action.payload.status,
            state.isLoading=false,
            state.message=action.payload.message;
            state.isSuccess=true
        })
        builder.addCase(updateAdminOrder.rejected, (state, action) => {
            state.error = action.payload?.message || 'Something went wrong',
            state.isSuccess=false,
            state.isLoading=false
        })

    }
})

export const {clearError,clearSuccess,clearMessage } = adminSlice.actions;

export default adminSlice.reducer;