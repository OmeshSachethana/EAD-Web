import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { activateProduct, deactivateProduct } from '../../api/productActivationApi';

const initialState = {
  loading: false,
  error: null,
};

// Async thunk for activating a product
export const activateProductAsync = createAsyncThunk(
  'productActivation/activateProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await activateProduct(id);
      console.log(response);
      return { id }; // Return only the product ID or any relevant data you need
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deactivating a product
export const deactivateProductAsync = createAsyncThunk(
  'productActivation/deactivateProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await deactivateProduct(id);
      console.log(response);
      return { id }; // Return only the product ID or any relevant data you need
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the slice
const productActivationSlice = createSlice({
  name: 'productActivation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(activateProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(activateProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the activation logic if needed
        // Example: state.products.find(product => product.id === action.payload.id).isActive = true;
      })
      .addCase(activateProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture any error
      })
      .addCase(deactivateProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deactivateProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Handle the deactivation logic if needed
        // Example: state.products.find(product => product.id === action.payload.id).isActive = false;
      })
      .addCase(deactivateProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture any error
      });
  },
});

// Export the reducer
export default productActivationSlice.reducer;
