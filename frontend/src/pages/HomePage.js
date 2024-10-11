// src/pages/HomePage.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { FaUserCircle, FaSignInAlt, FaShoppingCart } from 'react-icons/fa';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth); // Get user from Redux

  // Determine the correct navigation link based on the user role
  const browseProductsLink = user && user.role === 'Administrator' ? '/admin-products' : '/view-products';

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="text-center shadow-lg p-3 mb-5 bg-white rounded">
            <Card.Header className="bg-primary text-white">
              <FaShoppingCart className="me-2" />
              Welcome to the NexGenMarket
            </Card.Header>
            <Card.Body>
              <Card.Title className="display-4 mb-4">
                {user ? (
                  <>
                    <FaUserCircle size={50} className="me-2" />
                    Hello, {user.username}!
                  </>
                ) : (
                  "Welcome, Guest!"
                )}
              </Card.Title>
              <Image
                src={user ? "/assets/user-dashboard.png" : "/assets/welcome-shopping.jpg"}
                fluid
                rounded
                className="mb-4"
                alt={user ? "User Dashboard" : "Welcome to Shopping"}
              />
              {user ? (
                <Card.Text>
                  You are logged in as <strong>{user.email}</strong> with the role of{' '}
                  <strong>{user.role}</strong>.
                </Card.Text>
              ) : (
                <Card.Text>
                  Log in to personalize your experience and access exclusive offers!
                </Card.Text>
              )}
              <div className="mt-4">
                {user ? (
                  <>
                    <Button variant="info" size="lg" href={browseProductsLink}>
                      Browse Products
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="primary" size="lg" href="/login" className="me-3">
                      <FaSignInAlt className="me-2" />
                      Log in
                    </Button>
                    <Button variant="secondary" size="lg" href="/register">
                      Register
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
            <Card.Footer className="text-muted">
              {user ? "Enjoy shopping with us, and don't forget to check your wishlist!" : "Join now to get access to exclusive member-only discounts."}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
