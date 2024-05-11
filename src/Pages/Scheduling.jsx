import React from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { firestore } from '../firebase_setup/firebase'; // Adjust the path accordingly

const SchedulingPage = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem('name');

  if (!name) {
    return <p>
      Please <Link to="/login">login</Link> to schedule a machine.
    </p>
  }


  return (
    <Container fluid="xs">
      <h1 className="text-center mb-4">Laundromat Scheduling</h1>
      <Row className="justify-content-md-center">
        <Col xs={12} md={5} className="mb-4">
          <div style={{ width: '100%', height: '15rem', position: 'relative', backgroundImage: "url('/washingMachine.png')", backgroundRepeat: 'no-repeat', backgroundSize: 'contain', opacity: '1', backgroundPosition: ' center' }}>
            <div style={{ textAlign: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '40px' }}>
              <Button
                onClick={() => navigate(`/booking?id=${0}`)}
                variant="primary"
              >
                Schedule
              </Button>
            </div>
            <p style={{ textAlign: 'center', top: '100%', position: 'relative' }}>
              Washing Machine
            </p>
          </div>
        </Col>
        <Col xs={12} md={5} className="mb-4">
          <div style={{ width: '100%', height: '15rem', position: 'relative', backgroundImage: "url('/dryingMachine.png')", backgroundRepeat: 'no-repeat', backgroundSize: 'contain', opacity: '1', backgroundPosition: ' center' }}>
            <div style={{ textAlign: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '40px' }}>
              <Button
                onClick={() => navigate(`/booking?id=${1}`)}
                variant="primary"
              >
                Schedule
              </Button>
            </div>
            <p style={{ textAlign: 'center', top: '100%', position: 'relative' }}>
              Drying Machine
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SchedulingPage;
