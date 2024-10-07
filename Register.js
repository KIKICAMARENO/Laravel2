import React, { useState } from 'react';
import { register } from '../api';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const { email, password, passwordConfirmation } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }
    try {
      const res = await register({
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      console.log(res.data);
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        const errors = err.response.data.errors;
        if (errors) {
          const errorMessages = Object.values(errors).flat().join(' ');
          setError(errorMessages || 'Registration failed');
        } else {
          setError(err.response.data.message || 'Registration failed');
        }
      } else {
        setError('An unexpected error occurred');
      }
      console.error(err.response?.data);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="4">
          <h2>Register</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="passwordConfirmation"
                value={passwordConfirmation}
                onChange={onChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
