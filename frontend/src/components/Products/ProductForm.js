import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../features/products/productSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            const reader = new FileReader();
            reader.onloadend = () => {
                setProductData({ ...productData, imageUrl: reader.result });
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
        <div className="container mt-5">
            <h2 className="text-center mb-4">Create New Product</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <div className="form-group mb-3">
                    <label>Product Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter product name"
                        value={productData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Category</label>
                    <input
                        type="text"
                        name="category"
                        className="form-control"
                        placeholder="Enter category"
                        value={productData.category}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        placeholder="Enter product description"
                        value={productData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form-group mb-3">
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        className="form-control"
                        placeholder="Enter quantity"
                        value={productData.quantity}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        placeholder="Enter price"
                        value={productData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Image Upload</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control-file"
                        onChange={handleFileChange}
                    />
                </div>
                {productData.imageUrl && (
                    <div className="text-center mb-3">
                        <img src={productData.imageUrl} alt="Preview" className="img-thumbnail" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    </div>
                )}
                <button type="submit" className="btn btn-primary btn-block">Create Product</button>
            </form>
        </div>
    );
};

export default ProductForm;
