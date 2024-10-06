import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllOrders as apiGetAllOrders,
  createOrder as apiCreateOrder,
  cancelOrder as apiCancelOrder,
  markOrderAsDelivered as apiDeliverOrder,
  getOrderStatus as apiGetOrderStatus,
  markOrderAsShipped as apiShipOrder,
} from "../../api/orderAPI";

// ========== Thunks ==========

// Get All Orders Thunk
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { getState, rejectWithValue }) => {
    const token = getState().auth.token; // Extract the auth token from the state
    try {
      return await apiGetAllOrders(token); // Call the API to fetch all orders
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all orders."
      );
    }
  }
);

// Create Order Thunk
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      return await apiCreateOrder(orderData, token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order."
      );
    }
  }
);

// Cancel Order Thunk
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async ({ id, note }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      return await apiCancelOrder(id, note, token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to cancel order."
      );
    }
  }
);

// Mark Order as Delivered Thunk
export const markOrderAsDelivered = createAsyncThunk(
  "orders/markOrderAsDelivered",
  async ({ id, deliveryData }, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      return await apiDeliverOrder(id, deliveryData, token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark order as delivered."
      );
    }
  }
);

// Get Order Status Thunk
export const getOrderStatus = createAsyncThunk(
  "orders/getOrderStatus",
  async (orderId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      return await apiGetOrderStatus(orderId, token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get order status."
      );
    }
  }
);

// Ship Order Thunk
export const markOrderAsShipped = createAsyncThunk(
  "orders/markOrderAsShipped",
  async (orderId, { getState, rejectWithValue }) => {
    const token = getState().auth.token;
    try {
      return await apiShipOrder(orderId, token);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark order as shipped."
      );
    }
  }
);

// ========== Order Slice ==========

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: null, // Holds the order status data
    loading: false,
    error: null,
    message: null,
    shipMessage: null, // Message for shipping operation
    deliverMessage: null, // Message for delivery operation
    cancelMessage: null, // Message for cancel operation
    createMessage: null, // Message for create order operation
    createError: null, // Error for create order operation
    shipError: null, // Error for shipping operation
    deliverError: null, // Error for delivery operation
    cancelError: null, // Error for cancel operation
  },
  reducers: {
    clearShipMessage: (state) => {
      state.shipMessage = null;
      state.shipError = null;
    },
    clearDeliverMessage: (state) => {
      state.deliverMessage = null;
      state.deliverError = null;
    },
    clearCancelMessage: (state) => {
      state.cancelMessage = null;
      state.cancelError = null;
    },
    clearOrderStatusMessage: (state) => {
      state.message = null;
      state.error = null;
      state.status = null; // Clear status on reset
    },
    clearCreateOrderMessage: (state) => {
      state.createMessage = null;
      state.createError = null;
    },
    clearLoading: (state) => {
      state.loading = false;
    },
    clearGetAllOrdersError: (state) => {
      state.getAllError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order Cases
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.createMessage =
          action.payload.message || "Order created successfully!";
        state.createError = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.createError = action.payload || "Failed to create order.";
        state.createMessage = null;
      })
      // Get All Orders Cases
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders; // Store the fetched orders
        state.getAllError = null;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.getAllError = action.payload || "Failed to fetch all orders.";
      })
      // Ship Order Cases
      .addCase(markOrderAsShipped.fulfilled, (state, action) => {
        state.loading = false;
        state.shipMessage =
          action.payload.message || "Order marked as shipped successfully!";
        state.shipError = null;
      })
      .addCase(markOrderAsShipped.rejected, (state, action) => {
        state.loading = false;
        state.shipError = action.payload || "Failed to mark order as shipped.";
        state.shipMessage = null;
      })
      // Deliver Order Cases
      .addCase(markOrderAsDelivered.fulfilled, (state, action) => {
        state.loading = false;
        state.deliverMessage =
          action.payload.message || "Order marked as delivered successfully!";
        state.deliverError = null;
      })
      .addCase(markOrderAsDelivered.rejected, (state, action) => {
        state.loading = false;
        state.deliverError =
          action.payload || "Failed to mark order as delivered.";
        state.deliverMessage = null;
      })
      // Cancel Order Cases
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.cancelMessage =
          action.payload.message || "Order cancelled successfully!";
        state.cancelError = null;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.cancelError = action.payload || "Failed to cancel order.";
        state.cancelMessage = null;
      })
      // Order Status Cases
      .addCase(getOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload; // Store the order status
        state.message = action.payload.message || "Order status retrieved!";
        state.error = null;
      })
      .addCase(getOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to get order status.";
        state.status = null; // Reset status on error
        state.message = null;
      })
      // General Pending Case
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      // General Rejected Case (fallback)
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

// Export the action creators
export const {
  clearShipMessage,
  clearDeliverMessage,
  clearOrderStatusMessage,
  clearCancelMessage,
  clearCreateOrderMessage,
  clearLoading,
  clearGetAllOrdersError,
} = orderSlice.actions;

// Export the reducer
export default orderSlice.reducer;
