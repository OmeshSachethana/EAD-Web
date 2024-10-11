import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLowStockProducts, updateProductStock } from '../features/products/productSlice';
import { Button, Table, Form } from 'react-bootstrap';

const LowStockProducts = () => {
  const dispatch = useDispatch();
  const { lowStockItems, loading } = useSelector((state) => state.products);
  const [quantityUpdate, setQuantityUpdate] = useState({});

  useEffect(() => {
    dispatch(fetchLowStockProducts());
  }, [dispatch]);

  // Handle the quantity input change for each product
  const handleQuantityChange = (id, value) => {
    setQuantityUpdate((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle the stock update for a specific product
  const handleUpdateStock = (id) => {
    const quantity = parseInt(quantityUpdate[id], 10); // Ensure quantity is a number
    
    // Validation: Ensure quantity is a positive number
    if (quantity && quantity > 0) {
      dispatch(updateProductStock({ id, quantity })); // Pass correct payload as {quantity: value}

      // Reset the input field for this product after update
      setQuantityUpdate((prev) => ({
        ...prev,
        [id]: '' // Clear input field after successful update
      }));
    } else {
      alert('Please enter a valid quantity!');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Low Stock Products</h2>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Update Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {lowStockItems.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>
                  <Form.Control
                    type="number"
                    value={quantityUpdate[product.id] || ''}  // Maintain separate state for each product
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)} // Track input for each product
                    min="1" // Optional: Prevent negative numbers
                  />
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleUpdateStock(product.id)} // Update stock on button click
                  >
                    Update Stock
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default LowStockProducts;
