import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


export default function Payment() {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');


    const handleSubmit = (event) => {
        event.preventDefault();
        if (paymentMethod === 'coin') {
            // coin payment process
        } else {
            // existing form submission process
        }
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1 className="text-center mb-4">Payment</h1>
                    <p className="text-center mb-4">AED 20</p>
                    <Form onSubmit={handleSubmit}>
                        <h3 className="text-center mb-4">Select Payment Method</h3>

                        <Row className="justify-content-md-center">
                            <Col xs={12} md={6}>
                                <Form.Group as={Row}>
                                    <Col sm={6}>
                                        <Form.Check
                                            type="radio"
                                            label="Card"
                                            name="paymentMethod"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                    </Col>
                                    <Col sm={6}>
                                        <Form.Check
                                            type="radio"
                                            label="Coin"
                                            name="paymentMethod"
                                            value="coin"
                                            checked={paymentMethod === 'coin'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>

                        {paymentMethod === 'card' && (
                            <>
                                <h3 className="text-center mb-4">Credit Card Details</h3>
                                {<Row className="justify-content-md-center">
                                    <Col xs={12} md={6}>
                                        <Form onSubmit={handleSubmit}>
                                            <Form.Group className="mb-3" controlId="formCardNumber">
                                                <Form.Label>Card Number</Form.Label>
                                                <Form.Control type="text" placeholder="Enter card number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formCardName">
                                                <Form.Label>Card Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter card name" value={cardName} onChange={(e) => setCardName(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formExpiryDate">
                                                <Form.Label>Expiry Date</Form.Label>
                                                <Form.Control type="text" placeholder="MM/YY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formCVV">
                                                <Form.Label>CVV</Form.Label>
                                                <Form.Control type="text" placeholder="Enter CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                                            </Form.Group>
                                        </Form>
                                        <Button variant="primary" type="submit" className="mt-3">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>}
                            </>
                        )}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};