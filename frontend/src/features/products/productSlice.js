import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../../api/productApi';

// Async Thunks
export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
    const response = await productApi.fetchProducts();
    return response; 
});

// Fetch low-stock products
export const fetchLowStockProducts = createAsyncThunk('products/fetchLowStock', async () => {
    const response = await productApi.fetchLowStockProducts(); // This API call should be defined in `productApi.js`
    return response;
});

// Create a product
export const createProduct = createAsyncThunk('products/create', async (productData) => {
    const response = await productApi.createProduct(productData);
    return response.data;
});

// Update a product
export const updateProduct = createAsyncThunk('products/update', async ({ id, productData }) => {
    const response = await productApi.updateProduct(id, productData);
    return response.data;
});

// Update stock quantity of a product
export const updateProductStock = createAsyncThunk('products/updateStock', async ({ id, quantity }) => {
    const response = await productApi.updateStock(id, quantity); // Pass quantity directly
    return response.data; // Ensure this returns the expected data
});

// Delete a product
export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
    await productApi.deleteProduct(id); // Ensure `id` is not undefined here
    return id;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [], // List of products
        lowStockItems: [], // List of low-stock products
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetchAllProducts
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            
            // Handle fetchLowStockProducts
            .addCase(fetchLowStockProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLowStockProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.lowStockItems = action.payload; // Store low-stock products
            })
            .addCase(fetchLowStockProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Handle createProduct
            .addCase(createProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            // Handle updateProduct
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(product => product._id === action.payload._id); 
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })

            // Handle updateProductStock
            .addCase(updateProductStock.fulfilled, (state, action) => {
                const index = state.items.findIndex(product => product._id === action.payload._id);
                if (index !== -1) {
                    state.items[index].quantity = action.payload.quantity; // Update stock quantity
                }
            })

            // Handle deleteProduct
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(product => product._id !== action.payload);
            });
    }
});

export default productSlice.reducer;
