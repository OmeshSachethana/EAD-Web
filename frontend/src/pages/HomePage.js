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
          <Card className="text-center shadow-lg p-4 mb-5 bg-white rounded" style={{ borderRadius: '15px', border: 'none' }}>
            <Card.Header
              className="bg-gradient bg-primary text-white p-3"
              style={{
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                fontSize: '1.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <FaShoppingCart className="me-2" />
              Welcome to NexGenMarket
            </Card.Header>
            <Card.Body>
              <Card.Title className="display-4 mb-4" style={{ fontWeight: 'bold', fontSize: '2.5rem', color: '#343a40' }}>
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
                className="mb-4 shadow-sm"
                style={{ maxHeight: '300px', objectFit: 'cover', borderRadius: '10px' }}
                alt={user ? "User Dashboard" : "Welcome to Shopping"}
              />
              {user ? (
                <Card.Text className="lead" style={{ fontSize: '1.25rem', color: '#6c757d' }}>
                  You are logged in as <strong>{user.email}</strong> with the role of{' '}
                  <strong>{user.role}</strong>.
                </Card.Text>
              ) : (
                <Card.Text className="lead" style={{ fontSize: '1.25rem', color: '#6c757d' }}>
                  Log in to personalize your experience and access exclusive offers!
                </Card.Text>
              )}
              <div className="mt-4">
                {user ? (
                  <>
                    {user.role === 'Administrator' && (
                      <>
                        <Button
                          variant="info"
                          size="lg"
                          href={browseProductsLink}
                          className="me-3"
                          style={{ boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)' }}
                        >
                          Browse Products
                        </Button>
                        <Button
                          variant="warning"
                          size="lg"
                          href="/customers"
                          style={{ boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)' }}
                        >
                          Manage Profiles
                        </Button>
                      </>
                    )}
                    {user.role === 'CSR' && (
                      <Button
                        variant="warning"
                        size="lg"
                        href="/customers"
                        style={{ boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)' }}
                      >
                        Manage Profiles
                      </Button>
                    )}
                    {user.role !== 'Administrator' && user.role !== 'CSR' && (
                      <Button
                        variant="info"
                        size="lg"
                        href={browseProductsLink}
                        style={{ boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)' }}
                      >
                        Browse Products
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      size="lg"
                      href="/login"
                      className="me-3"
                      style={{ boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)' }}
                    >
                      <FaSignInAlt className="me-2" />
                      Log in
                    </Button>
                    <Button
                      variant="secondary"
                      size="lg"
                      href="/register"
                      style={{ boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)' }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
            <Card.Footer className="bg-light text-muted p-3" style={{ borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
              {user ? "Manage product status, user accounts, and orders to ensure a smooth shopping experience." : "Manage product listings to ensure a smooth shopping experience."}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
