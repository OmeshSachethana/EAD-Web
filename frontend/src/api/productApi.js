import axios from 'axios';

const API_URL = '/api/products';

const getAllProducts = () => axios.get(API_URL);

const createProduct = (productData) => axios.post(API_URL, productData);

const updateProduct = (id, productData) => axios.put(`${API_URL}/${id}`, productData);

const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);

export default {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
