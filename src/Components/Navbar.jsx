import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { RiAccountCircleFill } from "react-icons/ri";

function MyNavbar() {

  // read from local storage
  let name = localStorage.getItem('name');

  const handleLogout = () => {
    // clear local storage
    localStorage.removeItem('name');
    window.location.reload();
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">BlackWashUltra</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/scheduling">Scheduling</Nav.Link>
            <Nav.Link as={Link} to="reviews">Reviews</Nav.Link>
          </Nav>


          <Nav className="ml-auto">
            {name ?
              (<NavDropdown title={<RiAccountCircleFill fontSize={30} />} id="basic-nav-dropdown">
                <NavDropdown.Item disabled>{name}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>)
              : (<Nav.Link as={Link} to="/login">Login</Nav.Link>)
            }
          </Nav>


        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default MyNavbar;
