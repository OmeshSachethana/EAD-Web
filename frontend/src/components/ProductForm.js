import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../features/products/productSlice';

const ProductForm = () => {
    const dispatch = useDispatch();
    const [productData, setProductData] = useState({ 
        name: '', 
        category: '', 
        description: '', 
        quantity: '', 
        price: '', 
        imageUrl: '' 
    });
    const [imageFile, setImageFile] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Here you could implement image upload logic
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductData({ ...productData, imageUrl: reader.result }); // Use base64 image as imageUrl
            };
            reader.readAsDataURL(file);
            setImageFile(file);
        }
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
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={productData.description}
                onChange={handleChange}
            />
            <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={productData.quantity}
                onChange={handleChange}
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={productData.price}
                onChange={handleChange}
            />
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            {productData.imageUrl && (
                <img src={productData.imageUrl} alt="Preview" style={{ width: '100px', height: '100px' }} />
            )}
            <button type="submit">Create Product</button>
        </form>
    );
};

export default ProductForm;
