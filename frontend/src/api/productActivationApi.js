import axios from 'axios';
import { store } from '../app/store';

// Access the backend URL from the environment variables
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/products`;

// Activate a product
export const activateProduct = async (id) => {
  const token = store.getState().auth.token;

  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axios.put(`${API_URL}/${id}/activate`, null, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return response.data;
};

// Deactivate a product
export const deactivateProduct = async (id) => {
  const token = store.getState().auth.token;

  if (!token) {
    throw new Error("No authentication token found.");
  }

  const response = await axios.put(`${API_URL}/${id}/deactivate`, null, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return response.data;
};
