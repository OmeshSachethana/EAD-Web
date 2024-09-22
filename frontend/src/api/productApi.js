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

// Delete a product
const deleteProduct = (id) => {
  const token = store.getState().auth.token;
  
  if (!token) {
    throw new Error("No authentication token found.");
  }

  return axios.delete(`${API_URL}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

export default {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
