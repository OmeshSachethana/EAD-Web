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
      return response; // Return the response data for further use if needed
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
      return response; // Return the response data for further use if needed
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
      .addCase(activateProductAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(activateProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture any error
      })
      .addCase(deactivateProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deactivateProductAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deactivateProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Capture any error
      });
  },
});

// Export the async actions
export const { } = productActivationSlice.actions;

// Export the reducer
export default productActivationSlice.reducer;
