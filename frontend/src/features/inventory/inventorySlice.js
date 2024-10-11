import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import inventoryApi from '../../api/inventoryApi';

// Async Thunks
export const fetchAllInventory = createAsyncThunk('inventory/fetchAll', async () => {
  const response = await inventoryApi.fetchInventory();
  return response;
});

export const createInventoryItem = createAsyncThunk('inventory/create', async (inventoryData) => {
  const response = await inventoryApi.createInventoryItem(inventoryData);
  return response.data;
});

export const updateInventoryItem = createAsyncThunk('inventory/update', async (inventoryData) => {
  const response = await inventoryApi.updateInventoryItem(inventoryData);
  return response.data;
});

export const removeInventoryItem = createAsyncThunk('inventory/remove', async (id) => {
  await inventoryApi.removeInventoryItem(id);
  return id;
});

export const searchInventoryByProductId = createAsyncThunk('inventory/searchByProductId', async (productId) => {
  const response = await inventoryApi.searchInventoryByProductId(productId);
  return response.data;
});

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createInventoryItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateInventoryItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(inventory => inventory.ProductId === action.payload.ProductId);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(removeInventoryItem.fulfilled, (state, action) => {
        state.items = state.items.filter(inventory => inventory.ProductId !== action.payload);
      })
      .addCase(searchInventoryByProductId.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [action.payload];
      });
  }
});

export default inventorySlice.reducer;
