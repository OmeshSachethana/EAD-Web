// src/api/productActivationApi.js
import axios from 'axios';
import { store } from '../app/store';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/products`;

// Activate a product
export const activateProduct = async (id) => {
  const token = store.getState().auth.token;

  if (!token) {
    throw new Error("No authentication token found.");
  }

  return axios.put(`${API_URL}/${id}/activate`, null, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Deactivate a product
export const deactivateProduct = async (id) => {
  const token = store.getState().auth.token;

  if (!token) {
    throw new Error("No authentication token found.");
  }

  return axios.put(`${API_URL}/${id}/deactivate`, null, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Export an object containing the functions
const productApi = {
  activateProduct,
  deactivateProduct,
};

export default productApi;
