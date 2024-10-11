import axios from 'axios';
import { store } from '../app/store';

const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/vendor`;

// Create an vendor
const createVendor= async (inventoryData) => {
    const token = store.getState().auth.token;
    if (!token) {
      throw new Error("No authentication token found.");
    }
  
    return axios.post(`${API_URL}/create-vendor`, inventoryData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };

  const vendorApi = {
    createVendor
  };
  
  export default vendorApi;