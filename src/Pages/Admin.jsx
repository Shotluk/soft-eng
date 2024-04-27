import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const cameras = [1,2,3,4,5,6]

export default function Admin() {
    return (
        <Container className="mt-5">
            <h1 className="text-center mb-4">Surveillance Cameras</h1>
            <Row xs={1} md={2} lg={3} className="g-5">
                {cameras.map((cameraNumber, index) => {
                    return (
                        <Col key={cameraNumber}>
                            <div style={{ width: '20rem', height: '15rem', position: 'relative', backgroundImage: "url('/camera.jpeg')", backgroundRepeat: 'no-repeat', backgroundSize: 'contain', opacity: '1', backgroundPosition: ' center' }}>
                                <div style={{ textAlign: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: '20px' }}>
                                    <p style={{color: 'white'}}>Camera {cameraNumber}</p>
                                </div>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}