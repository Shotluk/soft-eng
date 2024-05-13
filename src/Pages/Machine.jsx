import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { firestore } from '../firebase_setup/firebase'; // Adjust the path accordingly
import { collection, getDocs, where, query, doc, getDoc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export default function MachinePage() {

    const navigate = useNavigate();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const day = searchParams.get('day');
    const passedSlots = searchParams.get('slots').split(',');

    const [availableMachine, setAvailableMachine] = useState([]);

    useEffect(() => {
        const getData = async () => {
            let ams = []
            const promises = Array.from({ length: 16 }, async (_, i) => {
                const docRef = doc(firestore, 'bookings', `${id}-${i}-${day}`); // Adjust collection name and document id if needed
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data().data;
                    for (const value of data) {
                        // check if any of the slots overlap
                        const slots = value.slots.split(',');

                        let overlap = false;
                        for (const slot of slots) {
                            if (passedSlots.includes(slot)) {
                                overlap = true;
                                break;
                            }
                            if (!overlap) {
                                ams.push(i)
                            }
                        }
                    }
                } else {
                    ams.push(i)
                }
            });

            await Promise.all(promises);
            setAvailableMachine(ams);
        }
        getData();
    }, [id, day, passedSlots]);

    const [selectedMachine, setSelectedMachine] = useState(-1);
    const handleMachineChange = (event) => {
        console.log(event.target.value);
        setSelectedMachine(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedMachine === undefined) {
            toast.error('Please select a machine');
            return;
        }
        let data = [];
        let users = [];
        const docRef = doc(firestore, 'bookings', `${id}-${selectedMachine}-${day}`); // Adjust collection name and document id if needed
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            data = docSnap.data().data;
            users = docSnap.data().users;
        }
        for (const value of data) {
            const slots = value.slots.split(',');

            let overlap = false;
            for (const slot of slots) {
                if (passedSlots.includes(slot)) {
                    overlap = true;
                    break;
                }
                if (overlap) {
                    toast.error('The machine has been booked by someone else');
                    setTimeout(() => {
                        window.location.search = '';
                        window.location.pathname = "/scheduling";
                    }, 1000);
                    return
                }
            }
        }
        let uid = uuidv4();
        data.push({
            slots: passedSlots.join(','),
            user: localStorage.getItem('name'),
            day: day,
            machine: id,
            id: selectedMachine,
            time: new Date().toISOString(),
            uid: uid
        })
        // only add the user if it is not already in the list
        if (!users.includes(localStorage.getItem('name')))
            users.push(localStorage.getItem('name'));

        await setDoc(docRef, { data, users });
        navigate(`/payment?doc=${id}-${selectedMachine}-${day}&uid=${uid}`);
    }

    if (availableMachine.length === 0) {
        return <p>Loading...</p>
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h2 className="text-center mb-4">Please select the machine</h2>
                    <Form onSubmit={handleSubmit}>
                        {availableMachine.map((machine, index) => (
                            <Form.Check
                                key={index}
                                type="radio"
                                id={machine}
                                label={machine}
                                value={machine}
                                onChange={handleMachineChange}
                                checked={selectedMachine.toString() === machine.toString()}
                            />
                        ))}
                        <Button type="submit" className="mt-3">Submit</Button>
                    </Form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
}

