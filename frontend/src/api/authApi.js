import axios from 'axios';

// Access the backend URL from the environment variables
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/users`;

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data; // Returns { token }
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}`, userData);
  return response.data; // Returns user details
};
