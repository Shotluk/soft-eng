import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const mock_reviews = [
    { title: 'Washing Machine', body: 'It works nicely', rating: 4 },
    { title: 'Dryer', body: 'It works nicely', rating: 3 },
]

export default function Review() {
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [rating, setRating] = useState(0);
    const [reviews, setReviews] = useState(mock_reviews);

    const machines = [1, 2, 3, 4, 5, 6];
  
    const name = localStorage.getItem('name');
  
    if (!name) {
      return <p>
        Please <Link to="/login">login</Link> to make a review.
      </p>
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setReviews([...reviews, { title: reviewTitle, body: reviewBody, rating }]);
        setReviewTitle('');
        setReviewBody('');
        setRating(0);
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1 className="text-center mb-4">Review</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formReviewTitle">
                            <Form.Label>Service Used</Form.Label>
                            <Form.Control type="text" placeholder="Enter service used" value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formReviewBody">
                            <Form.Label>Review</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter review" value={reviewBody} onChange={(e) => setReviewBody(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formReviewRating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control type="number" min="1" max="5" placeholder="Rate 1-5" value={rating} onChange={(e) => setRating(e.target.value)} />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>

                    <h2 className="text-center mt-5">Previous Reviews</h2>
                    {reviews.map((review, index) => (
                        <div key={index}>
                            <h6>{review.title} ({review.rating}/5)</h6>
                            <p>{review.body}</p>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};