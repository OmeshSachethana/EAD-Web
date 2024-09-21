import axios from 'axios';

const API_URL = 'http://localhost:5207/api/users/';

// Login function
const login = async (email, password) => {
    const response = await axios.post(`${API_URL}login`, { email, password });
    return response.data; // Expecting the token in response
};

// Register function
const register = async (username, email, password) => {
    const response = await axios.post(API_URL, { username, email, password });
    return response.data;
};

const authService = {
    login,
    register,
};

export default authService;
