// src/components/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light mt-5">
      <Container>
        <Row className="py-4">
          <Col md={4} className="mb-3">
            <h5>About Us</h5>
            <p>NextGenMarket is your one-stop solution for all your shopping needs.</p>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-light">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light">
                  About
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4} className="mb-3">
            <h5>Contact Us</h5>
            <p>Email: support@nextgenmarket.com</p>
            <p>Phone: +94 77 123 7895</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} NextGenMarket. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
