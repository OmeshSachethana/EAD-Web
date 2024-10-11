// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { fetchLowStockProducts } from '../features/products/productSlice';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth); // Get user from Redux
  const dispatch = useDispatch();
  const lowStockProducts = useSelector((state) => state.products.lowStockItems); // Get low stock products from Redux
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (user?.role === 'Vendor') {
      // Dispatch action to fetch low stock products
      dispatch(fetchLowStockProducts());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (lowStockProducts.length > 0) {
      setShowPopup(true); // Show popup if there are low-stock products
    }
  }, [lowStockProducts]);

  const handleClose = () => setShowPopup(false);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center">
            <Card.Header>Welcome to the E-commerce App</Card.Header>
            <Card.Body>
              <Card.Title>Hello {user ? user.username : "Guest"}!</Card.Title>
              {user ? (
                <Card.Text>
                  You are logged in as <strong>{user.email}</strong> with the role of <strong>{user.role}</strong>.
                </Card.Text>
              ) : (
                <Card.Text>Please log in to access more features.</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Low Stock Popup */}
      <Modal show={showPopup} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Low Stock Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {lowStockProducts.map((product) => (
              <li key={product._id}>
                <strong>{product.name}</strong> - Only {product.quantity} left in stock.
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Background Tint when Popup is open */}
      {showPopup && <div className="overlay"></div>}
    </Container>
  );
};

export default HomePage;
