import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { collection, addDoc, query,where,getDocs } from 'firebase/firestore'; // Import Firestore methods
import { firestore } from '../firebase_setup/firebase';



export default function Review() {
    const [reviewTitle, setReviewTitle] = useState('');
    const [reviewBody, setReviewBody] = useState('');
    const [rating, setRating] = useState(5);
    const [serviceUsed, setServiceUsed] = useState('');
    const [reviews, setReviews] = useState([]);
    const [bookings, setBookings] = useState([]); // State variable for bookings

    useEffect(() => {
        const name = localStorage.getItem('name');

        if (!name)  return;
            fetchReviews();
            fetchBookings();
        
    }, []);

    const name = localStorage.getItem('name');

    if (!name) {
        return (
            <p>
                Please <Link to="/login">login</Link> to make a review.
            </p>
        );
    }

    // handleSubmit function
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = localStorage.getItem('name');

        const usersCollection = collection(firestore, 'bookings'); // Adjust collection name if needed
        const q = query(usersCollection, where('users', 'array-contains', user));
        const querySnapshot = await getDocs(q);
        let datas = []
        querySnapshot.forEach((doc) => {
            datas = datas.concat(doc.data().data);
        });
        const filteredData = datas.filter((value) => value.user === user);
       // Initialize arrays to store IDs of washing and drying machines used
let washingMachines = [];
let dryingMachines = [];

// Iterate through each booking object in filteredData
filteredData.forEach(booking => {
    // Determine the machine used (Washing or Drying)
    const machineUsed = booking.machine === '0' ? 'Washing' : 'Drying';
    
    // Push the ID of the machine used to the respective array
    if (booking.machine === '0') {
        washingMachines.push(booking.id);
    } else {
        dryingMachines.push(booking.id);
    }
});

// Initialize an empty array to store parts of the log message
let logParts = [];
let extension="";

// Add washing machine part to logParts if there are washing machines used
if (washingMachines.length > 0) {
    logParts.push(`Washing machine(s) ${washingMachines.join(', ')}`);
}

// Add drying machine part to logParts if there are drying machines used
if (dryingMachines.length > 0) {
    logParts.push(`Drying machine(s) ${dryingMachines.join(', ')}`);
}

// Log the machines used by the user if any machines were used
if (logParts.length > 0) {
    extension=`user used ${logParts.join(' and ')}.`;
    console.log(`user used ${logParts.join(' and ')}.`);
} else {
    console.log('User did not use any machines.');
}


        try {
            // Add review to Firestore
            const reviewsCollection = collection(firestore, 'Reviews'); // Adjust collection name if needed
            await addDoc(reviewsCollection, {
                booking: serviceUsed,
                review: reviewBody,
                rating: rating,
                createdAt: new Date().toISOString(), // Add timestamp
                machines_used: "This "+extension,
                name:user
            });

            // Update state to reflect new review
            setReviews([...reviews, { title: serviceUsed, body: reviewBody, rating }]);
            setReviewTitle('');
            setReviewBody('');
            setRating(0);
            setServiceUsed('');
        } catch (error) {
            console.error('Error adding review: ', error);
        }


        
    };

    async function fetchReviews() {
        try {
            const reviewsCollection = collection(firestore, 'Reviews');
            const reviewsSnapshot = await getDocs(reviewsCollection);
            const reviews = reviewsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            console.log(reviews);
            setReviews(reviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }

    const fetchBookings = async () => {
        const user = localStorage.getItem('name');
        if (!user) return;

        try {
            const usersCollection = collection(firestore, 'bookings');
            const q = query(usersCollection, where('users', 'array-contains', user));
            const querySnapshot = await getDocs(q);
            const fetchedBookings = [];
            querySnapshot.forEach((doc) => {
                const bookingData = doc.data().data; // Access the 'data' key
            bookingData.forEach((booking) => {
                fetchedBookings.push({ id: doc.id, ...booking }); // Spread the booking data
            });
            });
            setBookings(fetchedBookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };


    console.log(bookings);

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1 className="text-center mb-4">Review</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formReviewService">
                            <Form.Label>Booking</Form.Label>
                            <Form.Select aria-label="Service Used" value={serviceUsed} onChange={(e) => setServiceUsed(e.target.value)}>
                                <option>None</option>
                                {bookings.map((booking, index) => (
                                    <option key={index} value={booking.id}>{`Booking on ${booking.day} May`}</option>
                                ))}
                                
                            </Form.Select>
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
                            <h6>Name: {review.name}</h6>
                            <p>Review: {review.review}</p>
                            <p>Rating: {review.rating}</p>
                            <p>{review.machines_used}</p>
                        </div>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};





