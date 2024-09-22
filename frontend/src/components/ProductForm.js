import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../features/products/productSlice';

const ProductForm = () => {
    const dispatch = useDispatch();
    const [productData, setProductData] = useState({ name: '', category: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct(productData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={productData.name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={productData.category}
                onChange={handleChange}
            />
            <button type="submit">Create Product</button>
        </form>
    );
};

export default ProductForm;
