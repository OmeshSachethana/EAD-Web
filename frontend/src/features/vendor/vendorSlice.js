import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vendorApi from '../../api/vendorApi'; // Adjust the path as necessary

// Async Thunks
export const fetchAllVendors = createAsyncThunk('vendor/fetchAll', async () => {
  const response = await vendorApi.fetchVendors();
  return response.data; // Adjust based on your API response structure
});

export const createVendor = createAsyncThunk('vendor/create', async (vendorData) => {
  const response = await vendorApi.createVendor(vendorData);
  return response.data; // Adjust based on your API response structure
});

// You can add other thunks for update and remove if needed

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    vendors: [], // Renamed from items to vendors for clarity
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllVendors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllVendors.fulfilled, (state, action) => {
        state.loading = false;
        state.vendors = action.payload; // Set vendors with the fetched data
      })
      .addCase(fetchAllVendors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message
      })
      .addCase(createVendor.fulfilled, (state, action) => {
        state.vendors.push(action.payload); // Add newly created vendor
      });
      // You can add other cases for update and remove
  }
});

export default vendorSlice.reducer;
