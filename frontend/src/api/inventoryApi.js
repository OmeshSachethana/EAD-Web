import axios from 'axios';
import { store } from '../app/store';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/inventory`;

// Fetch all inventory items
export const fetchInventory = async () => {
  const token = store.getState().auth.token; // Get the JWT token from the Redux store
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axios.get(`${API_URL}/all-stocks`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return response.data;
};

// Create an inventory entry
const createInventoryItem = async (inventoryData) => {
  const token = store.getState().auth.token;
  if (!token) {
    throw new Error("No authentication token found.");
  }

  return axios.post(`${API_URL}/add-product`, inventoryData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Update inventory for a specific product
const updateInventoryItem = async (inventoryData) => {
  const token = store.getState().auth.token;
  if (!token) {
    throw new Error("No authentication token found.");
  }

  return axios.put(`${API_URL}/update-product`, inventoryData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Remove stock of a product
const removeInventoryItem = async (id) => {
  const token = store.getState().auth.token;
  if (!token) {
    throw new Error("No authentication token found.");
  }

  return axios.delete(`${API_URL}/remove-stock/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Search for an inventory item by product ID
const searchInventoryByProductId = async (productId) => {
  const token = store.getState().auth.token;
  if (!token) {
    throw new Error("No authentication token found.");
  }

  return axios.get(`${API_URL}/check-stock/${productId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Assign all functions to an object before exporting
const inventoryApi = {
  fetchInventory,
  createInventoryItem,
  updateInventoryItem,
  removeInventoryItem,
  searchInventoryByProductId
};

export default inventoryApi;
