// src/api/authApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5207/api/users';  // Your backend URL

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  return response.data; // Returns { token }
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}`, userData);
  return response.data; // Returns user details
};
