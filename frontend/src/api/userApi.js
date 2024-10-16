import axios from 'axios';

// Access the backend URL from the environment variables
const API_URL = `${process.env.REACT_APP_BACKEND_URL}/api/users`;

export const fetchCustomers = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/customers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Returns a list of customers
};

export const updateCustomerStatus = async (id, isActive, username, email, role, password) => {
    const token = localStorage.getItem('token');
    const url = `${API_URL}/${id}`;
    console.log('Calling API URL:', url); // Log the URL
    
    const response = await axios.put(
      url,
      { 
        id,
        username,  // Include all required fields
        email,
        role,
        password,
        isActive // The status you want to update
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Returns updated customer details
  };
   