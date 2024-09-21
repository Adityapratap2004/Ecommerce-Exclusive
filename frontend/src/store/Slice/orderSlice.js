import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    order: {},
    orders:[],
    error:null,
    success:false,
    isLoading:false,
}

export const createOrder = createAsyncThunk('order/createOrder',
    async (order, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`/api/v1/order/new`,
                order,
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

export const getOrders = createAsyncThunk('order/getOrders',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/v1/orders/me`,
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

export const getSingleOrder = createAsyncThunk('order/getSingleOrder',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/api/v1/order/${id}`,
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

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        clearSuccess:(state)=>{
            state.success=false
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(createOrder.pending, (state) => {
            state.error=null,
            state.success=false
        })
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.order = action.payload.order,
            state.success=true
        })
        builder.addCase(createOrder.rejected, (state, action) => {
            state.error = action.payload?.message || 'Something went wrong',
            state.success=false
        })
        builder.addCase(getOrders.pending, (state) => {
            state.error=null,
            state.isLoading=true,
            state.success=false
        })
        builder.addCase(getOrders.fulfilled, (state, action) => {
            state.orders = action.payload.orders,
            state.isLoading=false,
            state.success=true
        })
        builder.addCase(getOrders.rejected, (state, action) => {
            state.error = action.payload?.message || 'Something went wrong',
            state.success=false,
            state.isLoading=false
        })

        builder.addCase(getSingleOrder.pending, (state) => {
            state.error=null,
            state.isLoading=true,
            state.success=false
        })
        builder.addCase(getSingleOrder.fulfilled, (state, action) => {
            state.order = action.payload.order,
            state.isLoading=false,
            state.success=true
        })
        builder.addCase(getSingleOrder.rejected, (state, action) => {
            state.error = action.payload?.message || 'Something went wrong',
            state.success=false,
            state.isLoading=false
        })
    }
        
})

export const {clearError,clearSuccess}=orderSlice.actions
export default orderSlice.reducer
