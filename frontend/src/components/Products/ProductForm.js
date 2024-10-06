import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../features/products/productSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify'; // Import Toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for Toast
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Create a navigate function
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
        toast.success('Product created successfully!'); // Show toast notification
    };

    const handleViewProducts = () => {
        navigate('/view-products'); // Navigate to 'view-products'
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Create New Product</h2>
            <ToastContainer position="top-center" autoClose={3000} /> {/* Toast Container */}
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
                    <select
                        name="category"
                        className="form-control"
                        value={productData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select category</option>
                        <option value="Biscuits">Biscuits</option>
                        <option value="Canned Foods">Canned Foods</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Dairy Products">Dairy Products</option>
                        <option value="Frozen Foods">Frozen Foods</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Condiments">Condiments</option>
                        <option value="Grains">Grains</option>
                        <option value="Fresh Produce">Fresh Produce</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Stationery">Stationery</option>
                    </select>
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
                <button type="submit" className="btn btn-primary btn-block">Create Product</button> <br />
                <button className="btn btn-secondary btn-block mt-3" onClick={handleViewProducts}>View Products</button>
            </form><br /><br />
        </div>
    );
};

export default ProductForm;
