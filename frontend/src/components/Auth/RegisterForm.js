import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { Form, Button, Card, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../../images/web-icon.jpeg"; // Import the logo

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '', // Default role
  });

  const [errors, setErrors] = useState({}); // State to hold validation errors

  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.auth);

  const validate = () => {
    const newErrors = {};

    // Username validation: must be at least 3 characters
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters long';
    }

    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email is not valid';
    }

    // Password validation: must be at least 6 characters
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    // Role validation: must select a role
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
      dispatch(register(formData));
    } else {
      toast.error('Please fix the errors in the form');
    }
  };

  // Show toast notifications based on the status and error state
  useEffect(() => {
    if (status === 'succeeded') {
      //toast.success('Registration successful!');
    } else if (error) {
      toast.error(`Registration failed: ${error}`);
    }
  }, [status, error]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm">
            <Card.Body>
              {/* Add logo on top of the form */}
              <div className="text-center mb-4">
                <img src={logo} alt="Logo" style={{ width: '100px', height: '100px' }} />
              </div>
              <h3 className="text-center mb-4">Register</h3>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    required
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formRole" className="mb-4">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    isInvalid={!!errors.role}
                    required
                  >
                    <option value="">Select a role</option>
                    <option value="CSR">CSR</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Vendor">Vendor</option>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Register'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Toast container to display notifications */}
      <ToastContainer />
    </Container>
  );
};

export default RegisterForm;
