import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { firestore } from '../firebase_setup/firebase'; // Adjust the path accordingly

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const usersCollection = collection(firestore, 'user'); // Adjust collection name if needed
      const q = query(usersCollection, where('email', '==', email), where('password', '==', password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // User found, you can handle login here (e.g., set authenticated state)
        console.log('User authenticated!');
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          const userName = userData.name; // Assuming 'name' is the field containing the user's name
          localStorage.setItem('name', userName); // Set localStorage variable 'name' with the user's name
        });
      } else {
        // User not found, you can handle this case (e.g., display error message)
        console.log('User not found!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Login</h1>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
