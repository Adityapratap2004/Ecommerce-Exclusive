import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    productDetails: null,
    isLoading: false,
    error: null,
    success:false,
}

export const getProductDetails = createAsyncThunk(
    'productDetails/getProductDetails',
    async (id, { rejectWithValue }) => {
        try {
            const {data} = await axios.get(`/api/v1/product/${id}`);
          
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

export const addReview = createAsyncThunk('productDetails/addReview',
    async (review, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`/api/v1/review`,
                review,
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

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(getProductDetails.pending, (state) => {
            state.isLoading = true
            state.error=null
        })
        builder.addCase(getProductDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.productDetails = action.payload.product
        })
        builder.addCase(getProductDetails.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message || 'Something went wrong'
        })

        builder.addCase(addReview.pending, (state) => {
            state.isLoading = true;
            state.success = false;
        })
        builder.addCase(addReview.fulfilled, (state, action) => {
            state.isLoading = false
            state.success = action.payload.success
        })
        builder.addCase(addReview.rejected, (state, action) => {
            state.isLoading = false
            state.success = false
            state.error = action.payload?.message || 'Something went wrong'
        })
    }

})

export const {clearError,clearSuccess} = productDetailsSlice.actions;

export default productDetailsSlice.reducer;