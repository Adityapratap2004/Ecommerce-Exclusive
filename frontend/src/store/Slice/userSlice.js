import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";


const initialState = {
    user: {},
    isLoading:false,
    error:null,
    isAuthenticated:false,
    isUpdated:false,
    sendLink:false,
}

export const loginUser = createAsyncThunk('user/loginUser',
    async (userData, { rejectWithValue }) => {
        try {

            const { loginEmail: email, loginPassword: password } = userData;
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`,
                { email, password },
                {withCredentials:true});
            const data = res.data;
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

export const registerUser = createAsyncThunk('user/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`,
                userData,
                {withCredentials:true}
            );
            const data = res.data;
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

export const loadUser = createAsyncThunk('user/loadUser',
    async (_,{ rejectWithValue }) => {
        try {
            
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/me`,
                {withCredentials:true}
            );
            const data = res.data;
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

export const updateUser = createAsyncThunk('user/updateUser',
    async (userData, { rejectWithValue }) => {
        try {
           
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/me/update`,
                userData,
                {withCredentials:true}
            );
            const data = res.data;
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

export const logoutUser = createAsyncThunk('user/logoutUser',
    async (_,{ rejectWithValue }) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`,
                {withCredentials:true}
            );
            const data = res.data;
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

export const changePassword = createAsyncThunk('user/changePassword',
    async (userPassword,{ rejectWithValue }) => {
        try {
            
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/password/update`,
                userPassword,
                {withCredentials:true}
            );
            const data = res.data;
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

export const passwordRestLink = createAsyncThunk('user/passwordRestLink',
    async (email,{ rejectWithValue }) => {
        try {
            
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/password/forgot`,
                {email},
            );
            const data = res.data;
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

export const resetPassword = createAsyncThunk('user/resetPassword',
    async (userData,{ rejectWithValue }) => {
        try {
            
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/password/reset/${userData.token}`,
                {
                    password:userData.password,
                    confirmPassword:userData.confirmPassword,             
                },
                {
                    withCredentials:true
                }
            );
            const data = res.data;
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


const userSlice = createSlice({
    name: 'user_data',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearIsUpdate: (state) => {
            state.isUpdated = false;
        },
        clearSendLink: (state) => {
            state.sendLink = false;
        },

    },
    extraReducers:(builder)=>{
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true
            state.error=null
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.isAuthenticated=action.payload.success
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message || 'Something went wrong'
        })
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
            state.error=null
        })
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.isAuthenticated=action.payload.success
        })
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message || 'Something went wrong'
        })
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload?.user
            state.isAuthenticated=action.payload.success
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = {}
            state.isAuthenticated=false
        })

        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true
            state.error=null
            state.isUpdated=false
        })
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.isUpdated=true
        })
        builder.addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message || 'Something went wrong'
            state.isUpdated=false
        })

        builder.addCase(changePassword.pending, (state) => {
            state.isLoading = true
            state.error=null
            state.isUpdated=false
        })
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.isLoading = false
            state.isUpdated=true
        })
        builder.addCase(changePassword.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message || 'Something went wrong'
            state.isUpdated=false
        })

        builder.addCase(passwordRestLink.pending, (state) => {
            state.isLoading = true
            state.error=null
            state.sendLink=false
        })
        builder.addCase(passwordRestLink.fulfilled, (state, action) => {
            state.isLoading = false
            state.sendLink=true
        })
        builder.addCase(passwordRestLink.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message || 'Something went wrong'
            state.sendLink=false
        })


        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true
            state.error=null
        })
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.isAuthenticated=action.payload.success
        })
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload?.message || 'Something went wrong'
        })
        
    }

})

export const {clearError,clearIsUpdate,clearSendLink}=userSlice.actions;

export default userSlice.reducer;

