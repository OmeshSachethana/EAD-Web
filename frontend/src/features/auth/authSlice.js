import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser } from '../../api/authApi';
import { fetchCustomers, updateCustomerStatus } from '../../api/userApi'; // Import the new functions
import { jwtDecode } from 'jwt-decode'; // Updated import
import { mapClaimsToUser } from '../../utils/authUtil';

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
  customers: [], // To store fetched customers
  customerUpdateStatus: 'idle', // To track the status of updating a customer's status
};

// Load user from token on initialization
if (initialState.token) {
  const decodedToken = jwtDecode(initialState.token);
  initialState.user = mapClaimsToUser(decodedToken);
}

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  const { token } = await loginUser(credentials);
  const decodedToken = jwtDecode(token);
  const user = mapClaimsToUser(decodedToken);
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

// Async thunk to fetch customers with 'Role == Customer'
export const fetchAllCustomers = createAsyncThunk('auth/fetchCustomers', async (_, thunkAPI) => {
  try {
    const customers = await fetchCustomers();
    return customers;
  } catch (error) {
    const message = error.response ? error.response.data : 'Failed to fetch customers.';
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk to update customer's `IsActive` status
export const updateCustomerActiveStatus = createAsyncThunk(
  'auth/updateCustomerStatus',
  async ({ id, isActive, username, email, role, password }, thunkAPI) => {
    console.log('Updating customer with ID:', id, 'to IsActive:', isActive);
    try {
      const updatedCustomer = await updateCustomerStatus(id, isActive, username, email, role, password);
      return updatedCustomer;
    } catch (error) {
      const message = error.response ? error.response.data : 'Failed to update customer status.';
      return thunkAPI.rejectWithValue(message);
    }
  }
);




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
      // Login handlers
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user; // Populated correctly
        state.token = action.payload.token;
        state.status = 'succeeded';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message; // Handle error message
      })

      // Register handlers
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message; // Handle error message
      })

      // Fetch customers handlers
      .addCase(fetchAllCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.customers = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })

      // Update customer `IsActive` status handlers
      .addCase(updateCustomerActiveStatus.pending, (state) => {
        state.customerUpdateStatus = 'loading';
      })
      .addCase(updateCustomerActiveStatus.fulfilled, (state, action) => {
        // Update the customer in the `customers` array
        const index = state.customers.findIndex((customer) => customer.id === action.payload.id);
        if (index !== -1) {
          state.customers[index] = action.payload; // Update the customer in the array
        }
        state.customerUpdateStatus = 'succeeded';
      })
      .addCase(updateCustomerActiveStatus.rejected, (state, action) => {
        state.customerUpdateStatus = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
