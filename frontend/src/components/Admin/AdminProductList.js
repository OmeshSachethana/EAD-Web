import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts } from '../../features/products/productSlice';
import { activateProductAsync, deactivateProductAsync } from '../../features/products/productActivationSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminProductList = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector((state) => state.products);
    
    // State to manage the filter
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const handleActivate = (id) => {
        dispatch(activateProductAsync(id))
            .then(() => {
                dispatch(fetchAllProducts()); // Fetch products again after activation
            });
    };

    const handleDeactivate = (id) => {
        dispatch(deactivateProductAsync(id))
            .then(() => {
                dispatch(fetchAllProducts()); // Fetch products again after deactivation
            });
    };

    if (loading) return <div className="text-center">Loading...</div>;

    // Filter products based on the selected filter
    const filteredProducts = products.filter((product) => {
        if (filter === 'active') return product.isActive;
        if (filter === 'inactive') return !product.isActive;
        return true; // All products
    });

    // Group products by category
    const productsByCategory = filteredProducts.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Product List</h2>
            {/* Filter Buttons */}
            <div className="text-center mb-4">
                <button className="btn btn-primary me-2" onClick={() => setFilter('all')}>Show All</button>
                <button className="btn btn-success me-2" onClick={() => setFilter('active')}>Show Active</button>
                <button className="btn btn-secondary" onClick={() => setFilter('inactive')}>Show Inactive</button>
            </div>
            {Object.keys(productsByCategory).map((category) => (
                <div key={category} className="mb-5">
                    <h3 className="mb-3">{category}</h3>
                    <div className="row">
                        {productsByCategory[category].map((product) => (
                            <div className="col-md-3 mb-4" key={product.id}>
                                <div className="card border-primary shadow-sm" style={{ height: '350px' }}>
                                    <img 
                                        src={product.imageUrl} 
                                        alt={product.name} 
                                        className="card-img-top" 
                                        style={{ height: '150px', objectFit: 'cover' }} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">
                                            <strong>Description:</strong> {product.description}<br />
                                            <strong>Quantity:</strong> {product.quantity}<br />
                                            <strong>Price:</strong> ${product.price}<br />
                                            <strong>Status:</strong> {product.isActive ? 'Active' : 'Inactive'}
                                        </p>
                                        <div className="d-flex justify-content-between">
                                            {product.isActive ? (
                                                <button className="btn btn-warning" onClick={() => handleDeactivate(product.id)}>Deactivate</button>
                                            ) : (
                                                <button className="btn btn-info" onClick={() => handleActivate(product.id)}>Activate</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminProductList;
