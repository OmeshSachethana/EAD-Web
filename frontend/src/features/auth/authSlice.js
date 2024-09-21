import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import jwt_decode from 'jwt-decode';

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
};

// Login Thunk
export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await authService.login(email, password);
            const decodedUser = jwt_decode(response.Token); // Decode JWT for user info
            return { token: response.Token, user: decodedUser };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Register Thunk
export const register = createAsyncThunk(
    'auth/register',
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const response = await authService.register(username, email, password);
            return { username, email }; // Handle response based on your backend
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.token); // Save token
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload; // Handle user data after registration
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
