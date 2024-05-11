import React from 'react';
import { Container, Button } from 'react-bootstrap';

export default function Home() {
    return (
        <Container className="py-5 text-center">
            <h1>Welcome to BlackWashUltra!</h1>
            <p>
                Experience the ultimate washing service with our state-of-the-art machines.
                Join us today and enjoy a seamless washing experience.
            </p>
            <div className="d-flex justify-content-center">
                <Button variant="primary" href="/login" style={{ marginRight: '20px' }}>Login</Button>
                <Button variant="primary" href="/register">Sign Up</Button>
            </div>
        </Container>
    )
}