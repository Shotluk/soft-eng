import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase_setup/firebase'; // Adjust the path accordingly

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add user data to Firestore
      const usersCollection = collection(firestore, 'user'); // Adjust collection name if needed
      await addDoc(usersCollection, {
        name: username,
        email: email,
        password: password
      });
      console.log('User registered successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Register</h1>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
