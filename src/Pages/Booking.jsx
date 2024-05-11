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
        if (selectedTimeSlots.length < 2 || selectedTimeSlots.includes(selectedTimeSlot)) {
            setSelectedTimeSlots(prevState => {
                if (prevState.includes(selectedTimeSlot)) {
                    return prevState.filter(timeSlot => timeSlot !== selectedTimeSlot);
                } else {
                    return [...prevState, selectedTimeSlot];
                }
            });
        } else {
            toast.error('You can select at most 2 time slots.');
        }
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
        const regex = /\b\d{1,2}\b/;
        const day = selectedDay.match(regex)[0];

        const slot1 = timeSlots.indexOf(selectedTimeSlots[0]);
        if (selectedTimeSlots.length === 1) {
            navigate(`/machine?id=${id}&day=${day}&slot1=${slot1}`);
            return;
        }
        const slot2 = timeSlots.indexOf(selectedTimeSlots[1]);
        navigate(`/machine?id=${id}&day=${day}&slot1=${slot1}&slot2=${slot2}`);
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