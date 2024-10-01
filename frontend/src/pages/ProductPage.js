import React from 'react';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

const ProductPage = () => {
    return (
        <div>
            <ProductForm />
            <ProductList />
        </div>
    );
};

export default ProductPage;
