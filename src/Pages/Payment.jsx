import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { firestore } from '../firebase_setup/firebase'; // Adjust the path accordingly
import { collection, getDocs, where, query, doc, getDoc, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export default function Payment() {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [price, setPrice] = useState('');
    const [data, setData] = useState([]);
    const [users, setUsers] = useState([]);
    const [dindex, setDindex] = useState('');
    const [authId, setAuthId] = useState('');
    const [userAuthData, setUserAuthData] = useState({});

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const docname = searchParams.get('doc');
    const uid = searchParams.get('uid');
    const navigate = useNavigate();

    const docRef = doc(firestore, 'bookings', `${docname}`);

    useEffect(() => {
        const getData = async () => {
            const docSnap = await getDoc(docRef);
            const d = docSnap.data().data;
            const index = d.findIndex((x) => x.uid === uid);
            if (d[index].paymentMethod) {
                setPrice(0);
            } else {
                if (d[index].slot2 === null) {
                    setPrice(10);
                } else {
                    setPrice(20);
                }
            }
            setData(d);
            setUsers(docSnap.data().users);
            setDindex(index);
        }
        const getUserData = async () => {
            const usersCollection = collection(firestore, 'user');
            const q = query(usersCollection, where('name', '==', localStorage.getItem('name')));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    const userData = doc.data();
                    setAuthId(doc.id);
                    setUserAuthData(userData);
                });
            }
        }
        getData();
        getUserData();
    }, [docRef, uid]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (paymentMethod === 'card') {
            if (cardNumber === '' || cardName === '' || expiryDate === '' || cvv === '') {
                toast.error('Please fill in all fields');
                return;
            }
            if (!luhn(cardNumber)) {
                toast.error('Invalid card number');
                return;
            }
            if (expiryDate.length !== 5 || expiryDate[2] !== '/') {
                toast.error('Invalid expiry date');
                return;
            }
            if (cardName.length > 128) {
                toast.error('Invalid card name');
                return;
            }
            const today = new Date();
            const [month, year] = expiryDate.split('/');
            if (month < 1 || month > 12) {
                toast.error('Invalid expiry date');
                return;
            }
            const expiry = new Date('20' + year, month - 1);
            if (expiry < today) {
                toast.error('Card has expired');
                return;
            }
            if (cvv.length !== 3) {
                toast.error('Invalid CVV');
                return;
            }
        }

        if (paymentMethod === 'coin') {
            data[dindex].time = new Date().toLocaleString();
            data[dindex].paymentMethod = 'coin';
        } if (paymentMethod === 'loyalty') {
            if (userAuthData.points < price) {
                toast.error('Not enough loyalty points');
                return;
            }
            data[dindex].time = new Date().toLocaleString();
            data[dindex].paymentMethod = 'loyalty';
            data[dindex].reciept = "Points " + price;
            const newPoints = userAuthData.points - price;
            const usersCollection = collection(firestore, 'user');
            await setDoc(doc(usersCollection, authId), { points: newPoints }, { merge: true });
        }
        else {
            data[dindex].time = new Date().toLocaleString();
            data[dindex].paymentMethod = 'card';
            data[dindex].reciept = "AED " + price;
            const newPoints = userAuthData.points + 1 * price/10;
            const usersCollection = collection(firestore, 'user');
            await setDoc(doc(usersCollection, authId), { points: newPoints }, { merge: true });
        }
        emailjs.send('service_y7joqpw', 'template_j4hgyi7', 
            {
              name: userAuthData.name,
              email: userAuthData.email,
              day: data[dindex].day,
              time: generateTimeSlots()[Number(data[dindex].slot1)],
              machine: data[dindex].machine.toString() === "0" ? "Washing Machine" : "Drying Machine",
            }, 
            {
              publicKey: 'Eb6-EiLTv9S5aeaU8',
            })
            .then(
              () => {console.log('SUCCESS!');},
              (error) => {console.log('FAILED...', error);},
            );
        console.log(data);
        await setDoc(docRef, { data: data, users: users });
        navigate('/home');
    };

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1 className="text-center mb-4">Payment</h1>
                    <p className="text-center mb-4">{'AED ' + price}</p>
                    <Form onSubmit={handleSubmit}>
                        <h3 className="text-center mb-4">Select Payment Method</h3>

                        <Row className="justify-content-md-center">
                            <Col xs={12}>
                                <Form.Group>
                                    <Row>
                                        <Col sm={4}>
                                            <Form.Check
                                                type="radio"
                                                label="Card"
                                                name="paymentMethod"
                                                value="card"
                                                checked={paymentMethod === 'card'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={4}>
                                            <Form.Check
                                                type="radio"
                                                label="Coin"
                                                name="paymentMethod"
                                                value="coin"
                                                checked={paymentMethod === 'coin'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                        </Col>
                                        <Col sm={4}>
                                            <Form.Check
                                                type="radio"
                                                label="Loyalty Points"
                                                name="paymentMethod"
                                                value="loyalty"
                                                checked={paymentMethod === 'loyalty'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>

                        {paymentMethod === 'card' && (
                            <>
                                <h3 className="text-center mb-4">Credit Card Details</h3>
                                <Row className="justify-content-md-center">
                                    <Col xs={12} md={6}>
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
                                    </Col>
                                </Row>
                            </>
                        )}

                        {paymentMethod === 'loyalty' && (
                            <>
                            <h3 className="text-center mb-4">Loyalty Points</h3>
                            <p className="text-center mb-4">You have {userAuthData.points} loyalty points</p>

                            </>
                        )}

                        <Button variant="primary" type="submit" className="mt-3">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

const luhn = (cardNumber) => {
    let sum = 0;
    let isSecond = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let d = cardNumber[i].charCodeAt(0) - '0'.charCodeAt(0);
        if (isSecond === true)
            d = d * 2;
        sum += Math.floor(d / 10);
        sum += d % 10;
        isSecond = !isSecond;
    }
    return (sum % 10 === 0);
}

const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 8; hour <= 22; hour++) {
        const time = `${hour < 10 ? '0' + hour : hour}:${'00'} ${hour < 12 ? 'AM' : 'PM'}`;
        timeSlots.push(time);
    }
    return timeSlots;
};