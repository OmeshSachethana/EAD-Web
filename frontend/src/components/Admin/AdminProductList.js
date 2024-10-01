import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts, deleteProduct } from '../../features/products/productSlice';
import { activateProductAsync, deactivateProductAsync } from '../../features/products/productActivationSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminProductList = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    const handleActivate = (id) => {
        dispatch(activateProductAsync(id));
    };

    const handleDeactivate = (id) => {
        dispatch(deactivateProductAsync(id));
    };

    if (loading) return <div className="text-center">Loading...</div>;

    // Group products by category
    const productsByCategory = products.reduce((acc, product) => {
        if (!acc[product.category]) {
            acc[product.category] = [];
        }
        acc[product.category].push(product);
        return acc;
    }, {});

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Product List</h2>
            {Object.keys(productsByCategory).map((category) => (
                <div key={category} className="mb-5">
                    <h3 className="mb-3">{category}</h3>
                    <div className="row">
                        {productsByCategory[category].map((product) => (
                            <div className="col-md-3 mb-4" key={product.id}>
                                <div className="card" style={{ height: '350px' }}>
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
                                        <div>
                                            {product.isActive ? (
                                                <button className="btn btn-danger me-2" onClick={() => handleDeactivate(product.id)}>Deactivate</button>
                                            ) : (
                                                <button className="btn btn-success me-2" onClick={() => handleActivate(product.id)}>Activate</button>
                                            )}
                                            <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
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