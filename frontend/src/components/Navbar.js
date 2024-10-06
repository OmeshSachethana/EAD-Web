// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap";

const MyNavbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo.png"
            alt="logo"
            width="40"
            height="40"
            className="d-inline-block align-top"
            style={{ marginRight: "10px" }}
          />
          Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item className="me-3">
              <Nav.Link as={Link} to="/" className="text-light">
                Home
              </Nav.Link>
            </Nav.Item>
            {/* Conditionally render Admin Products for Administrators */}
            {user?.role.includes("Vendor") && (
            <Nav.Item className="me-3">
              <Nav.Link as={Link} to="/products" className="text-light">
                Products
              </Nav.Link>
            </Nav.Item>
            )}
            {/* Conditionally render Admin Products for Administrators */}
            {user?.role.includes("Administrator") && (
              <Nav.Item className="me-3">
                <Nav.Link as={Link} to="/admin-products" className="text-light">
                  Admin Products
                </Nav.Link>
              </Nav.Item>
            )}
            {/* Conditionally render Admin Orders for Administrators */}
            {user?.role.includes("Administrator") && (
              <Nav.Item className="me-3">
                <Nav.Link as={Link} to="/admin-orders" className="text-light">
                  Admin Orders
                </Nav.Link>
              </Nav.Item>
            )}
            {/* Conditionally render Admin Products for Administrators */}
            {user?.role.includes("Administrator") && (
              <Nav.Item className="me-3">
                <Nav.Link as={Link} to="/customers" className="text-light">
                  Customer
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
          <Nav className="ms-auto">
            {token ? (
              <>
                <Nav.Item className="me-3">
                  <Nav.Link as="span" className="text-light">
                    Hello, {user?.username}
                  </Nav.Link>
                </Nav.Item>

                {/* Order management dropdown for authenticated users */}
                <NavDropdown
                  title="Manage Orders"
                  id="basic-nav-dropdown"
                  className="text-light"
                >
                  {/* Show Create Order only for Customers and Vendors */}
                  {(user?.role.includes("Customer") ||
                    user?.role.includes("Vendor")) && (
                    <NavDropdown.Item as={Link} to="/orders/create">
                      Create Order
                    </NavDropdown.Item>
                  )}

                  {/* Show Cancel Order for Customers, CSR, and Administrators */}
                  {(user?.role.includes("Customer") ||
                    user?.role.includes("CSR") ||
                    user?.role.includes("Administrator")) && (
                    <NavDropdown.Item as={Link} to="/orders/cancel">
                      Cancel Order
                    </NavDropdown.Item>
                  )}

                  {/* Show Deliver Order for CSR, Administrators, and Vendors */}
                  {(user?.role.includes("CSR") ||
                    user?.role.includes("Administrator") ||
                    user?.role.includes("Vendor")) && (
                    <NavDropdown.Item as={Link} to="/orders/deliver">
                      Deliver Order
                    </NavDropdown.Item>
                  )}

                  {/* Show Ship Order for CSR and Administrators */}
                  {(user?.role.includes("CSR") ||
                    user?.role.includes("Administrator")) && (
                    <NavDropdown.Item as={Link} to="/orders/ship">
                      Ship Order
                    </NavDropdown.Item>
                  )}

                  {/* Show Check Order Status for all role */}
                  <NavDropdown.Item as={Link} to="/orders/status">
                    Check Order Status
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Item>
                  <Button
                    variant="outline-light"
                    className="rounded-pill px-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Nav.Item>
              </>
            ) : (
              <>
                <Nav.Item className="me-3">
                  <Button
                    variant="outline-light"
                    as={Link}
                    to="/login"
                    className="rounded-pill px-3"
                  >
                    Login
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button
                    variant="primary"
                    as={Link}
                    to="/register"
                    className="rounded-pill px-3"
                  >
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
