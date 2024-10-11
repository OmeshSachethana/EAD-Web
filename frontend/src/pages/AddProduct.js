import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../features/products/productSlice';
import { Form, Button } from 'react-bootstrap';

const AddProduct = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    description: '',
    quantity: '',
    price: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
    // Optionally reset form
    setProductData({
      name: '',
      category: '',
      description: '',
      quantity: '',
      price: '',
      imageUrl: ''
    });
  };

  return (
    <div className="container mt-4">
      <h2>Add New Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" name="name" value={productData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={productData.category} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={productData.description} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control type="number" name="quantity" value={productData.quantity} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={productData.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="imageUrl" value={productData.imageUrl} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
