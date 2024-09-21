// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../../api/authApi';
import { jwtDecode } from 'jwt-decode';
import { mapClaimsToUser } from '../../utils/authUtil';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    const { token } = await loginUser(credentials);
    const decodedToken = jwtDecode(token);
    const user = mapClaimsToUser(decodedToken); // Use the utility function
    localStorage.setItem('token', token);
    return { user, token };
  });

// Async thunk for registration
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const newUser = await registerUser(userData);
    return newUser;
  } catch (error) {
    const message = error.response ? error.response.data : 'Registration failed, please try again.';
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user; // This should now be populated correctly
        state.token = action.payload.token;
        state.status = 'succeeded';
    })
    
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message; // Handle error message
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message; // Handle error message
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
