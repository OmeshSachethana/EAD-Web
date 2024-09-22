// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';

const MyNavbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Adjusting the Navbar.Brand to remove the duplicate text */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo.png"
            alt="Ecommerce Logo"
            width="40"
            height="40"
            className="d-inline-block align-top"
            style={{ marginRight: '10px' }}
          />
          Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {token ? (
              <>
                <Nav.Item className="me-3">
                  <Nav.Link as="span" className="text-light">
                    Hello, {user?.username}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Button variant="outline-light" className="rounded-pill px-3" onClick={handleLogout}>
                    Logout
                  </Button>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item className="me-3">
                  <Button variant="outline-light" as={Link} to="/login" className="rounded-pill px-3">
                    Login
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button variant="primary" as={Link} to="/register" className="rounded-pill px-3">
                    Register
                  </Button>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
