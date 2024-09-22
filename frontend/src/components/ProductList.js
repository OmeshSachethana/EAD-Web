import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllProducts, deleteProduct } from '../features/products/productSlice';

const ProductList = () => {
    const dispatch = useDispatch();
    const { items: products, loading } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <strong>{product.name}</strong> - {product.category} - {product.description} - Quantity: {product.quantity} - Price: ${product.price} - 
                        <img src={product.imageUrl} alt={product.name} style={{ width: '50px', height: '50px' }} />
                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
