import React, { useState } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

const SchedulingPage = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [showAllModal, setShowAllModal] = useState(false); // Added state for viewing all scheduled times
  const [scheduledTimes, setScheduledTimes] = useState({});
  const machines = [1, 2, 3, 4, 5, 6];

  const handleScheduleMachine = (machineNumber) => {
    setSelectedMachine(machineNumber);
    setShowAllModal(true); // Show all scheduled times modal directly when scheduling
  };

  const handleCloseAllModal = () => { // Added function to close the modal for viewing all scheduled times
    setShowAllModal(false);
  };

  const handleConfirmSchedule = (selectedTime) => {
    // Update scheduled times for the selected machine
    setScheduledTimes((prevScheduledTimes) => ({
      ...prevScheduledTimes,
      [selectedMachine]: [...(prevScheduledTimes[selectedMachine] ?? []), selectedTime],
    }));
  };

  // Generate time slots from 6 AM to 12 AM
  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 6; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour < 10 ? '0' + hour : hour}:${minute === 0 ? '00' : minute} ${hour < 12 ? 'AM' : 'PM'}`;
        timeSlots.push(time);
      }
    }
    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Laundromat Scheduling</h1>
      <Row xs={1} md={2} lg={3} className="g-5">
        {machines.map((machineNumber) => (
          <Col key={machineNumber}>
            <div style={{ width: '20rem', height: '15rem', position: 'relative', backgroundImage: "url('/washingMachine.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'contain', opacity: '1' , backgroundPosition:' center'}}>
              <div style={{ textAlign: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '40px' }}>
                <Button
                  onClick={() => handleScheduleMachine(machineNumber)}
                  variant="primary"
                >
                  Schedule
                </Button>
              </div>
              <div style={{ marginTop: '1.5rem', textAlign: 'center', position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
                <strong>Scheduled times:</strong><br />
                {scheduledTimes[machineNumber]?.slice(0, 4).map((time, index) => (
                  <small key={index}>{time}<br /></small>
                ))}
                {scheduledTimes[machineNumber]?.length > 4 && (
                  <Button variant="link" onClick={() => setSelectedMachine(machineNumber)}>View All</Button>
                )}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Modal for selecting time */}
      <Modal show={showAllModal} onHide={handleCloseAllModal}>
        <Modal.Header closeButton>
          <Modal.Title>All Scheduled Times for Machine {selectedMachine}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '300px', overflowY: 'scroll' }}>
          {timeSlots.map((timeSlot) => (
            <Button
              key={timeSlot}
              onClick={() => handleConfirmSchedule(timeSlot)}
              disabled={(scheduledTimes[selectedMachine] || []).includes(timeSlot)} // Disable the button if the time slot is already scheduled
              className="me-2 mb-2"
            >
              {timeSlot}
            </Button>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAllModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SchedulingPage;
