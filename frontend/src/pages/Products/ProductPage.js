import React from 'react';
import ProductList from '../../components/Products/ProductList';
import ProductForm from '../../components/Products/ProductForm';

const ProductPage = () => {
    return (
        <div>
            <ProductForm />
            <ProductList />
        </div>
    );
};

export default ProductPage;
