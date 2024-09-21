import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    products: [],
    isLoading: false,
    error: null,
    productCount: 0,
    resultPerPage:0,
    filteredProductsCount:0,

}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (query, { rejectWithValue }) => {
        
        try {
            let keyword=query?.keyword.get('keyword') ? query.keyword.get('keyword'):"";
            let currentPage=query?.currentPage ?query.currentPage:1;
            let price=query?.price ? query.price:[0,25000];
            let rating=query?.rating ?query.rating:0;
            let link=`/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
            if(query?.category){
                link=`/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${query.category}&ratings[gte]=${rating}`;
            }
            const {data} = await axios.get(link);
          
            return data;

        } 
        catch (error) {
           
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






const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

        clearErrorOfProducts: (state) => {
            state.error = null;
        },
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload.products
            state.productCount = action.payload.productCount
            state.resultPerPage=action.payload.resultPerPage
            state.filteredProductsCount=action.payload.filteredProductsCount

        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message || 'Something went wrong'
        })
    }

})




export const {clearErrorOfProducts} = productSlice.actions;

export default productSlice.reducer;