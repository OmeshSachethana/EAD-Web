import axios from 'axios';
import { store } from '../app/store';

// Access the backend URL from the environment variables
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/products`;

// Fetch all products
export const fetchProducts = async () => {
  const token = store.getState().auth.token; // Get the JWT token from the Redux store
  
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axios.get(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}` // Include the Bearer token in the headers
    }
  });

  return response.data;
};

// Fetch low-stock products
export const fetchLowStockProducts = async () => {
  const token = store.getState().auth.token;
  
  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axios.get(`${API_URL}/low-stock`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return response.data;
};

// Create a product
const createProduct = (productData) => {
  const token = store.getState().auth.token;
  
  if (!token) {
    throw new Error("No authentication token found.");
  }

  return axios.post(API_URL, productData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Update a product
const updateProduct = (id, productData) => {
  const token = store.getState().auth.token;
  
  if (!token) {
    throw new Error("No authentication token found.");
  }

  return axios.put(`${API_URL}/${id}`, productData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Update product stock
export const updateStock = (id, quantity) => {
  const token = store.getState().auth.token;
  
  if (!token) {
    throw new Error("No authentication token found.");
  }

  return axios.put(`${API_URL}/${id}/stock`, { quantity }, { // This already passes quantity correctly
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};


const deleteProduct = (id) => {
  const token = store.getState().auth.token;
  
  if (!token) {
    throw new Error("No authentication token found.");
  }

  return axios.delete(`${API_URL}/${id}`, { // Ensure `id` is valid and defined here
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Assign all functions to an object before exporting
const productApi = {
  fetchProducts,
  fetchLowStockProducts,
  createProduct,
  updateProduct,
  updateStock,
  deleteProduct,
};

export default productApi;
