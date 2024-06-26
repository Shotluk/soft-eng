import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase_setup/firebase'; // Adjust the path accordingly
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [inputCode, setInputCode] = useState(''); 
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !email || !password) {
      toast.error('Please fill in all fields!');
      return;
    }
    if (password.length < 8 || password.length > 20) {
      toast.error('Password must be between 8 and 20 characters!');
      return;
    }
    if (!/\d/.test(password)) {
      toast.error('Password must contain at least one number!');
      return;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      toast.error('Password must contain at least one special character!');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Invalid email!');
      return;
    }

    try {
      const code = Math.floor(100000 + Math.random() * 900000);
      setCode(code);

      emailjs.send('service_y7joqpw', 'template_qx3hsjf', 
      {
        email: email,
        name: username,
        code: code,
      }, 
      {
        publicKey: 'Eb6-EiLTv9S5aeaU8',
      })
      .then(
        () => {console.log('SUCCESS!');},
        (error) => {console.log('FAILED...', error);},
      );

      console.log('User registered successfully!');
      setIsCodeSent(true);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleCodeSubmit = async (event) => {
    event.preventDefault();

    if (inputCode === code.toString()) {
      console.log('Code verified successfully!');
      const usersCollection = collection(firestore, 'user'); // Adjust collection name if needed
      await addDoc(usersCollection, {
        name: username,
        email: email,
        password: password,
        isMember: isMember,
        points: 0,
      });

      navigate('/login')

    } else {
      console.log('Code verification failed!');
    }
  }

  if (isCodeSent) {
    return (
      <Container className="mt-5">
        <h1 className="mb-4">Verify Code</h1>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Form onSubmit={handleCodeSubmit}>
              <Form.Group className="mb-3" controlId="formBasicCode">
                <Form.Label>Enter the code sent to your email</Form.Label>
                <Form.Control type="text" placeholder="Enter code" value={inputCode} onChange={(e) => setInputCode(e.target.value)} />
              </Form.Group>

              <Button variant="primary" type="submit">
                Verify
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Do you want to be a member?" checked={isMember} onChange={(e) => setIsMember(e.target.checked)} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}
