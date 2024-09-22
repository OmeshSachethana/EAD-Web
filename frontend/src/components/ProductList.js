import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts, deleteProduct } from '../features/products/productSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductList = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    if (loading) return <div className="text-center">Loading...</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Product List</h2>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-3 mb-4" key={product.id}> {/* Changed to col-md-3 */}
                        <div className="card" style={{ height: '350px' }}> {/* Set a fixed height */}
                            <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="card-img-top" 
                                style={{ height: '150px', objectFit: 'cover' }} // Adjusted height
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">
                                    <strong>Category:</strong> {product.category}<br />
                                    <strong>Description:</strong> {product.description}<br />
                                    <strong>Quantity:</strong> {product.quantity}<br />
                                    <strong>Price:</strong> ${product.price}
                                </p>
                                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
