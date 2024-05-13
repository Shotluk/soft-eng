import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


export default function BookingPage() {
    const timeSlots = generateTimeSlots();

    const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
    const [selectedDay, setSelectedDay] = useState('');

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handleTimeSlotChange = (event) => {
        const selectedTimeSlot = event.target.value;
        setSelectedTimeSlots(prevState => {
            if (prevState.includes(selectedTimeSlot)) {
                return prevState.filter(timeSlot => timeSlot !== selectedTimeSlot);
            } else {
                return [...prevState, selectedTimeSlot];
            }
        });
    };

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission
        if (selectedTimeSlots.length === 0) {
            toast.error('Please select at least one time slot.');
            return;
        }

        const slots = selectedTimeSlots.map(timeSlot => timeSlots.indexOf(timeSlot));
        slots.sort((a, b) => a - b);
        // ensure 3 consecutive slots are not selected
        for (let i = 0; i < slots.length - 1; i++) {
            if (slots[i + 1] - slots[i] === 1 && slots[i + 2] - slots[i + 1] === 1) {
                toast.error('You cannot select 3 consecutive time slots.');
                return;
            }
        }

        const regex = /\b\d{1,2}\b/;
        const day = selectedDay.match(regex)[0];

        // make slots string passable in url bar
        const slots_string = slots.join(',');
        navigate(`/machine?id=${id}&day=${day}&slots=${slots_string}`);
    };


        return (

            <Container>
                <Row className="justify-content-md-center">
                    <Col xs={12} md={6}>
                        <h2 className="text-center mb-4">Please select the day</h2>
                        <Form.Select aria-label="Day select" onChange={handleDayChange}>
                            <option>Select a day</option>
                            {[...Array(5)].map((_, i) => {
                                const date = new Date();
                                date.setDate(date.getDate() + i);
                                const dateString = date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                                return <option key={i} value={dateString}>{dateString}</option>
                            })}
                        </Form.Select>
                        {selectedDay && (
                            <>
                                <h2 className="text-center mb-4">Please select the time slot</h2>
                                <Form onSubmit={handleSubmit}>
                                    {timeSlots.map((timeSlot, index) => (
                                        <Form.Check
                                            key={index}
                                            type="checkbox"
                                            id={`timeSlot-${index}`}
                                            label={timeSlot}
                                            value={timeSlot}
                                            onChange={handleTimeSlotChange}
                                            checked={selectedTimeSlots.includes(timeSlot)}
                                        />
                                    ))}
                                    <Button type="submit" className="mt-3">Submit</Button>
                                </Form>
                            </>
                        )}
                    </Col>
                </Row>
                <ToastContainer />
            </Container>
        );
}

const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 8; hour <= 22; hour++) {
        const time = `${hour < 10 ? '0' + hour : hour}:${'00'} ${hour < 12 ? 'AM' : 'PM'}`;
        timeSlots.push(time);
    }
    return timeSlots;
};