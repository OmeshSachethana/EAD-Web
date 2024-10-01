// src/pages/HomePage.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';

const HomePage = () => {
  const { user } = useSelector((state) => state.auth); // Get user from Redux

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
    </Container>
  );
};

export default HomePage;
