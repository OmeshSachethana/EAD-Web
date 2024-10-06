import axios from "axios";

// Base API URL from environment variables
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api`;
const ORDERS_API_URL = `${API_URL}/orders`; // For Orders
const CUSTOMER_ORDERS_API_URL = `${API_URL}/customerorders`; // For CustomerOrders

// Helper to include the token in headers
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`, // Use Bearer token for authentication
  },
});

// Generalized API call function
const apiCall = async (method, url, data = null, token) => {
  const config = getAuthHeaders(token);

  switch (method) {
    case "GET":
      return (await axios.get(url, config)).data;
    case "POST":
      return (await axios.post(url, data, config)).data;
    case "PUT":
      return (await axios.put(url, data, config)).data;
    case "DELETE":
      return (await axios.delete(url, config)).data;
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
};

// ========== OrdersController API Calls ==========

// Get all orders
export const getAllOrders = async (token) => {
  return apiCall("GET", ORDERS_API_URL, null, token);
};

// Create a new order
export const createOrder = async (orderData, token) => {
  return apiCall("POST", ORDERS_API_URL, orderData, token);
};

// Update order details before dispatch
export const updateOrder = async (orderId, orderData, token) => {
  return apiCall("PUT", `${ORDERS_API_URL}/${orderId}`, orderData, token);
};

// Cancel the order before dispatch
export const cancelOrder = async (orderId, note, token) => {
  return apiCall("DELETE", `${ORDERS_API_URL}/${orderId}`, note, token);
};

// Get the status of an order
export const getOrderStatus = async (orderId, token) => {
  return apiCall("GET", `${ORDERS_API_URL}/${orderId}/status`, null, token);
};

// Mark an order as shipped
export const markOrderAsShipped = async (orderId, token) => {
  return apiCall("PUT", `${ORDERS_API_URL}/${orderId}/ship`, {}, token);
};

// ========== CustomerOrdersController API Calls ==========

// Cancel a customer order (CSR/Admin only)
export const cancelCustomerOrder = async (orderId, cancelData, token) => {
  return apiCall(
    "PUT",
    `${CUSTOMER_ORDERS_API_URL}/${orderId}/cancel`,
    cancelData,
    token
  );
};

// Mark an order as delivered or partially delivered (CSR/Admin/Vendor only)
export const markOrderAsDelivered = async (orderId, deliveryData, token) => {
  return apiCall(
    "PUT",
    `${CUSTOMER_ORDERS_API_URL}/${orderId}/deliver`,
    deliveryData,
    token
  );
};
