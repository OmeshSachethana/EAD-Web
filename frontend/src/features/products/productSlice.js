import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productApi from '../../api/productApi'; // productApi correctly references your API file

// Async Thunks
export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
    const response = await productApi.fetchProducts(); // Use fetchProducts instead of getAllProducts
    return response; // No need to use response.data here, it's already handled in productApi
});

export const createProduct = createAsyncThunk('products/create', async (productData) => {
    const response = await productApi.createProduct(productData);
    return response.data;
});

export const updateProduct = createAsyncThunk('products/update', async ({ id, productData }) => {
    const response = await productApi.updateProduct(id, productData);
    return response.data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
    await productApi.deleteProduct(id);
    return id;
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            .addCase(createProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(product => product.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(product => product.id !== action.payload);
            });
    }
});

export default productSlice.reducer;
